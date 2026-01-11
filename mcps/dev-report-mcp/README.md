# Dev Report MCP (Notion 版)

輕量 MCP Server，用 git commit 區間 + KPI 規則生成日報，並同步至 Notion Daily/Weekly 資料庫。

## 安裝與啟動

```bash
cd mcps/dev-report-mcp
pnpm install
pnpm dev   # tsx src/index.ts
```

在專案根 `.mcp.json` 配置：

```json
{
  "mcpServers": {
    "dev-report-mcp": {
      "command": "pnpm",
      "args": [
        "-C",
        "mcps/dev-report-mcp",
        "exec",
        "tsx",
        "src/index.ts"
      ]
    }
  }
}
```

### Git Root 路徑說明

`dev-report-mcp` 預設會**自動偵測 Git repository 根目錄**：

- 從當前工作目錄開始，向上逐層查找 `.git` 目錄
- 找到後使用該目錄作為 Git repository 路徑
- **在 eluelu-mono 中**：即使執行時在 `mcps/dev-report-mcp` 目錄，也會自動找到專案根目錄
- **在其他專案中使用 submodule**：會自動找到父專案的 Git root，而非 submodule 本身

#### 手動指定路徑（進階用法）

如果自動偵測無法正常工作，或需要分析不同的 Git repository，可以使用 `--gitRoot` 參數：

```json
{
  "mcpServers": {
    "dev-report-mcp": {
      "command": "pnpm",
      "args": [
        "-C",
        "mcps/dev-report-mcp",
        "exec",
        "tsx",
        "src/index.ts",
        "--gitRoot=."
      ]
    }
  }
}
```

**支援的路徑格式**：
- `.` - 相對於 `.mcp.json` 所在目錄（推薦）
- `../other-project` - 相對路徑
- `/absolute/path/to/project` - 絕對路徑（不建議，因為不可移植）

**使用情境**：
1. **Submodule 情境**：通常不需要特別配置，Git 會自動處理
2. **分析其他專案**：使用相對或絕對路徑指向目標專案
3. **Monorepo**：分析特定子專案時指定其路徑

## 環境變數

`.env.local`（或同目錄的環境變數）：

```
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION__DAILY_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION__WEEKLY_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 設置步驟

1. **創建 Notion Integration**
   - 訪問 https://www.notion.so/my-integrations
   - 點擊 "+ New integration" 創建新的集成
   - 複製 "Internal Integration Token"（格式：`secret_xxx`）
   - 在 `.env.local` 中設置 `NOTION_API_KEY`

2. **獲取 Database ID**
   - 在 Notion 中打開要使用的 Database
   - 點擊右上角 "..." → "Connections" → 添加你的集成
   - 從 URL 中獲取 Database ID（32 位字符）
   - 在 `.env.local` 中設置相應的 Database ID

Notion DB 欄位約定：
- Daily DB：`Name` (title)、`Date` (date)
  - 每個專案獨立一頁，頁面標題格式：`{date} {projectName} 日報`
  - 唯一鍵：`date + projectName`（projectName 缺省時僅用 date）；同日同專案重跑會覆寫該頁，不同專案會建立新頁
- Weekly DB：`Name` (title)、`Start` (date)、`End` (date)、`Content` (rich_text)

## 架構說明

本項目通過 **Notion MCP** 來操作 Notion API，提供更標準化和明確的接口。

### 架構層次

```
dev-report-mcp (MCP Server)
    ↓
NotionMcpClient (封裝層)
    ↓
@notionhq/notion-mcp-server (Notion MCP Server)
    ↓
