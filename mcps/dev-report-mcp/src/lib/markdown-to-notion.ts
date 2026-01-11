import { marked, type Token, type Tokens } from 'marked';
import type { BlockObjectRequest } from '@notionhq/client/build/src/api-endpoints.js';

type NotionBlock = BlockObjectRequest;

/**
 * RichTextItemRequest 類型定義
 *
 * 注意：此類型在 @notionhq/client 中有定義但未導出，因此需要手動定義。
 * 這裡只定義我們需要的 text 類型變體（Notion API 還支援 mention 和 equation 類型）。
 */
type RichTextItemRequest = {
  type: 'text';
  text: { content: string; link?: { url: string } | null };
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
};

/**
 * 将 Markdown 转换为 Notion blocks
 */
export function markdownToNotionBlocks(markdown: string): NotionBlock[] {
  const tokens = marked.lexer(markdown);
  const blocks: NotionBlock[] = [];

  for (const token of tokens) {
    const block = convertToken(token);
    if (block) {
      if (Array.isArray(block)) {
        blocks.push(...block);
      } else {
        blocks.push(block);
      }
    }
  }

  return blocks;
}

function convertToken(token: Token): NotionBlock | NotionBlock[] | null {
  switch (token.type) {
    case 'heading':
      return convertHeading(token as Tokens.Heading);

    case 'paragraph':
      return convertParagraph(token as Tokens.Paragraph);

    case 'list':
      return convertList(token as Tokens.List);

    case 'code':
      return convertCode(token as Tokens.Code);

    case 'blockquote':
      return convertBlockquote(token as Tokens.Blockquote);

    case 'table':
      return convertTable(token as Tokens.Table);

    case 'hr':
      return {
        object: 'block',
        type: 'divider',
        divider: {},
      } as BlockObjectRequest;

    default:
      // 其他类型暂时转为段落
      if ('text' in token && typeof token.text === 'string') {
        return {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: parseRichText(token.text),
          },
        } as BlockObjectRequest;
      }
      return null;
  }
}

function convertHeading(token: Tokens.Heading): NotionBlock {
  const level = Math.min(token.depth, 3) as 1 | 2 | 3;
  const type = `heading_${level}` as const;

  const block: any = {
    object: 'block',
    type,
  };

  block[type] = {
    rich_text: parseRichText(token.text),
  };

  return block as BlockObjectRequest;
}

function convertParagraph(token: Tokens.Paragraph): NotionBlock {
  // 支援 [TOC] 標記，轉換成 Notion 原生目錄
  if (token.text.trim() === '[TOC]') {
    return {
      object: 'block',
      type: 'table_of_contents',
      table_of_contents: {
        color: 'default',
      },
    } as BlockObjectRequest;
  }

  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: parseRichText(token.text),
    },
  } as BlockObjectRequest;
}

function convertList(token: Tokens.List): NotionBlock[] {
  const blocks: NotionBlock[] = [];
  const type = token.ordered ? 'numbered_list_item' : 'bulleted_list_item';

  for (const item of token.items) {
    const text = item.text;
    const block: any = {
      object: 'block',
      type,
    };

    block[type] = {
      rich_text: parseRichText(text),
    };

    blocks.push(block as BlockObjectRequest);
  }

  return blocks;
}

function convertCode(token: Tokens.Code): NotionBlock {
  return {
    object: 'block',
    type: 'code',
    code: {
      rich_text: [{ type: 'text', text: { content: token.text } }],
      language: (token.lang || 'plain text') as any,
    },
  } as BlockObjectRequest;
}

function convertBlockquote(token: Tokens.Blockquote): NotionBlock {
  const text = token.tokens
    .map((t: any) => ('text' in t && typeof t.text === 'string' ? t.text : ''))
    .join('\n');

  return {
    object: 'block',
    type: 'quote',
    quote: {
      rich_text: parseRichText(text),
    },
  } as BlockObjectRequest;
}

function convertTable(token: Tokens.Table): NotionBlock[] {
  // 使用 Notion 原生表格
  const tableWidth = token.header.length;
  const allRows: NotionBlock[] = [];

  // 添加表头行
  const headerCells = token.header.map((h: any) => parseRichText(h.text || ''));
  allRows.push({
    object: 'block',
    type: 'table_row',
    table_row: {
      cells: headerCells,
    },
  } as BlockObjectRequest);

  // 添加表格内容行
  for (const row of token.rows) {
    const cells = row.map((cell: any) => parseRichText(cell.text || ''));
    allRows.push({
      object: 'block',
      type: 'table_row',
      table_row: {
        cells,
      },
    } as BlockObjectRequest);
  }

  // 创建表格容器
  const tableBlock: any = {
    object: 'block',
    type: 'table',
    table: {
      table_width: tableWidth,
      has_column_header: true,
      has_row_header: false,
      children: allRows,
    },
  };

  return [tableBlock as BlockObjectRequest];
}

/**
 * 解析内联格式（粗体、斜体、代码等）
 */
function parseRichText(text: string): RichTextItemRequest[] {
  // 简化版：先不处理复杂的内联格式，直接返回纯文本
  // 如果需要支持粗体、斜体等，需要更复杂的解析
  const cleanText = text
    .replace(/\*\*(.+?)\*\*/g, '$1')  // 移除粗体标记
    .replace(/\*(.+?)\*/g, '$1')       // 移除斜体标记
    .replace(/`(.+?)`/g, '$1')         // 移除代码标记
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1'); // 移除链接，保留文本

  // Notion rich_text 有 2000 字符限制
  if (cleanText.length > 2000) {
    // 分段
    const chunks: RichTextItemRequest[] = [];
    for (let i = 0; i < cleanText.length; i += 2000) {
      chunks.push({
        type: 'text',
        text: { content: cleanText.slice(i, i + 2000) },
      });
    }
    return chunks;
  }

  return [
    {
      type: 'text',
      text: { content: cleanText },
    },
  ];
}
