import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { z } from "zod";
import type {
  AppendBlockChildrenResponse,
  CreatePageParameters,
  CreatePageResponse,
  DeleteBlockResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDataSourceParameters,
  QueryDataSourceResponse,
  UpdatePageParameters,
  UpdatePageResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import { markdownToNotionBlocks } from "./markdown-to-notion.js";

export type NotionMcpConfig = {
  apiKey?: string;
  dailyDbId?: string;
  dailyDataSourceId?: string;  // Notion API 2025-09-03 需要用這個 ID 來查詢
  weeklyDbId?: string;
  weeklyDataSourceId?: string;  // Notion API 2025-09-03 需要用這個 ID 來查詢
  templatePageId?: string;  // 模板頁面 ID（用於複製）
  // 屬性名稱映射（支持多語言）
  dailyProps?: {
    name?: string;    // 預設: "Name"
    date?: string;    // 預設: "Date"
    hours?: string;   // 預設: "估時"
  };
  weeklyProps?: {
    name?: string;   // 預設: "Name"
    hours?: string;  // 預設: "周估時"
  };
};

/**
 * Notion MCP 客戶端，用於調用 Notion MCP Server 的工具
 */
export class NotionMcpClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private config: NotionMcpConfig;

  private toolResponseSchema = z.object({
    content: z
      .array(
        z.object({
          type: z.string(),
          text: z.string(),
        })
      )
      .min(1),
  });

  constructor(config: NotionMcpConfig) {
    this.config = config;
  }

  /**
   * 獲取 Daily 屬性名稱（支持自定義）
   */
  getDailyPropName(key: 'name' | 'date' | 'hours'): string {
    const defaults = { name: 'Name', date: 'Date', hours: '估時' };
    return this.config.dailyProps?.[key] || defaults[key];
  }

  /**
   * 獲取 Weekly 屬性名稱（支持自定義）
   */
  getWeeklyPropName(key: 'name' | 'hours'): string {
    const defaults = { name: 'Name', hours: '周估時' };
    return this.config.weeklyProps?.[key] || defaults[key];
  }

  /**
   * 將 pageId 轉換為 Notion URL
   */
  private getNotionUrl(pageId: string): string {
    // 移除 UUID 中的破折號
    const cleanId = pageId.replace(/-/g, '');
    return `https://www.notion.so/${cleanId}`;
  }

  /**
   * 將 rich_text 陣列轉成純文字
   */
  private getRichTextPlainText(richText: any): string {
    if (Array.isArray(richText)) {
      return richText.map((r: any) => r.plain_text || r.text?.content || '').join('');
    }
    return '';
  }

  /**
   * 解析 MCP 工具返回結果
   */
  private parseToolResult<T>(result: unknown): T {
    const validated = this.toolResponseSchema.safeParse(result);
    if (!validated.success) {
      throw new Error(`Invalid response from Notion MCP: ${validated.error.message}`);
    }

    try {
      return JSON.parse(validated.data.content[0]!.text) as T;
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to parse Notion MCP response: ${reason}`);
    }
  }

  /**
   * 初始化 MCP 客戶端連接
   */
  async connect() {
    if (this.client) return;

    if (!this.config.apiKey) {
      throw new Error("NOTION_API_KEY is required");
    }

    this.transport = new StdioClientTransport({
      command: "npx",
      args: ["-y", "@notionhq/notion-mcp-server@2.0.0"],
      env: {
        ...process.env,
        // notion-mcp-server 採用 NOTION_TOKEN
        NOTION_API_KEY: this.config.apiKey,
        NOTION_TOKEN: this.config.apiKey,
      },
    });

    this.client = new Client(
      {
        name: "dev-report-mcp-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    await this.client.connect(this.transport);
  }

  /**
   * 關閉連接
   */
  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }

    if (this.transport) {
      await this.transport.close();
      this.transport = null;
    }
  }

  /**
   * 查詢 database
   */
  async queryDatabase(
    databaseId: string,
    filter?: QueryDataSourceParameters["filter"],
    sorts?: QueryDataSourceParameters["sorts"]
  ): Promise<QueryDataSourceResponse> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    console.error(`[queryDatabase] Calling API-query-data-source with:`, JSON.stringify({
      data_source_id: databaseId,
      filter,
      sorts,
    }, null, 2));

    const result = await this.client.callTool({
      name: "API-query-data-source",
      arguments: {
        data_source_id: databaseId,
        filter,
        sorts,
      },
    });

    console.error(`[queryDatabase] Raw result:`, JSON.stringify(result, null, 2).slice(0, 500));

    return this.parseToolResult<QueryDataSourceResponse>(result);
  }

  /**
   * 建立頁面
   */
  async createPage(
    params: Pick<CreatePageParameters, "parent" | "properties" | "children" | "icon" | "cover">
  ): Promise<CreatePageResponse> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    const result = await this.client.callTool({
      name: "API-post-page",
      arguments: params,
    });

    return this.parseToolResult<CreatePageResponse>(result);
  }

  /**
   * 更新頁面屬性
   */
  async updatePage(
    pageId: string,
    properties: UpdatePageParameters["properties"]
  ): Promise<UpdatePageResponse> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    const result = await this.client.callTool({
      name: "API-patch-page",
      arguments: {
        page_id: pageId,
        properties,
      },
    });

    return this.parseToolResult<UpdatePageResponse>(result);
  }

  /**
   * 取得 block children（單頁，內部使用）
   */
  private async getBlockChildrenPage(blockId: string, startCursor?: string): Promise<ListBlockChildrenResponse> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    const args: Record<string, unknown> = { block_id: blockId, page_size: 100 };
    if (startCursor) {
      args.start_cursor = startCursor;
    }

    const result = await this.client.callTool({
      name: "API-get-block-children",
      arguments: args,
    });

    return this.parseToolResult<ListBlockChildrenResponse>(result);
  }

  /**
   * 取得所有 block children（自動分頁）
   */
  async getBlockChildren(blockId: string): Promise<ListBlockChildrenResponse> {
    const allResults: ListBlockChildrenResponse['results'] = [];
    let cursor: string | undefined;
    let response: ListBlockChildrenResponse;

    do {
      response = await this.getBlockChildrenPage(blockId, cursor);
      allResults.push(...(response.results || []));
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);

    return {
      ...response,
      results: allResults,
      has_more: false,
      next_cursor: null,
    };
  }

  /**
   * 新增 block children
   */
  async appendBlockChildren(
    blockId: string,
    children: NonNullable<CreatePageParameters["children"]>
  ): Promise<AppendBlockChildrenResponse> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    const result = await this.client.callTool({
      name: "API-patch-block-children",
      arguments: {
        block_id: blockId,
        children,
      },
    });

    return this.parseToolResult<AppendBlockChildrenResponse>(result);
  }

  /**
   * 刪除 block
   */
  async deleteBlock(blockId: string): Promise<DeleteBlockResponse> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    const result = await this.client.callTool({
      name: "API-delete-a-block",
      arguments: {
        block_id: blockId,
      },
    });

    return this.parseToolResult<DeleteBlockResponse>(result);
  }

  /**
   * 替換頁面的所有 blocks
   */
  async replacePageBlocks(
    pageId: string,
    newBlocks: NonNullable<CreatePageParameters["children"]>
  ): Promise<void> {
    // 1. 取得現有的所有 blocks
    const existing = await this.getBlockChildren(pageId);

    // 2. 刪除所有現有 blocks
    if (existing.results && existing.results.length > 0) {
      for (const block of existing.results) {
        if ('id' in block) {
          await this.deleteBlock(block.id);
        }
      }
    }

    // 3. 新增 blocks（分批處理，Notion API 限制每次最多 100 個）
    if (newBlocks.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < newBlocks.length; i += batchSize) {
        const batch = newBlocks.slice(i, i + batchSize);
        await this.appendBlockChildren(pageId, batch);
      }
    }
  }

  /**
   * Upsert Daily Page
   * 每個專案獨立一頁，用 date + projectName 作為唯一鍵
   */
  async upsertDailyPage(opts: {
    date: string;
    title: string;
    contentMarkdown: string;
    projectName?: string;
  }) {
    const { date, contentMarkdown, projectName } = opts;

    if (!this.config.dailyDbId) {
      throw new Error("dailyDbId is not configured");
    }

    // 優先使用 dailyDataSourceId（Notion API 2025-09-03），否則回退到 dailyDbId
    const queryId = this.config.dailyDataSourceId || this.config.dailyDbId;

    // 頁面標題：有專案名則包含專案名
    const pageTitle = projectName
      ? `${date} ${projectName} 日報`
      : `${date} 日報`;

    // 查詢是否已存在（用標題匹配，確保 date + projectName 唯一）
    const existing = await this.queryDatabase(queryId, {
      property: this.getDailyPropName('name'),
      title: { equals: pageTitle },
    });

    const pageProps: NonNullable<UpdatePageParameters["properties"]> = {
      [this.getDailyPropName('name')]: { title: [{ text: { content: pageTitle } }] },
      [this.getDailyPropName('date')]: { date: { start: date } },
    };

    // 將 Markdown 轉換為 Notion blocks
    const blocks = markdownToNotionBlocks(contentMarkdown);

    if (existing.results && existing.results.length > 0) {
      const pageId = existing.results[0]!.id;

      // 更新頁面屬性
      await this.updatePage(pageId, pageProps);

      // 直接覆蓋整頁內容（每專案獨立頁，不需合併）
      await this.replacePageBlocks(pageId, blocks);

      return { pageId, url: this.getNotionUrl(pageId), updated: true };
    }

    // 建立新頁面
    const created = await this.createPage({
      parent: { database_id: this.config.dailyDbId },
      properties: pageProps,
      children: blocks,
    });

    return { pageId: created.id, url: this.getNotionUrl(created.id), updated: false };
  }

  /**
   * 更新 Daily Summary
   * 每專案獨立頁面，直接覆寫該頁的「今日彙總」區塊
   */
  async updateDailySummary(date: string, summary: string, projectName?: string, pageId?: string) {
    if (!this.config.dailyDbId) {
      throw new Error("dailyDbId is not configured");
    }

    // 優先使用 dailyDataSourceId（Notion API 2025-09-03），否則回退到 dailyDbId
    const queryId = this.config.dailyDataSourceId || this.config.dailyDbId;

    // 如果沒有提供 pageId，則用標題查找頁面
    if (!pageId) {
      const pageTitle = projectName
        ? `${date} ${projectName} 日報`
        : `${date} 日報`;

      // 使用 title filter 查詢
      const existing = await this.queryDatabase(queryId, {
        property: this.getDailyPropName('name'),
        title: { equals: pageTitle },
      });

      if (!existing.results || existing.results.length === 0) {
        throw new Error(`Daily page not found: ${pageTitle}`);
      }

      pageId = existing.results[0]!.id;
    }

    // 獲取現有 blocks
    const existingBlocks = await this.getBlockChildren(pageId);

    // 查找「今日彙總」區塊的索引
    let summaryBlockIndex = -1;
    for (let i = 0; i < existingBlocks.results.length; i++) {
      const block = existingBlocks.results[i];
      if (!block || !('type' in block)) continue;
      const type: any = (block as any).type;
      const payload: any = (block as any)[type];
      const headingText = this.getRichTextPlainText(payload?.rich_text).trim();

      if (type.startsWith('heading_') && headingText === '今日彙總') {
        summaryBlockIndex = i;
        break;
      }
    }

    // 直接覆寫「今日彙總」區塊
    await this.updateSingleProjectSummary(pageId, existingBlocks, summaryBlockIndex, summary);

    return { pageId };
  }

  /**
   * 單專案模式：覆寫整個「今日彙總」區塊
   */
  private async updateSingleProjectSummary(
    pageId: string,
    existingBlocks: ListBlockChildrenResponse,
    summaryBlockIndex: number,
    summary: string
  ) {
    // 3. 如果找到舊的「今日彙總」區塊，刪除它及其後續內容直到下一個同級標題或結尾
    if (summaryBlockIndex >= 0) {
      const summaryBlock = existingBlocks.results[summaryBlockIndex];
      if (!summaryBlock) return;
      const summaryHeadingLevel = ('type' in summaryBlock) ? (summaryBlock as any).type : '';

      // 刪除從「今日彙總」開始的內容
      for (let i = summaryBlockIndex; i < existingBlocks.results.length; i++) {
        const block = existingBlocks.results[i];
        if (!block || !('type' in block)) continue;

        // 如果遇到同級或更高級的標題，且不是第一個區塊（今日彙總本身），則停止刪除
        const currentType: any = (block as any).type;
        if (i > summaryBlockIndex && currentType.startsWith('heading_')) {
          const currentLevel = parseInt(currentType.replace('heading_', ''));
          const summaryLevel = parseInt(summaryHeadingLevel.replace('heading_', ''));
          if (currentLevel <= summaryLevel) {
            break;
          }
        }

        if ('id' in block) {
          await this.deleteBlock(block.id);
        }
      }
    }

    // 4. 追加新的「今日彙總」區塊
    const summaryBlocks: NonNullable<CreatePageParameters["children"]> = [
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: '今日彙總' } }],
        },
      },
      ...markdownToNotionBlocks(summary),
    ];

    await this.appendBlockChildren(pageId, summaryBlocks);
  }

  /**
   * 提取頁面中所有專案的詳細數據
   */
  async extractProjectData(pageId: string): Promise<{
    projects: Array<{
      name: string;
      kpi: { N?: number; SSH?: number; C?: number; H?: number; M?: number };
      tasks: string[];
    }>;
  }> {
    const blocks = await this.getBlockChildren(pageId);
    const projects: Array<{
      name: string;
      kpi: { N?: number; SSH?: number; C?: number; H?: number; M?: number };
      tasks: string[];
    }> = [];

    let currentProject: string | null = null;
    let inProjectSection = false;
    let inTaskSection = false;
    let inKpiSection = false;
    let currentKpi: { N?: number; SSH?: number; C?: number; H?: number; M?: number } = {};
    let currentTasks: string[] = [];

    for (let i = 0; i < blocks.results.length; i++) {
      const block = blocks.results[i];
      if (!block || !('type' in block)) continue;

      const type: any = (block as any).type;
      const payload: any = (block as any)[type];
      const text = this.getRichTextPlainText(payload?.rich_text).trim();

      // 檢測「專案詳細數據」區塊開始
      if (type === 'heading_2' && text === '專案詳細數據') {
        inProjectSection = true;
        continue;
      }

      // 檢測「今日彙總」區塊開始(結束專案數據收集)
      if (type === 'heading_2' && text === '今日彙總') {
        // 保存最後一個專案
        if (currentProject) {
          projects.push({
            name: currentProject,
            kpi: currentKpi,
            tasks: currentTasks,
          });
        }
        break;
      }

      if (!inProjectSection) continue;

      // 檢測專案名稱 (heading_3)
      if (type === 'heading_3') {
        // 保存前一個專案
        if (currentProject) {
          projects.push({
            name: currentProject,
            kpi: currentKpi,
            tasks: currentTasks,
          });
        }

        // 開始新專案
        currentProject = text;
        currentKpi = {};
        currentTasks = [];
        inTaskSection = false;
        inKpiSection = false;
        continue;
      }

      if (!currentProject) continue;

      // 檢測子標題
      if (type === 'heading_4') {
        if (text === '任務彙總表') {
          inTaskSection = true;
          inKpiSection = false;
        } else if (text === 'KPI 數據') {
          inTaskSection = false;
          inKpiSection = true;
        } else {
          inTaskSection = false;
          inKpiSection = false;
        }
        continue;
      }

      // 提取任務 (從表格中)
      if (inTaskSection && type === 'table') {
        // 表格會包含 table_row blocks
        const tableBlock = block as any;
        if ('id' in tableBlock) {
          try {
            const tableChildren = await this.getBlockChildren(tableBlock.id);
            for (const row of tableChildren.results || []) {
              if (!row || !('type' in row)) continue;
              const rowType: any = (row as any).type;
              if (rowType === 'table_row') {
                const cells = (row as any).table_row?.cells || [];
                // 第二列是任務摘要
                if (cells[1]) {
                  const taskText = this.getRichTextPlainText(cells[1]).trim();
                  // 跳過標題行和小計行
                  if (taskText && !taskText.includes('任務摘要') && !taskText.includes('本日小計') && !taskText.includes('尚無任務')) {
                    currentTasks.push(taskText);
                  }
                }
              }
            }
          } catch (err) {
            // ignore
          }
        }
      }

      // 提取 KPI
      if (inKpiSection && payload?.rich_text) {
        const kpiText = text;
        const parsedKpi = this.parseKpiFromText(kpiText);
        Object.assign(currentKpi, parsedKpi);
      }
    }

    return { projects };
  }

  /**
   * 獲取當前「今日彙總」的內容(用於參考)
   */
  async getCurrentDailySummary(pageId: string): Promise<string> {
    const blocks = await this.getBlockChildren(pageId);

    // 找到「今日彙總」區塊
    let summaryBlockIndex = -1;
    for (let i = 0; i < blocks.results.length; i++) {
      const block = blocks.results[i];
      if (!block || !('type' in block)) continue;
      const type: any = (block as any).type;
      const payload: any = (block as any)[type];
      const headingText = this.getRichTextPlainText(payload?.rich_text).trim();

      if (type.startsWith('heading_') && headingText === '今日彙總') {
        summaryBlockIndex = i;
        break;
      }
    }

    if (summaryBlockIndex < 0) {
      return ''; // 沒有今日彙總
    }

    // 提取「今日彙總」的內容
    return this.extractSectionText(blocks, '今日彙總');
  }

  /**
   * 解析 KPI 數據區塊文字
   */
  private parseKpiFromText(text: string): { N?: number; SSH?: number; C?: number; H?: number; M?: number } {
    const kpi: { N?: number; SSH?: number; C?: number; H?: number; M?: number } = {};

    // 匹配格式: "N (任務點數): 30.25 點" 或 "M (產能倍率): 0.81 (C 待改善)"
    const nMatch = text.match(/N\s*[（(]?[^)）]*[)）]?\s*[:：]\s*([\d.]+)/);
    const sshMatch = text.match(/SSH\s*[（(]?[^)）]*[)）]?\s*[:：]\s*([\d.]+)/);
    const cMatch = text.match(/C\s*[（(]?複雜度[)）]?\s*[:：]\s*([\d.]+)/);
    const hMatch = text.match(/H\s*[（(]?[^)）]*[)）]?\s*[:：]\s*([\d.]+)/);
    const mMatch = text.match(/M\s*[（(]?[^)）]*[)）]?\s*[:：]\s*([\d.]+)/);

    if (nMatch) kpi.N = parseFloat(nMatch[1]!);
    if (sshMatch) kpi.SSH = parseFloat(sshMatch[1]!);
    if (cMatch) kpi.C = parseFloat(cMatch[1]!);
    if (hMatch) kpi.H = parseFloat(hMatch[1]!);
    if (mMatch) kpi.M = parseFloat(mMatch[1]!);

    return kpi;
  }

  /**
   * 獲取 Daily Summaries（按日期合併同一天的多個專案頁面）
   */
  async fetchDailySummaries(startDate: string, endDate: string) {
    // 優先使用 dailyDataSourceId（Notion API 2025-09-03），否則回退到 dailyDbId
    const queryId = this.config.dailyDataSourceId || this.config.dailyDbId;
    if (!queryId) {
      throw new Error("dailyDataSourceId or dailyDbId is not configured");
    }

    const dateProp = this.getDailyPropName('date');
    console.error(`[fetchDailySummaries] Querying with dateProp="${dateProp}", range: ${startDate} ~ ${endDate}, queryId: ${queryId}`);

    const res = await this.queryDatabase(
      queryId,
      {
        and: [
          { property: dateProp, date: { on_or_after: startDate } },
          { property: dateProp, date: { on_or_before: endDate } },
        ],
      },
      [{ property: dateProp, direction: "ascending" }]
    );

    console.error(`[fetchDailySummaries] Query returned ${res.results?.length || 0} results`);

    const pages =
      res.results?.filter((item): item is PageObjectResponse => {
        return item.object === "page" && "properties" in item;
      }) || [];

    console.error(`[fetchDailySummaries] Filtered to ${pages.length} pages`);

    const namePropName = this.getDailyPropName('name');

    // 先收集所有頁面的數據，按日期分組
    const dailyMap = new Map<string, {
      title: string;
      summaries: string[];
      kpis: { N?: number; SSH?: number; C?: number; H?: number; M?: number }[];
    }>();

    for (const page of pages) {
      const props = page.properties;
      const datePropValue = props[dateProp];
      const date = (datePropValue && datePropValue.type === 'date' && datePropValue.date?.start) || "";
      if (!date) continue;

      const namePropValue = props[namePropName];
      const title =
        (namePropValue && namePropValue.type === 'title' && namePropValue.title?.map((t) => t.plain_text).join("")) || "";

      // 從標題提取專案名稱
      const projectName = title
        .replace(date, '')
        .replace('日報', '')
        .trim();

      let summary = "";
      let kpi: { N?: number; SSH?: number; C?: number; H?: number; M?: number } = {};

      // 從頁面 blocks 抓取內容
      try {
        const blocks = await this.getBlockChildren(page.id);

        // 抓取 KPI 數據區塊
        const kpiText = this.extractSectionText(blocks, 'KPI 數據').trim();
        if (kpiText) {
          kpi = this.parseKpiFromText(kpiText);
        }

        // 抓取今日彙總
        summary = this.extractSectionText(blocks, '今日總結').trim();
        if (!summary) {
          summary = this.extractSectionText(blocks, '今日彙總').trim();
        }
        if (!summary) {
          summary = this.extractPlainText(blocks).trim();
        }
      } catch (err) {
        // ignore block fetch failure
      }

      // 加入專案名稱前綴（如果有）
      const prefixedSummary = projectName
        ? `**${projectName}**\n${summary}`
        : summary;

      // 按日期分組
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          title: `${date} 日報`,
          summaries: [],
          kpis: [],
        });
      }
      const dayData = dailyMap.get(date)!;
      if (prefixedSummary) {
        dayData.summaries.push(prefixedSummary);
      }
      if (Object.keys(kpi).length > 0) {
        dayData.kpis.push(kpi);
      }
    }

    // 合併每天的數據
    const summaries: {
      date: string;
      title?: string;
      summary?: string;
      kpi?: { N?: number; SSH?: number; C?: number; H?: number; M?: number };
    }[] = [];

    for (const [date, data] of dailyMap) {
      // 合併 KPI（累加 N, SSH, H；M 取平均）
      const mergedKpi: { N?: number; SSH?: number; C?: number; H?: number; M?: number } = {};
      let totalN = 0, totalSSH = 0, totalH = 0, totalM = 0, mCount = 0;

      for (const k of data.kpis) {
        if (k.N) totalN += k.N;
        if (k.SSH) totalSSH += k.SSH;
        if (k.H) totalH += k.H;
        if (k.M) { totalM += k.M; mCount++; }
      }

      if (totalN) mergedKpi.N = parseFloat(totalN.toFixed(2));
      if (totalSSH) mergedKpi.SSH = parseFloat(totalSSH.toFixed(2));
      if (totalH) mergedKpi.H = parseFloat(totalH.toFixed(2));
      if (mCount > 0) mergedKpi.M = parseFloat((totalM / mCount).toFixed(2));

      summaries.push({
        date,
        title: data.title,
        summary: data.summaries.join('\n\n'),
        kpi: mergedKpi,
      });
    }

    return summaries;
  }

  /**
   * 將 block children 轉為純文字摘要（取前 200 字）
   */
  private extractPlainText(blocks: ListBlockChildrenResponse): string {
    const texts: string[] = [];
    for (const block of blocks.results || []) {
      if (!("type" in block)) continue;
      const type: any = (block as any).type;
      const payload: any = (block as any)[type];
      const richTextText = this.getRichTextPlainText(payload?.rich_text);
      if (richTextText) {
        texts.push(richTextText);
        continue;
      }
      if (payload?.text?.content) {
        texts.push(payload.text.content);
      }
    }
    return texts.join('\n');
  }

  /**
   * 抽取指定標題之後到下一個標題前的文字
   * 支援模糊匹配（移除 emoji、空格後比較）
   */
  private extractSectionText(blocks: ListBlockChildrenResponse, heading: string): string {
    const texts: string[] = [];
    let capturing = false;
    let captureHeadingLevel = 0;

    // 標準化標題文字（移除 emoji、空格、標點）
    const normalizeHeading = (text: string) =>
      text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // 移除 emoji
        .replace(/[^\w\u4e00-\u9fff]/g, '') // 只保留字母數字和中文
        .toLowerCase();

    const targetHeading = normalizeHeading(heading);

    for (const block of blocks.results || []) {
      if (!("type" in block)) continue;
      const type: any = (block as any).type;
      const payload: any = (block as any)[type];

      const headingText = this.getRichTextPlainText(payload?.rich_text).trim();
      const isHeading = typeof type === 'string' && type.startsWith('heading_');

      if (isHeading) {
        const currentLevel = parseInt(type.replace('heading_', ''), 10);
        const normalizedText = normalizeHeading(headingText);

        if (capturing) {
          // 遇到同級或更高級的標題就停止
          if (currentLevel <= captureHeadingLevel) {
            break;
          }
          // 否則繼續捕獲（子標題的內容也要）
          continue;
        }

        // 模糊匹配目標標題
        if (normalizedText.includes(targetHeading) || targetHeading.includes(normalizedText)) {
          capturing = true;
          captureHeadingLevel = currentLevel;
        }
        continue;
      }

      if (capturing) {
        if (headingText) texts.push(headingText);
        else if (payload?.text?.content) texts.push(payload.text.content);
      }
    }

    return texts.join('\n');
  }

  /**
   * Upsert Weekly Page
   */
  async upsertWeeklyPage(
    startDate: string,
    endDate: string,
    markdown: string
  ) {
    if (!this.config.weeklyDbId) {
      throw new Error("weeklyDbId is not configured");
    }

    // 優先使用 weeklyDataSourceId（Notion API 2025-09-03），否則回退到 weeklyDbId
    const queryId = this.config.weeklyDataSourceId || this.config.weeklyDbId;

    const title = `${startDate} ~ ${endDate} 週報`;
    // 以標題當唯一鍵，週報 DB 欄位僅有名稱
    const existing = await this.queryDatabase(queryId, {
      property: this.getWeeklyPropName('name'),
      title: { equals: title },
    });

    const properties: NonNullable<UpdatePageParameters["properties"]> = {
      [this.getWeeklyPropName('name')]: { title: [{ text: { content: title } }] },
    };

    // 將 Markdown 轉換為 Notion blocks
    const blocks = markdownToNotionBlocks(markdown);

    if (existing.results && existing.results.length > 0) {
      const pageId = existing.results[0]!.id;

      // 更新頁面屬性
      await this.updatePage(pageId, properties);

      // 清空並重新寫入 blocks
      await this.replacePageBlocks(pageId, blocks);

      return { pageId, url: this.getNotionUrl(pageId), updated: true };
    }

    // 建立新頁面（先創建空白頁面，再分批添加 blocks）
    // Notion API 限制每次最多 100 個 children
    const firstBatch = blocks.slice(0, 100);
    const remainingBlocks = blocks.slice(100);

    const created = await this.createPage({
      parent: { database_id: this.config.weeklyDbId },
      properties,
      children: firstBatch,
    });

    // 如果還有更多 blocks，分批添加
    if (remainingBlocks.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < remainingBlocks.length; i += batchSize) {
        const batch = remainingBlocks.slice(i, i + batchSize);
        await this.appendBlockChildren(created.id, batch);
      }
    }

    return { pageId: created.id, url: this.getNotionUrl(created.id), updated: false };
  }

  // ========================================
  // 新版周報相關方法
  // ========================================

  /**
   * 找指定週範圍的周報頁面
   */
  async findWeeklyPage(startDate: string, endDate: string): Promise<{
    pageId: string;
    url: string;
  } | null> {
    if (!this.config.weeklyDbId) {
      throw new Error("weeklyDbId is not configured");
    }

    const queryId = this.config.weeklyDataSourceId || this.config.weeklyDbId;
    const title = `${startDate} ~ ${endDate}`;

    const existing = await this.queryDatabase(queryId, {
      property: this.getWeeklyPropName('name'),
      title: { equals: title },
    });

    if (existing.results && existing.results.length > 0) {
      const pageId = existing.results[0]!.id;
      return { pageId, url: this.getNotionUrl(pageId) };
    }

    return null;
  }

  /**
   * 建立周報頁面（含 inline database）
   */
  async createWeeklyPage(startDate: string, endDate: string): Promise<{
    pageId: string;
    url: string;
    inlineDbId: string;
  }> {
    if (!this.config.weeklyDbId) {
      throw new Error("weeklyDbId is not configured");
    }

    const title = `${startDate} ~ ${endDate}`;
    const nameProp = this.getWeeklyPropName('name');
    const hoursProp = this.getWeeklyPropName('hours');

    // 建立周報頁面
    const created = await this.createPage({
      parent: { database_id: this.config.weeklyDbId },
      properties: {
        [nameProp]: { title: [{ text: { content: title } }] },
        [hoursProp]: { number: 0 },
      },
      children: [],
    });

    // 建立 inline database
    const inlineDbId = await this.createInlineDatabase(created.id);

    return {
      pageId: created.id,
      url: this.getNotionUrl(created.id),
      inlineDbId,
    };
  }

  /**
   * 在頁面內建立 inline database
   */
  async createInlineDatabase(pageId: string): Promise<string> {
    if (!this.client) {
      throw new Error("Client not connected. Call connect() first.");
    }

    const nameProp = this.getDailyPropName('name');
    const hoursProp = this.getDailyPropName('hours');
    const dateProp = this.getDailyPropName('date');

    // 使用 API-post-database 建立 child database
    const result = await this.client.callTool({
      name: "API-post-database",
      arguments: {
        parent: { page_id: pageId },
        title: [{ type: 'text', text: { content: '一周進度' } }],
        properties: {
          [nameProp]: { title: {} },
          [hoursProp]: { number: { format: 'number' } },
          [dateProp]: { date: {} },
        },
      },
    });

    const parsed = this.parseToolResult<{ id: string }>(result);
    return parsed.id;
  }

  /**
   * 找頁面內的 inline database
   */
  async findInlineDatabase(pageId: string, dbTitle: string = '一周進度'): Promise<string | null> {
    const children = await this.getBlockChildren(pageId);

    for (const block of children.results || []) {
      if (!('type' in block)) continue;
      const type = (block as any).type;

      if (type === 'child_database') {
        const title = (block as any).child_database?.title || '';
        if (title === dbTitle) {
          return block.id;
        }
      }
    }

    return null;
  }

  /**
   * 在 inline database 中查詢指定日期的 entry
   */
  async findDailyEntry(inlineDbId: string, date: string): Promise<{
    pageId: string;
    url: string;
  } | null> {
    const dateProp = this.getDailyPropName('date');

    const existing = await this.queryDatabase(inlineDbId, {
      property: dateProp,
      date: { equals: date },
    });

    if (existing.results && existing.results.length > 0) {
      const pageId = existing.results[0]!.id;
      return { pageId, url: this.getNotionUrl(pageId) };
    }

    return null;
  }

  /**
   * 在 inline database 中建立每日 entry
   */
  async createDailyEntry(inlineDbId: string, opts: {
    date: string;
    hours: number;
    contentMarkdown: string;
  }): Promise<{
    pageId: string;
    url: string;
  }> {
    const { date, hours, contentMarkdown } = opts;
    const nameProp = this.getDailyPropName('name');
    const hoursProp = this.getDailyPropName('hours');
    const dateProp = this.getDailyPropName('date');

    const blocks = markdownToNotionBlocks(contentMarkdown);

    const created = await this.createPage({
      parent: { database_id: inlineDbId },
      properties: {
        [nameProp]: { title: [{ text: { content: date } }] },
        [hoursProp]: { number: hours },
        [dateProp]: { date: { start: date } },
      },
      children: blocks,
    });

    return {
      pageId: created.id,
      url: this.getNotionUrl(created.id),
    };
  }

  /**
   * 更新每日 entry 的時數和內容
   */
  async updateDailyEntry(pageId: string, opts: {
    hours?: number;
    contentMarkdown?: string;
  }): Promise<void> {
    const { hours, contentMarkdown } = opts;

    // 更新屬性
    if (hours !== undefined) {
      const hoursProp = this.getDailyPropName('hours');
      await this.updatePage(pageId, {
        [hoursProp]: { number: hours },
      });
    }

    // 更新內容
    if (contentMarkdown !== undefined) {
      const blocks = markdownToNotionBlocks(contentMarkdown);
      await this.replacePageBlocks(pageId, blocks);
    }
  }

  /**
   * 更新周報的總時數
   */
  async updateWeeklyHours(pageId: string, totalHours: number): Promise<void> {
    const hoursProp = this.getWeeklyPropName('hours');
    await this.updatePage(pageId, {
      [hoursProp]: { number: totalHours },
    });
  }

  /**
   * 計算周報內所有 entry 的總時數
   */
  async calculateWeeklyTotalHours(inlineDbId: string): Promise<number> {
    const hoursProp = this.getDailyPropName('hours');

    const result = await this.queryDatabase(inlineDbId);
    let total = 0;

    for (const page of result.results || []) {
      if (!('properties' in page)) continue;
      const props = (page as any).properties;
      const hoursValue = props[hoursProp];
      if (hoursValue?.type === 'number' && hoursValue.number !== null) {
        total += hoursValue.number;
      }
    }

    return Math.round(total * 10) / 10;
  }
}
