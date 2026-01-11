/**
 * create_weekly_report 工具
 * 建立本周周報頁面（含 inline database）
 */

import { z } from "zod";
import { NotionMcpClient, type NotionMcpConfig } from "../lib/notion-mcp-client.js";
import { getWeekRange, getCurrentWeekRange, validateDateFormat } from "../lib/date-utils.js";

export const createWeeklySchema = z.object({
  weekStart: z.string().optional().describe("週開始日期 (YYYY-MM-DD)，預設本周一"),
});

export type CreateWeeklyInput = z.infer<typeof createWeeklySchema>;

export async function createWeeklyReport(
  input: CreateWeeklyInput,
  config: NotionMcpConfig
): Promise<string> {
  const client = new NotionMcpClient(config);

  try {
    await client.connect();

    // 計算週範圍
    let weekRange: { start: string; end: string };

    if (input.weekStart) {
      validateDateFormat(input.weekStart);
      weekRange = getWeekRange(input.weekStart);
    } else {
      weekRange = getCurrentWeekRange();
    }

    const { start, end } = weekRange;

    // 檢查是否已存在
    const existing = await client.findWeeklyPage(start, end);

    if (existing) {
      // 已存在，找到 inline database
      const inlineDbId = await client.findInlineDatabase(existing.pageId);

      return JSON.stringify({
        success: true,
        message: `周報已存在: ${start} ~ ${end}`,
        pageId: existing.pageId,
        url: existing.url,
        inlineDbId,
        created: false,
      }, null, 2);
    }

    // 建立新周報頁面
    const created = await client.createWeeklyPage(start, end);

    return JSON.stringify({
      success: true,
      message: `成功建立周報: ${start} ~ ${end}`,
      pageId: created.pageId,
      url: created.url,
      inlineDbId: created.inlineDbId,
      created: true,
    }, null, 2);

  } finally {
    await client.disconnect();
  }
}

export const createWeeklyTool = {
  name: "create_weekly_report",
  description: "建立本周周報頁面（含「一周進度」inline database）。如果已存在則返回現有頁面。",
  inputSchema: createWeeklySchema,
  handler: createWeeklyReport,
};