Notion API
```

### 為什麼使用 Notion MCP？

1. **標準化接口**：使用 MCP 協議標準化與 Notion 的交互
2. **更好的抽象**：MCP 工具提供了更清晰的操作抽象
3. **易於維護**：集中管理 Notion API 的調用邏輯
4. **類型安全**：通過 MCP 客戶端提供更好的類型支持

## 內建模板

- `templates/kpi.md`（含 v2~v6 參考）
- `templates/daily.md`：日報（含專案報告區塊）
- `templates/week.md`：週報（彙總 daily）

## MCP 工具

1) `analyze_commits`  
   - `commitRange` (必填) `"HEAD~5..HEAD"`  
   - `author` (可選)  
   - `manualHours` (可選) 覆寫 H  
   回傳 commits/檔案/行數統計與 KPI（N/C/H/M）。

2) `sync_daily_to_notion`
   - `commitRange`、`date` (YYYY-MM-DD) 必填
   - `author`、`manualHours`、`projectName` 可選
   依 `kpi.md` + `daily.md` 生成日報 Markdown，寫入 Notion Daily DB（若未設定 Notion 則僅回傳 Markdown）。會先用 `date + projectName` 查找既有頁面，找到則覆寫，找不到則新建。
   - 若提供 `projectName`，報告會以該專案名稱顯示在「專案詳細數據」區塊

3) `update_daily_summary`
   - `date` (YYYY-MM-DD)、`summary` 必填
   - `projectName` 可選
   更新指定日報頁面的「今日彙總」區塊：
   - 用 `date + projectName` 定位頁面（與 `sync_daily_to_notion` 一致）
   - 直接覆寫該頁的「今日彙總」區塊；同專案重跑會覆寫

4) `generate_weekly_report`
   - `startDate`、`endDate` (YYYY-MM-DD)
   從 Daily DB 抓取區間日報摘要，依 `week.md` 生成週報並寫入 Weekly DB。

5) `get_daily_context`
   - `date` (YYYY-MM-DD) 必填
   取得指定日期的所有日報頁面資訊，包含：
   - 該日所有專案頁面清單
   - 每個專案的詳細數據(任務列表、KPI、今日彙總)
   - 總體統計(總點數、總工時、平均產能)

   **用途**: 查看當天所有專案的狀況，或在生成週報前檢視資料。

## 使用方式

### 模式選擇

| 模式 | 指令關鍵字 | 說明 |
|------|-----------|------|
| 快速模式 | `產值報告` | 只同步 KPI，不寫今日彙總 |
| 詳細模式 | `詳細產值` | 歸納內容給你確認，確認後再寫入 |

### 快速模式（預設）

**單專案**：
```
git <commit-range> <author> <date> 產值報告
```

**多專案**（每專案獨立頁面）：
```
git <commit-range> <author> <project-name> <date> 產值報告
```

執行流程：
1. `sync_daily_to_notion` - 同步 KPI 數據到 Notion
2. 完成（不寫入今日彙總）

### 詳細模式（推薦）

**單專案**：
```
git <commit-range> <author> <date> 詳細產值
```

**多專案**（每專案獨立頁面）：
```
git <commit-range> <author> <project-name> <date> 詳細產值
```

執行流程：
1. `analyze_commits` - 分析 commit 內容
2. **Claude 歸納「主要工作內容」給你確認**
3. 你確認 OK（或修改）後，Claude 再執行：
   - `sync_daily_to_notion` - 同步 KPI 到 Notion
   - `update_daily_summary` - 寫入你確認的今日彙總

**多專案說明**：
- 每個專案獨立一頁，不需要複雜的合併邏輯；同日同專案再次執行會覆寫該頁
- 使用 `get_daily_context` 可查看當天所有專案的狀況

### 手動更新今日彙總

如果你想自己寫內容，可以直接說：

```
更新 2025-12-08 今日彙總：
1. 手機註冊流程重構 - 分離社交/手機註冊
2. OTP 驗證優化 - 錯誤處理改進
```

Claude 會用 `update_daily_summary` 寫入你提供的內容。

## 典型指令示例

### 單專案模式

**快速產值報告（只要 KPI）**
```
git 09485d1..e42dd01 Louis Luo 2025-12-05 產值報告
```

**詳細產值報告（歸納後確認再寫入）**
```
git 09485d1..e42dd01 Louis Luo 2025-12-05 詳細產值
```

### 多專案模式（獨立頁面）

**在同一天為不同專案生成報告**

專案 1: eluelu-mono
```
git 3622b3b..3df6e1b Louis Luo eluelu-mono 2025-12-12 詳細產值
```
→ 創建頁面：`2025-12-12 eluelu-mono 日報`

專案 2: Web-hubble
```
git 139d102..f199103 Louis Luo Web-hubble 2025-12-12 詳細產值
```
→ 創建頁面：`2025-12-12 Web-hubble 日報`

**每個專案獨立一頁**，方便管理和查看。週報生成時會自動合併同一天的所有專案。

### 其他操作

**手動更新今日彙總（單專案模式）**
```
更新 2025-12-05 今日彙總：
1. 完成用戶認證模組
2. 修復登入頁面 bug
```

**手動更新今日彙總（指定專案頁面）**
```
更新 2025-12-05 eluelu-mono 專案今日彙總：
1. 完成用戶認證模組
2. 修復登入頁面 bug
```

**生成週報**
```
生成週報 2025-12-02 ~ 2025-12-08
```

**查看當天所有專案頁面**
```
查看 2025-12-12 日報上下文
```
這會顯示當天所有專案頁面的資料、彙總內容、總體統計。

### Token 使用對比

| 模式 | Token 消耗 | 說明 |
|------|-----------|------|
| 快速模式 | ~400-500 | 僅 KPI 統計 |
| 詳細模式 | ~1,500-2,500 | 含歸納 + 確認流程 |
| 手動更新 | ~200-300 | 直接寫入你的內容 |

## Claude 行為規範

> 給 AI Agent 的指引，確保正確執行流程。

### 模式判斷

| 關鍵字 | 動作 |
|--------|------|
| `產值報告` | 直接 `sync_daily_to_notion` |
| `詳細產值` | `analyze_commits` → 歸納 → **等用戶確認** → `sync` + `update` |
| `更新.*今日彙總` | 直接 `update_daily_summary` |

### 詳細模式重點

⚠️ **必須等用戶確認後才能寫入 Notion！**

```
1. analyze_commits → 分析
2. 歸納「主要工作內容」(3-5項) → 問「確認 OK 嗎？」
3. 用戶 OK 後 → sync_daily_to_notion + update_daily_summary
```

歸納格式：
```
主要工作內容：
1. [模組名稱] - [做了什麼]
2. ...
```

### 今日總結 / `update_daily_summary` 輸出規範

- 精華摘要放在 Notion 的「今日總結」欄位，**不要再新增頂層標題**，直接用 `###` 小標起頭。
- 建議固定結構（對應 `templates/daily.md` 精簡版）：
  - `### 報告`：列出完成事項，聚焦使用者價值/風險降低。
  - `### 變更分析`：依序列出 **功能 / 修復 / 重構 / 風險**（無則省略）。
  - `### 產能表現`：`M=[數值] (C [數值], H [數值], N [數值])`，加一句效率解讀與改善建議。
- 詳細模式流程：`sync_daily_to_notion` 先套用 `templates/daily.md` 全文 → `update_daily_summary` 僅填以上精華，避免重複標題。

## 說明

- KPI 計算遵循 `kpi.md`（無 Q，採 M = (N × C) ÷ H）。
- 工時 H 預設用 commit 時間推估（首尾各 +0.5h，間隔>4h 不計）；可用 `manualHours` 覆寫。
- Notion 若未設定 token/DB，工具仍會回傳 Markdown，方便手動貼上。
