## AI 回應規範
- 除非使用者明確要求其他語言,AI 預設以繁體中文回覆。
- 技術術語若中文不常使用,可於中文說明後附上英文字母或程式關鍵字。
- 需維持現有語氣與格式規範,僅將敘述語言調整為中文。

---

## 🏗️ Monorepo 專案結構

本專案為 monorepo 架構，各子專案有獨立的開發規範。

### ⚠️ 重要：處理子專案檔案前，必須先讀取該專案的 AGENTS.md

在修改或創建子專案中的檔案時，**務必先使用 Read 工具讀取該專案的 agents/AGENTS.md**，以了解專案特定的規範。

### 📦 子專案規範位置

- **Storybook 專案**: `apps/shirux-storybook/agents/AGENTS.md`
- **其他子專案**: 位於各專案的 `agents/` 目錄下

### 🔍 判斷方式

根據檔案路徑判斷所屬專案：
- `apps/shirux-storybook/**` → 讀取 `apps/shirux-storybook/agents/AGENTS.md`
- `packages/rux-ui/**` → 可能有獨立規範，請先檢查是否存在對應的 agents/AGENTS.md

---

## 📚 共用規範文件

以下為跨專案共用的規範：

### React 相關
- [React Component 規範](./agents/react/component.md)

### Next.js 相關
- [Next.js Component 規範](./agents/nextjs/component.md)
- [Next.js Folder Structure](./agents/nextjs/folder-structure.md)
