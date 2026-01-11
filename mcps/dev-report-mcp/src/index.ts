import dotenv from "dotenv";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// 取得當前檔案的目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 讀取 package.json 版本號
const packageJsonPath = join(__dirname, "..", "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as { version: string };
const packageVersion = packageJson.version;

/**
 * 向上尋找 Git 倉庫根目錄
 */
function findGitRoot(startPath: string): string {
  let currentPath = startPath;
  const root = "/";

  while (currentPath !== root) {
    const gitPath = join(currentPath, ".git");
    if (existsSync(gitPath)) {
      return currentPath;
    }
    const parentPath = dirname(currentPath);
    if (parentPath === currentPath) {
      break;
    }
    currentPath = parentPath;
  }

  return startPath;
}

// 解析命令行參數以取得 Git root 路徑
const gitRootArg = process.argv.find((arg) => arg.startsWith("--gitRoot="));
let gitRoot: string;

if (gitRootArg) {
  const argValue = gitRootArg.split("=")[1];
  if (argValue) {
    gitRoot = join(process.cwd(), argValue);
  } else {
    gitRoot = findGitRoot(process.cwd());
  }
} else {
  gitRoot = findGitRoot(process.cwd());
}

// 載入環境變數
const envPaths = [
  join(__dirname, "..", ".env.local"),
  join(__dirname, "..", "..", ".env.local"),
  join(process.cwd(), ".env.local"),
];
for (const envPath of envPaths) {
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }
}

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 新版工具
import { createWeeklySchema, createWeeklyReport } from "./tools/create-weekly.js";
import { createDailyEntrySchema, createDailyEntry } from "./tools/create-daily-entry.js";

const shouldDebugEnv =
  process.env.NOTION_DEBUG === "1" || process.env.DEV_REPORT_DEBUG === "1";

const notionConfig = {
  apiKey: process.env.NOTION_API_KEY,
  weeklyDbId: process.env.NOTION__WEEKLY_DB_ID,
  weeklyDataSourceId: process.env.NOTION__WEEKLY_DATA_SOURCE_ID,
  templatePageId: process.env.NOTION__TEMPLATE_PAGE_ID,
  dailyProps: {
    name: process.env.NOTION__DAILY_PROP_NAME || "名稱",
    date: process.env.NOTION__DAILY_PROP_DATE || "工作日期",
    hours: process.env.NOTION__DAILY_PROP_HOURS || "估時",
  },
  weeklyProps: {
    name: process.env.NOTION__WEEKLY_PROP_NAME || "名稱",
    hours: process.env.NOTION__WEEKLY_PROP_HOURS || "周估時",
  },
};

if (shouldDebugEnv) {
  const mask = (val?: string | null) =>
    val ? `${val.slice(0, 6)}... (len ${val.length})` : "missing";
  console.error("[dev-report-mcp] NOTION_API_KEY", mask(notionConfig.apiKey));
  console.error("[dev-report-mcp] NOTION__WEEKLY_DB_ID", mask(notionConfig.weeklyDbId));
  console.error("[dev-report-mcp] dailyProps:", JSON.stringify(notionConfig.dailyProps));
  console.error("[dev-report-mcp] weeklyProps:", JSON.stringify(notionConfig.weeklyProps));
}

const server = new McpServer(
  {
    name: "dev-report-mcp",
    version: packageVersion,
  },
  {
    capabilities: { tools: {} },
  }
);

// 註冊工具
server.registerTool(
  "create_weekly_report",
  {
    description: "建立本周周報頁面（含「一周進度」inline database）。如果已存在則返回現有頁面。",
    inputSchema: createWeeklySchema,
  },
  async (args) => {
    try {
      const parsed = createWeeklySchema.parse(args || {});
      const result = await createWeeklyReport(parsed, notionConfig);
      return {
        content: [{ type: "text" as const, text: result }],
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text" as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "create_daily_entry",
  {
    description: "在本周的「一周進度」inline DB 中建立指定日期的 entry。自動分析 Git commits 估算時數。",
    inputSchema: createDailyEntrySchema,
  },
  async (args) => {
    try {
      const parsed = createDailyEntrySchema.parse(args || {});
      const result = await createDailyEntry(parsed, notionConfig, gitRoot);
      return {
        content: [{ type: "text" as const, text: result }],
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text" as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
server.connect(transport).catch((err) => {
  console.error("Failed to start MCP server", err);
  process.exit(1);
});
