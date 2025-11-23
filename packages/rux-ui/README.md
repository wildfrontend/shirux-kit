# @shirux/rux-ui

基於 Radix UI 原件打造，使用 Tailwind CSS 樣式的現代化、無障礙 UI 元件庫。

## 設計理念

這個元件庫遵循 **shadcn/ui** 的設計模式，並保持最小化的客製化：

- **容易複製貼上**：元件設計上可輕鬆複製到其他專案並進行客製化
- **最小化自訂 props**：保持 API 簡潔，遵循標準開發模式
- **以樣式為主的客製化**：其他專案只需修改 CSS/Tailwind classes 就能重複使用這些元件
- **無障礙優先**：基於 Radix UI 原件，提供完善的無障礙支援
- **型別安全**：開箱即用的完整 TypeScript 支援

## 安裝

此套件設計用於 monorepo workspace 環境：

```json
{
  "dependencies": {
    "@shirux/rux-ui": "workspace:*"
  }
}
```

## 使用方式

### 基本引入

```tsx
import { Button } from '@shirux/rux-ui/components/button'
import { Input } from '@shirux/rux-ui/components/input'
import { Card } from '@shirux/rux-ui/components/card'
```

### 引入樣式

在你的應用程式中引入全域樣式：

```tsx
import '@shirux/rux-ui/globals.css'
```

### 範例

```tsx
import { Button } from '@shirux/rux-ui/components/button'

export default function App() {
  return (
    <Button variant="default" size="md">
      點我
    </Button>
  )
}
```

## 客製化

### 客製化主題色彩

此元件庫使用 Tailwind CSS 變數系統，透過 OKLCH 色彩空間定義主題色彩。

#### 修改顏色變數

在你的專案中覆寫 CSS 變數即可改變主題色：

```css
/* 在你的 globals.css 或應用程式的 CSS 檔案中 */
:root {
  --primary: oklch(0.3542 0.105 251.99);
  --secondary: oklch(0.9608 0.0054 95.1);
  --accent: oklch(0.6835 0.137 31.37);
}
```

#### 推薦工具

使用 [OKLCH Color Picker](https://oklch.com/) 來調整色彩：
- HEX/RGB 轉換到 OKLCH
- 視覺化調整色彩
- 無障礙對比度檢查

### 擴充元件

```tsx
import { Button } from '@shirux/rux-ui/components/button'
import { cn } from '@shirux/rux-ui/lib/utils'

export function CustomButton({ className, ...props }) {
  return (
    <Button
      className={cn('你的自訂-classes', className)}
      {...props}
    />
  )
}
```

## 開發

```bash
# 檢查元件程式碼
pnpm --filter @shirux/rux-ui lint

# 自動修復程式碼問題
pnpm --filter @shirux/rux-ui lint:fix
```

### Claude Code MCP 設定

建議開發者使用 Claude Code 進行開發時，可以設定 shadcn MCP 來提升開發體驗。

請參考 [shadcn/ui Claude Code MCP 設定指南](https://ui.shadcn.com/docs/claude-code-mcp) 進行初始化。

## 技術棧

- **React 19** - UI 函式庫
- **Radix UI** - 無樣式、無障礙的元件原件
- **Tailwind CSS 4** - Utility-first CSS 框架
- **TypeScript** - 型別安全
- **class-variance-authority** - 元件變體管理
- **clsx** + **tailwind-merge** - 條件式 class 處理

## 設計理念說明

### 為什麼要最小化 Props？

我們刻意保持自訂 props 最小化，因為：

1. **更容易理解** - 更少的 API 要學習
2. **更靈活** - 使用者可以用 className 擴充，不用等新 props
3. **更適合複製** - 元件不依賴自訂邏輯，可直接在其他專案使用
4. **標準模式** - 遵循 React 和 Radix UI 的慣例

### 為什麼要容易複製貼上？

遵循 shadcn/ui 的理念：

- 元件是**原始碼**，不是黑盒子 npm 套件
- 你**擁有程式碼** - 可隨需求修改
- **不被版本綁死** - 需要什麼就複製什麼
- **完全掌控** - 不用與套件庫對抗就能改任何東西

## 授權

MIT
