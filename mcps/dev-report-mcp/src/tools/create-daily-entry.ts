/**
 * create_daily_entry 工具
 * 在本周 inline DB 建立當日 entry
 */

import { z } from "zod";
import { NotionMcpClient, type NotionMcpConfig } from "../lib/notion-mcp-client.js";
import { getWeekRange, validateDateFormat, formatDate } from "../lib/date-utils.js";
import { getSimpleCommits } from "../lib/git-simple.js";
import {
  estimateTotalHours,
  generateHoursTable,
  generateWorkItems,
  type CommitInfo,
} from "../lib/hour-estimator.js";

export const createDailyEntrySchema = z.object({
  date: z.string().describe("日期 (YYYY-MM-DD)"),
  commitRange: z.string().optional().describe("Git commit 範圍 (如 HEAD~5..HEAD)"),
  author: z.string().optional().describe("篩選作者"),
});

export type CreateDailyEntryInput = z.infer<typeof createDailyEntrySchema>;

export async function createDailyEntry(
  input: CreateDailyEntryInput,
  config: NotionMcpConfig,
  gitRoot?: string
): Promise<string> {
  const { date, commitRange, author } = input;
  validateDateFormat(date);

  const client = new NotionMcpClient(config);

  try {
    await client.connect();

    // 1. 找到該日期所屬的週範圍
    const weekRange = getWeekRange(date);
    const { start, end } = weekRange;

    // 2. 找或建立周報頁面
    let weeklyPage = await client.findWeeklyPage(start, end);
    let inlineDbId: string | null = null;

    if (!weeklyPage) {
      // 建立周報頁面
      const created = await client.createWeeklyPage(start, end);
      weeklyPage = { pageId: created.pageId, url: created.url };
      inlineDbId = created.inlineDbId;
    } else {
      // 找 inline database
      inlineDbId = await client.findInlineDatabase(weeklyPage.pageId);

      if (!inlineDbId) {
        // 如果沒有 inline DB，建立一個
        inlineDbId = await client.createInlineDatabase(weeklyPage.pageId);
      }
    }

    // 3. 檢查是否已存在該日期的 entry
    const existingEntry = await client.findDailyEntry(inlineDbId, date);

    // 4. 分析 commits 並估算時數
    let commits: CommitInfo[] = [];
    let totalHours = 0;
    let workItems: string[] = [];
    let hoursTable = '';

    if (commitRange) {
      commits = await getSimpleCommits(commitRange, author, gitRoot);
      const estimation = estimateTotalHours(commits);
      totalHours = estimation.totalHours;
      workItems = generateWorkItems(commits);
      hoursTable = generateHoursTable(estimation.estimates, totalHours);
    }

    // 5. 產生頁面內容
    const contentMarkdown = generateDailyContent(workItems, hoursTable);

    // 6. 建立或更新 entry
    let entryResult: { pageId: string; url: string };
    let isUpdate = false;

    if (existingEntry) {
      // 更新現有 entry
      await client.updateDailyEntry(existingEntry.pageId, {
        hours: totalHours,
        contentMarkdown,
      });
      entryResult = existingEntry;
      isUpdate = true;
    } else {
      // 建立新 entry
      entryResult = await client.createDailyEntry(inlineDbId, {
        date,
        hours: totalHours,
        contentMarkdown,
      });
    }

    // 7. 重新計算周報總時數
    const weeklyTotalHours = await client.calculateWeeklyTotalHours(inlineDbId);
    await client.updateWeeklyHours(weeklyPage.pageId, weeklyTotalHours);

    return JSON.stringify({
      success: true,
      message: isUpdate
        ? `已更新 ${date} 日誌`
        : `已建立 ${date} 日誌`,
      date,
      weeklyRange: `${start} ~ ${end}`,
      weeklyPageUrl: weeklyPage.url,
      dailyEntryUrl: entryResult.url,
      totalHours,
      weeklyTotalHours,
      workItemsCount: workItems.length,
      commitsAnalyzed: commits.length,
      isUpdate,
    }, null, 2);

  } finally {
    await client.disconnect();
  }
}

/**
 * 產生每日頁面內容
 */
function generateDailyContent(workItems: string[], hoursTable: string): string {
  const sections: string[] = [];

  // 工作項目
  sections.push('## 工作項目\n');
  if (workItems.length > 0) {
    const itemsList = workItems.map((item, i) => `${i + 1}. ${item}`).join('\n');
    sections.push(itemsList);
  } else {
    sections.push('（無工作項目）');
  }

  // 時數明細
  sections.push('\n## 時數明細\n');
  if (hoursTable) {
    sections.push(hoursTable);
  } else {
    sections.push('（無 commit 資料）');
  }

  return sections.join('\n');
}

export const createDailyEntryTool = {
  name: "create_daily_entry",
  description: "在本周的「一周進度」inline DB 中建立指定日期的 entry。自動分析 Git commits 估算時數。",
  inputSchema: createDailyEntrySchema,
  handler: createDailyEntry,
};
