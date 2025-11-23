# 資料夾結構規則 (Folder Structure Rules)

## 核心原則: 同層級結構一致性

**規則:** 當同一層級的任何一個元件需要拆分成多個子元件時,**必須將該層級的所有元件都改成 folder 結構**,即使其他元件暫時不需要拆分。

## 為什麼需要這個規則?

1. **結構一致性** - 保持專案結構的可預測性和一致性
2. **易於維護** - 避免混合單檔案和資料夾結構造成的混亂
3. **便於擴展** - 未來任何元件需要拆分時,不需要重構整個層級
4. **統一 Import** - 所有 import 路徑模式保持一致

## 實際範例

### ❌ 錯誤做法 - 結構不一致

```
layouts/
├── header/              # 資料夾結構
│   ├── index.tsx
│   ├── search-input.tsx
│   └── user-menu.tsx
├── footer.tsx           # 單檔案
└── sidebar.tsx          # 單檔案
```

**問題:**
- Import 路徑不一致
- 結構混亂,難以預測
- 未來 footer 或 sidebar 需要拆分時,需要重構

### ✅ 正確做法 - 結構一致

```
layouts/
├── header/
│   ├── index.tsx
│   ├── search-input.tsx
│   └── user-menu.tsx
├── footer/
│   └── index.tsx
└── sidebar/
    └── index.tsx
```

**優點:**
- 所有 import 路徑一致
- 結構清晰,容易理解
- 任何元件都可以隨時擴展

## Import 路徑

使用 folder 結構後,所有的 import 都保持一致:

```tsx
// ✅ 一致的 import 模式
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import { Sidebar } from '@/components/layouts/sidebar';

// ❌ 避免混合模式
import { Header } from '@/components/layouts/header';  // 從 folder
import { Footer } from '@/components/layouts/footer';  // 從單檔案
```

## 重構步驟

當需要將某個層級從單檔案改為 folder 結構時:

### 1. 創建資料夾結構

```bash
# 為每個元件創建資料夾
mkdir -p layouts/header layouts/footer layouts/sidebar
```

### 2. 移動檔案到 index.tsx

```bash
# 將單檔案內容移到對應的 index.tsx
cp layouts/header.tsx layouts/header/index.tsx
cp layouts/footer.tsx layouts/footer/index.tsx
cp layouts/sidebar.tsx layouts/sidebar/index.tsx
```

### 3. 刪除舊的單檔案

```bash
# 刪除原本的單檔案
rm layouts/header.tsx layouts/footer.tsx layouts/sidebar.tsx
```

### 4. 驗證結構

```bash
# 確認新的結構
ls -la layouts/

# 應該看到:
# layouts/
# ├── header/
# │   └── index.tsx
# ├── footer/
# │   └── index.tsx
# └── sidebar/
#     └── index.tsx
```

## 何時應用此規則?

### ✅ 應該應用

- **components/** 目錄下的所有子目錄
- **layouts/** 目錄
- **features/** 模組
- 任何包含可複用元件的目錄

### ⚠️ 可以例外

- **utils/** - 工具函數通常是單檔案
- **hooks/** - 自定義 hooks 可以是單檔案
- **types/** - 類型定義檔案
- **constants/** - 常數定義

## 實際案例: layouts/ 重構

### 重構前

```
layouts/
├── header.tsx           # 300+ 行
├── footer.tsx           # 100 行
└── sidebar.tsx          # 80 行
```

### 觸發點

Header 需要拆分出 search-input 和 user-menu 子元件

### 重構後

```
layouts/
├── header/
│   ├── index.tsx        # 主要 Header 元件
│   ├── search-input.tsx # 搜尋輸入框元件
│   └── user-menu.tsx    # 使用者選單元件
├── footer/
│   └── index.tsx        # Footer 元件(暫時單檔案,但用 folder 結構)
└── sidebar/
    └── index.tsx        # Sidebar 元件(暫時單檔案,但用 folder 結構)
```

### 好處

1. **Header 成功拆分** - 程式碼更易維護
2. **Footer/Sidebar 保持彈性** - 未來需要拆分時不需要改結構
3. **Import 路徑統一** - 所有 import 都是 `from '@/layouts/xxx'`
4. **團隊協作友善** - 新成員容易理解結構規則

### ⚙️ Main Entry Path Rule

**目的：**  
保持 import 路徑簡潔、一致，並在「已有其他分類資料夾（如 `desktop/`, `mobile/`）但仍有無法立即分類的共用元件」時，使用 `main/` 作為暫存整理節點。若僅有單一主元件且尚未拆分，可直接維持 `index.tsx`。

#### 📁 結構範例

```
components/
  header/
    desktop/
      menu.tsx
    mobile/
      menu.tsx
    main/
      index.tsx        # 主輸出元件
      search-input.tsx # 尚未歸入特定分類的子元件
    index.ts           # 若未滿足建立 main 的條件，可直接導出本層內容
  button/
    main/
      index.tsx        # button 尚未拆出更多分類，但為保持一致使用 main
```

#### ⚙️ tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": [
        "src/components/*/main/index.tsx",
        "src/components/*/index.ts",
        "src/components/*"
      ]
    }
  }
}
```

## 總結

> **核心思想:** 當同層級的任何元件需要 folder 結構時,整個層級都應該統一使用 folder 結構。

這個規則確保:
- ✅ 結構一致性
- ✅ 易於維護
- ✅ 便於擴展
- ✅ 團隊協作友善
