
> 本文件定義 Next.js 專案的元件撰寫規範。
> 適用範圍：使用 Next.js 框架的專案

---

## 🔷 Next.js Component 規範

### ⚠️ 重要：使用 RC / RCC（同步）或 SRC / SRCC（async）搭配箭頭函式

所有 Next.js 元件都必須採用 **常數 + 箭頭函式** 的寫法。
- **同步元件**：使用 `RC` / `RCC`
- **Async（Server Component/SSR）元件**：使用 `SRC` / `SRCC`
- **Page props**：使用 `PageProps<Params, SearchParams>`（`@shirux/types/nextjs`），`params`、`searchParams` 皆為 `Promise<...>`，需要 `await`。

**Export 規範：**
- **Router components**：使用語意化名稱 + `export default`
  - `page.tsx` → `Page`（通用）或根據路徑語意命名
  - `layout.tsx` → `Layout` 或 `RootLayout`（根目錄）
  - `not-found.tsx` → `NotFoundPage`
  - `error.tsx` → `ErrorPage`
  - `loading.tsx` → `LoadingPage`
- **一般 components（可重用元件）**：使用描述性名稱 + `export const`

```typescript
// ✅ Page Component (page.tsx)：統一使用 Page，方便複製貼上
const Page: RC = () => <div>Home Page</div>;
export default Page;

// ✅ Root Layout (app/layout.tsx)：使用 RootLayout
const RootLayout: RCC = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

// ✅ Nested Layout (app/(dashboard)/layout.tsx)：使用 Layout
const Layout: RCC = ({ children }) => {
  return <div className="dashboard-layout">{children}</div>;
};

export default Layout;

// ✅ Not Found (not-found.tsx)
const NotFoundPage: RC = () => {
  return <div>404 - Page Not Found</div>;
};

export default NotFoundPage;

// ✅ 一般 Component：使用描述性名稱 + export const
'use client';

import { useState } from 'react';

export const InteractiveButton: RC = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

### Next.js 特定情境

```typescript
// ✅ 帶 params 的 Page Component（async，用 PageProps）
import { PageProps } from '@shirux/types/nextjs';

const Page: SRC<PageProps> = async ({ params }) => {
  const { id } = await params;
  return <div>Product {id}</div>;
};

export default Page;

// ✅ Async Server Component：使用 SRC/SRCC
import { PageProps } from '@shirux/types/nextjs';

type Props = PageProps<{ slug: string }>;

const Page: SRC<Props> = async ({ params }) => {
  const { slug } = await params;
  const post = await fetchPost(slug);
  return <article>{post.content}</article>;
};

export default Page;

// ✅ 搭配 metadata export
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
};

const Page: RC = () => <div>Content</div>;

export default Page;
```

### 原因說明

1. **統一型別來源** - `RC` / `RCC` / `SRC` / `SRCC` 以及 `PageProps` 由 `@shirux/types` 全域提供，避免重複 import
2. **保留 async 支援** - async 元件使用 `SRC` / `SRCC`，符合 Server Component 需求
3. **更好的除錯** - 常數命名仍會顯示在 stack trace 中
4. **export 分離** - 將 export 寫在下方，程式碼結構更清晰
