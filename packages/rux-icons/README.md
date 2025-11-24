# @shirux/rux-icons

SVG 圖示轉換為 React 元件，提供 Rux 專案使用的圖示庫。

## 特色

- 🎨 **雙色支援** - 支援主要和次要顏色的動態配色
- 🌳 **Tree-shaking** - 只打包使用到的圖示
- 📦 **多種風格** - fill、outline、two-tone、logo 四種風格
- 🔄 **自動生成** - 從 SVG 檔案自動生成 React 元件
- 🎯 **TypeScript** - 完整的型別支援
- 🚀 **Lucide Icons** - 整合 lucide-react 圖示庫

## 安裝

此套件設計用於 monorepo workspace 環境：

```json
{
  "dependencies": {
    "@shirux/rux-icons": "workspace:*"
  }
}
```

## 使用方式

### 基本引入

```tsx
import { IconHome, IconUser } from '@shirux/rux-icons/fill'
import { IconMessageOutline } from '@shirux/rux-icons/outline'
import { IconSupportTwoTone } from '@shirux/rux-icons/two-tone'
import { RuxLogo } from '@shirux/rux-icons/logo'
```

### 使用雙色圖示

```tsx
import { IconSupportTwoTone } from '@shirux/rux-icons/two-tone'

// 使用預設顏色
<IconSupportTwoTone />

// 自訂主要顏色
<IconSupportTwoTone primaryColor="#3b82f6" />

// 自訂主要和次要顏色
<IconSupportTwoTone
  primaryColor="#3b82f6"
  secondaryColor="#93c5fd"
/>

// 使用 Tailwind CSS 變數
<IconSupportTwoTone
  primaryColor="var(--color-primary-500)"
  secondaryColor="var(--color-primary-200)"
/>

// 或使用自訂 CSS 變數
<IconSupportTwoTone
  primaryColor="var(--brand-primary)"
  secondaryColor="var(--brand-secondary)"
/>
```

### 使用 Lucide Icons

```tsx
import { Heart, Star, Settings } from '@shirux/rux-icons/lucide'

<Heart className="w-6 h-6" />
<Star className="w-6 h-6" />
<Settings className="w-6 h-6" />
```

## Assets 目錄結構

```
assets/
├── fill/          # 實心填充風格圖示
│   ├── icon_home.svg
│   ├── icon_user.svg
│   └── ...
├── outline/       # 線條輪廓風格圖示
│   ├── icon_message.svg
│   └── ...
├── two-tone/      # 雙色調風格圖示（支援雙色配置）
│   ├── icon_support.svg
│   └── ...
└── logo/          # Logo 圖示（固定顏色）
    ├── icon_elu_logo.svg
    └── ...
```

### 圖示分類說明

- **fill/** - 實心填充圖示，適合強調重點功能
- **outline/** - 線條輪廓圖示，適合次要功能或資訊展示
- **two-tone/** - 雙色調圖示，可動態設定主色和次色，適合需要視覺層次的場景
- **logo/** - Logo 圖示，保留原始顏色，不支援顏色變更

## 新增或更新圖示

### 1. 新增 SVG 檔案

將 SVG 檔案放入對應的 assets 子目錄：

```bash
# 新增實心圖示
assets/fill/icon_new_feature.svg

# 新增輪廓圖示
assets/outline/icon_new_feature.svg

# 新增雙色圖示（需要特殊標記）
assets/two-tone/icon_new_feature.svg
```

### 2. 雙色圖示標記

如果要建立支援雙色的圖示，需在 SVG 中使用 `data-color` 屬性：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <!-- 主要顏色部分 -->
  <path data-color="primary" d="M..." fill="#000000" />

  <!-- 次要顏色部分 -->
  <path data-color="secondary" d="M..." fill="#666666" />
</svg>
```

- `data-color="primary"` - 標記為主要顏色元素
- `data-color="secondary"` - 標記為次要顏色元素（若未設定 secondaryColor，會自動使用 primaryColor）

### 3. 命名規範

- **檔案名稱**：使用 `icon_` 前綴 + 功能描述 + `.svg`
  - ✅ `icon_home.svg`
  - ✅ `icon_user_profile.svg`
  - ✅ `icon_send_message.svg`
  - ❌ `home.svg`
  - ❌ `Icon_Home.svg`

- **Logo 檔案**：logo 目錄下的檔案會自動移除 `Icon` 前綴
  - `icon_elu_logo.svg` → 元件名稱：`RuxLogo`
  - `icon_company_name.svg` → 元件名稱：`CompanyName`

### 4. 生成 React 元件

```bash
# 清理並重新生成所有圖示元件
pnpm --filter @shirux/rux-icons generate

# 生成索引檔案
pnpm --filter @shirux/rux-icons generate-index

# 或直接執行 build（會自動執行上述兩個步驟）
pnpm --filter @shirux/rux-icons build
```

### 5. 生成流程說明

執行 `pnpm build` 時會自動執行以下步驟：

1. **清理舊檔案** (`pregenerate`) - 刪除 `src/` 目錄
2. **轉換 SVG** (`generate`) - 使用 SVGR 將 SVG 轉換為 React 元件
3. **處理雙色** (`postgenerate`) - 處理 `data-color` 屬性，生成雙色 props
4. **生成索引** (`generate-index`) - 自動生成各子目錄的 `index.ts`

### 6. 驗證生成結果

```bash
# 檢查生成的元件
ls src/fill/
ls src/outline/
ls src/two-tone/
ls src/logo/

# 在應用中測試
import { IconNewFeature } from '@shirux/rux-icons/fill'
```

## 元件命名規則

從檔案名稱轉換為元件名稱的規則：

| 風格 | 檔案名稱 | 元件名稱 |
|------|----------|----------|
| fill | `icon_home.svg` | `IconHome` |
| fill | `icon_user_profile.svg` | `IconUserProfile` |
| outline | `icon_message.svg` | `IconMessageOutline` |
| two-tone | `icon_support.svg` | `IconSupportTwoTone` |
| logo | `icon_elu_logo.svg` | `RuxLogo` (移除 Icon 前綴) |

## 開發

```bash
# 檢查程式碼
pnpm --filter @shirux/rux-icons lint

# 重新生成圖示
pnpm --filter @shirux/rux-icons build

# 監聽模式（自動重新生成）
pnpm --filter @shirux/rux-icons dev
```

## 技術棧

- **SVGR** - SVG 轉 React 元件
- **React** - UI 函式庫
- **TypeScript** - 型別安全
- **lucide-react** - 開源圖示庫整合
- **Node.js Scripts** - 自動化處理腳本

## 進階：自訂處理腳本

### post-process-dual-color.js

處理雙色圖示的腳本：

- 偵測 `data-color` 屬性
- 轉換為動態的 `primaryColor` 和 `secondaryColor` props
- Logo 圖示自動移除雙色支援（保留原始顏色）

### generate-index.js

生成索引檔案的腳本：

- 自動掃描各子目錄的 `.tsx` 檔案
- 根據檔案名稱和目錄生成正確的元件名稱
- 產生 barrel export 檔案

## 授權

MIT
