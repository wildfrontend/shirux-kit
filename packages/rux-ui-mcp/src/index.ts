#!/usr/bin/env tsx
/**
 * Minimal rux-ui MCP server with lightweight indexing + search.
 * 可透過 --root 指定 rux-ui 套件根目錄。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

type RecordKind = 'component' | 'hook' | 'style' | 'utility' | 'doc';

interface IndexRecord {
  uri: string;
  relativePath: string;
  fullPath: string;
  name: string;
  kind: RecordKind;
  summary: string;
  snippet: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getArgValue = (flag: string): string | undefined => {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
};

// 使用 __dirname 作為基準來解析相對路徑，這樣可以支援 monorepo 內的相對路徑
// __dirname 會是 packages/shirux-ui-mcp/src，所以需要往上兩層到達 packages 目錄
const rootArgValue = getArgValue('--root');
const rootDir = rootArgValue
  ? path.isAbsolute(rootArgValue)
    ? rootArgValue
    : path.resolve(__dirname, '..', rootArgValue)
  : path.join(__dirname, '../../rux-ui');
const serverName = getArgValue('--name') ?? 'rux-ui-mcp';
const maxSnippetLength = 1200;

const ignoredDirs = new Set([
  'node_modules',
  '.git',
  '.next',
  '.turbo',
  'out',
  'dist',
  '.cache',
]);

const allowedExt = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.md',
  '.mdx',
]);

const kindFromPath = (relativePath: string): RecordKind => {
  if (relativePath.startsWith('src/components/')) return 'component';
  if (relativePath.startsWith('src/hooks/')) return 'hook';
  if (relativePath.startsWith('src/styles/')) return 'style';
  if (relativePath.startsWith('src/lib/')) return 'utility';
  return 'doc';
};

const toUri = (relativePath: string) =>
  `rux-ui://${relativePath.replace(/\\/g, '/')}`;

const readSnippet = (content: string) =>
  content.slice(0, maxSnippetLength).trim() ||
  '（檔案內容為空或僅包含空白）';

const summarize = (content: string) => {
  const lines = content.split('\n').map((line) => line.trim());
  const firstMeaningful = lines.find(
    (line) => line && !line.startsWith('//') && !line.startsWith('/*')
  );
  return firstMeaningful?.slice(0, 120) || 'rux-ui 資源';
};

const walkFiles = async (
  dir: string,
  results: Array<{ fullPath: string; relativePath: string }> = []
) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(rootDir, fullPath);
    if (entry.isDirectory()) {
      await walkFiles(fullPath, results);
    } else if (allowedExt.has(path.extname(entry.name))) {
      results.push({
        fullPath,
        relativePath,
      });
    }
  }
  return results;
};

const buildIndex = async (): Promise<IndexRecord[]> => {
  const files = await walkFiles(rootDir);
  const records: IndexRecord[] = [];
  for (const file of files) {
    try {
      const content = await fs.readFile(file.fullPath, 'utf8');
      const snippet = readSnippet(content);
      const summary = summarize(content);
      const kind = kindFromPath(file.relativePath);
      records.push({
        uri: toUri(file.relativePath),
        relativePath: file.relativePath,
        fullPath: file.fullPath,
        name: path.basename(file.relativePath),
        kind,
        summary,
        snippet,
      });
    } catch (error) {
      // 忽略無法讀取的檔案以避免整體失敗
      console.error(`[rux-ui-mcp] Failed to read ${file.relativePath}`, error);
    }
  }
  return records;
};

const matchScore = (query: string, record: IndexRecord) => {
  const haystack = `${record.name} ${record.relativePath} ${record.summary}`.toLowerCase();
  const normalized = query.toLowerCase();
  if (haystack.includes(normalized)) return 2;
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return tokens.reduce(
    (score, token) => score + (haystack.includes(token) ? 1 : 0),
    0
  );
};

const createServer = async () => {
  try {
    await fs.access(rootDir);
  } catch {
    throw new Error(`Root directory not found: ${rootDir}`);
  }

  const index = await buildIndex();
  const server = new McpServer({
    name: serverName,
    version: '0.1.0',
  });

  // 註冊所有資源
  for (const record of index) {
    server.registerResource(
      record.relativePath,
      record.uri,
      {
        description: `${record.kind} · ${record.summary}`,
        mimeType: 'text/plain',
      },
      async (_uri, _extra) => {
        const content = await fs.readFile(record.fullPath, 'utf8');
        return {
          contents: [
            {
              uri: record.uri,
              text: content,
            },
          ],
        };
      }
    );
  }

  // 搜尋工具
  server.registerTool(
    'searchRuxUi',
    {
      description:
        '搜尋 rux-ui 資源（components/hooks/styles/docs），回傳摘要與片段以節省 context。',
      inputSchema: z.object({
        query: z.string(),
        limit: z.number().min(1).max(20).optional(),
      }),
    },
    async (args) => {
      const { query, limit = 8 } = args;

      const scored = index
        .map((record) => ({
          record,
          score: matchScore(query, record),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(1, Math.min(limit || 8, 20)))
        .map(({ record, score }) => ({
          uri: record.uri,
          name: record.name,
          path: record.relativePath,
          kind: record.kind,
          score,
          summary: record.summary,
          snippet: record.snippet,
        }));

      return {
        content: [
          {
            type: 'text',
            text:
              scored.length === 0
                ? 'No results'
                : JSON.stringify(scored, null, 2),
          },
        ],
      };
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    `[rux-ui-mcp] server started. root=${rootDir} name=${serverName} indexed=${index.length}`
  );
};

createServer().catch((error) => {
  console.error('[rux-ui-mcp] failed to start', error);
  process.exit(1);
});
