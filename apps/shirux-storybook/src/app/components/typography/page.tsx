import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

const TypographyDemo: RC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      {/* Header */}
      <div>
        <Typography className="mb-2" variant="h1">
          Typography
        </Typography>
        <Typography color="muted" variant="p">
          優雅且一致的文字排版系統，支援多種變體和顏色配置。
        </Typography>
      </div>

      {/* Props Table */}
      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">Props</Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Prop</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Default</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "inlineCode"
                  | "lead" | "large" | "small" | "muted" | "xl" | "lg" | "md" |
                  "sm" | "xs"
                </td>
                <td className="px-4 py-2 font-mono">"p"</td>
                <td className="px-4 py-2">文字的樣式變體</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">color</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "default" | "primary" | "secondary" | "accent" | "muted" |
                  "success" | "error" | "warning"
                </td>
                <td className="px-4 py-2 font-mono">"primary"</td>
                <td className="px-4 py-2">文字顏色主題</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">as</td>
                <td className="px-4 py-2 font-mono text-xs">
                  keyof JSX.IntrinsicElements
                </td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">
                  自訂渲染的 HTML 元素，適用於 SEO 優化
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">asChild</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">false</td>
                <td className="px-4 py-2">
                  將樣式套用到子元素（使用 Radix Slot）
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">foreground</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">false</td>
                <td className="px-4 py-2">啟用前景色樣式，適用於深色背景</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">
                  自訂 CSS 類別（可完全覆蓋預設樣式）
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用範例</Typography>
        <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
          <code>{`import { Typography } from "@shirux/rux-ui/components/typography"

// 基本用法
<Typography variant="h1">主標題</Typography>
<Typography variant="p">這是一段文字</Typography>

// 標題系列
<Typography variant="h1">H1 標題</Typography>
<Typography variant="h2">H2 標題</Typography>
<Typography variant="h3">H3 標題</Typography>
<Typography variant="h4">H4 標題</Typography>

// 內容樣式
<Typography variant="p">段落文字</Typography>
<Typography variant="lead">引導文字（較大且淡色）</Typography>
<Typography variant="blockquote">引用區塊</Typography>
<Typography variant="inlineCode" as="code">行內程式碼</Typography>

// 尺寸變體
<Typography variant="large">大號文字</Typography>
<Typography variant="small">小號文字</Typography>
<Typography variant="muted">次要文字</Typography>

// 流體字體大小（會根據視窗寬度自動調整）
<Typography variant="xl">Extra Large (28px → 36px)</Typography>
<Typography variant="lg">Large (20px → 24px)</Typography>
<Typography variant="md">Medium (16px → 18px)</Typography>
<Typography variant="sm">Small (14px → 16px)</Typography>
<Typography variant="xs">Extra Small (12px → 14px)</Typography>

// 顏色變化
<Typography variant="lg" color="primary">Primary 顏色</Typography>
<Typography variant="lg" color="secondary">Secondary 顏色</Typography>
<Typography variant="lg" color="accent">Accent 顏色</Typography>
<Typography variant="lg" color="success">成功訊息</Typography>
<Typography variant="lg" color="error">錯誤訊息</Typography>
<Typography variant="lg" color="warning">警告訊息</Typography>

// SEO 彈性 - 視覺樣式 vs HTML 語意
<Typography variant="h1" as="h2">
  看起來像 h1，但語意是 h2
</Typography>

// 自訂樣式（className 會覆蓋預設樣式）
<Typography variant="h3" className="text-5xl font-light">
  覆蓋預設樣式
</Typography>
<Typography variant="lg" className="text-blue-600">
  自訂顏色
</Typography>`}</code>
        </pre>
      </div>

      <div className="space-y-12">
        {/* H1 */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">H1 - 主標題</Typography>
            <Typography variant="muted">
              使用 variant="h1"，預設渲染為 h1 標籤。未指定 variant
              時，預設渲染為 div 標籤
            </Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="h1">
              Taxing Laughter: The Joke Tax Chronicles
            </Typography>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`<Typography variant="h1">主標題</Typography>

// SEO 需求：視覺是 h1，但語意是 h2
<Typography variant="h1" as="h2">主標題</Typography>`}</code>
          </pre>
        </section>

        {/* H2 */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">H2 - 次標題</Typography>
            <Typography variant="muted">帶有底部邊框的次標題樣式</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="h2">The People of the Kingdom</Typography>
          </div>
        </section>

        {/* H3 */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">H3 - 三級標題</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="h3">The Joke Tax</Typography>
          </div>
        </section>

        {/* H4 */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">H4 - 四級標題</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="h4">People stopped telling jokes</Typography>
          </div>
        </section>

        {/* Paragraph */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">P - 段落</Typography>
            <Typography variant="muted">標準段落文字，自動處理間距</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="p">
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax.
            </Typography>
          </div>
        </section>

        {/* Blockquote */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">Blockquote - 引用</Typography>
            <Typography variant="muted">帶有左側邊框的引用區塊</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="blockquote">
              "After all," he said, "everyone enjoys a good joke, so it's only
              fair that they should pay for the privilege."
            </Typography>
          </div>
        </section>

        {/* Inline Code */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">Inline Code - 行內程式碼</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="p">
              Install the package with{' '}
              <Typography as="code" variant="inlineCode">
                npm install @shirux/rux-ui
              </Typography>{' '}
              command.
            </Typography>
          </div>
        </section>

        {/* Lead */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">Lead - 引導文字</Typography>
            <Typography variant="muted">
              較大且淡色的文字，適合作為引導說明
            </Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="lead">
              A modal dialog that interrupts the user with important content and
              expects a response.
            </Typography>
          </div>
        </section>

        {/* Large */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">Large - 大號文字</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="large">Are you absolutely sure?</Typography>
          </div>
        </section>

        {/* Small */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">Small - 小號文字</Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="small">Email address</Typography>
          </div>
        </section>

        {/* Muted */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">Muted - 次要文字</Typography>
            <Typography variant="muted">
              使用 muted-foreground 顏色的次要文字
            </Typography>
          </div>
          <div className="bg-muted/30 rounded-lg border p-6">
            <Typography variant="muted">Enter your email address.</Typography>
          </div>
        </section>

        {/* Mixed Example */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">組合範例</Typography>
            <Typography variant="muted">
              展示如何組合不同的 Typography 變體
            </Typography>
          </div>
          <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
            <Typography variant="h3">Introduction</Typography>
            <Typography variant="lead">
              This is a lead paragraph that introduces the content below.
            </Typography>
            <Typography variant="p">
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax. The kingdom was
              filled with laughter once more.
            </Typography>
            <Typography variant="blockquote">
              "Laughter is the best medicine, and it should always be free."
            </Typography>
            <Typography variant="muted">- A wise person, probably</Typography>
          </div>
        </section>

        {/* Fluid Typography */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">流體字體大小</Typography>
            <Typography variant="muted">
              使用 clamp()
              實現的流體字體大小，會根據視窗寬度自動調整。適合沒有格式要求的情況
            </Typography>
          </div>

          {/* 說明區塊 */}
          <div className="border-primary bg-primary/5 rounded-r-lg border-l-4 p-4">
            <Typography className="mb-2 font-semibold" variant="small">
              字體放大範圍說明
            </Typography>
            <div className="space-y-1.5">
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <Typography className="font-medium" variant="sm">
                  XL:
                </Typography>
                <Typography color="muted" variant="sm">
                  28px → 36px（放大 28.6%，增加 8px）
                </Typography>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <Typography className="font-medium" variant="sm">
                  LG:
                </Typography>
                <Typography color="muted" variant="sm">
                  20px → 24px（放大 20%，增加 4px）
                </Typography>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <Typography className="font-medium" variant="sm">
                  MD:
                </Typography>
                <Typography color="muted" variant="sm">
                  16px → 18px（放大 12.5%，增加 2px）
                </Typography>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <Typography className="font-medium" variant="sm">
                  SM:
                </Typography>
                <Typography color="muted" variant="sm">
                  14px → 16px（放大 14.3%，增加 2px）
                </Typography>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-2">
                <Typography className="font-medium" variant="sm">
                  XS:
                </Typography>
                <Typography color="muted" variant="sm">
                  12px → 14px（放大 16.7%，增加 2px）
                </Typography>
              </div>
            </div>
            <Typography className="mt-3" color="muted" variant="xs">
              💡 提示：調整瀏覽器視窗大小以觀察字體的流體變化效果
            </Typography>
          </div>

          <div className="bg-muted/30 space-y-6 rounded-lg border p-6">
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                XL (28px → 36px)
              </Typography>
              <Typography variant="xl">Extra Large - 流體字體</Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                LG (20px → 24px)
              </Typography>
              <Typography variant="lg">Large - 流體字體</Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                MD (16px → 18px)
              </Typography>
              <Typography variant="md">Medium - 流體字體</Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                SM (14px → 16px)
              </Typography>
              <Typography variant="sm">Small - 流體字體</Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                XS (12px → 14px)
              </Typography>
              <Typography variant="xs">Extra Small - 流體字體</Typography>
            </div>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`<Typography variant="xl">Extra Large</Typography>
<Typography variant="lg">Large</Typography>
<Typography variant="md">Medium</Typography>
<Typography variant="sm">Small</Typography>
<Typography variant="xs">Extra Small</Typography>

// 流體字體大小範圍：
// xl: clamp(28px, 1.2vw + 18px, 36px)
// lg: clamp(20px, 0.8vw + 14px, 24px)
// md: clamp(16px, 0.5vw + 12px, 18px)
// sm: clamp(14px, 0.4vw + 11px, 16px)
// xs: clamp(12px, 0.3vw + 10px, 14px)`}</code>
          </pre>
        </section>

        {/* Color Variants */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">文字顏色</Typography>
            <Typography variant="muted">
              Typography 支援多種顏色選項，適用於不同的使用場景
            </Typography>
          </div>
          <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Default
              </Typography>
              <Typography variant="lg">這是預設顏色的文字</Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Primary
              </Typography>
              <Typography color="primary" variant="lg">
                這是 Primary 顏色的文字
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Secondary
              </Typography>
              <Typography color="secondary" variant="lg">
                這是 Secondary 顏色的文字
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Accent
              </Typography>
              <Typography color="accent" variant="lg">
                這是 Accent 顏色的文字
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Muted
              </Typography>
              <Typography color="muted" variant="lg">
                這是 Muted 顏色的文字
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Success
              </Typography>
              <Typography color="success" variant="lg">
                ✓ 操作成功完成
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Error
              </Typography>
              <Typography color="error" variant="lg">
                ✗ 發生錯誤，請重試
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                Warning
              </Typography>
              <Typography color="warning" variant="lg">
                ⚠ 請注意此警告訊息
              </Typography>
            </div>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`<Typography variant="lg">預設顏色</Typography>
<Typography variant="lg" color="primary">Primary 顏色</Typography>
<Typography variant="lg" color="secondary">Secondary 顏色</Typography>
<Typography variant="lg" color="accent">Accent 顏色</Typography>
<Typography variant="lg" color="muted">Muted 顏色</Typography>
<Typography variant="lg" color="success">成功訊息</Typography>
<Typography variant="lg" color="error">錯誤訊息</Typography>
<Typography variant="lg" color="warning">警告訊息</Typography>`}</code>
          </pre>
        </section>

        {/* Custom Styling */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">客製化樣式</Typography>
            <Typography variant="muted">
              透過 className 可以完全自訂樣式，展示 Typography 的靈活性
            </Typography>
          </div>
          <div className="border-primary bg-primary/5 mb-4 rounded-r-lg border-l-4 p-4">
            <Typography className="mb-2 font-semibold" variant="small">
              💡 樣式覆蓋機制
            </Typography>
            <div className="space-y-1">
              <Typography color="muted" variant="sm">
                Typography 使用{' '}
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                  cn()
                </code>{' '}
                函數處理 className，你傳入的 className 會被放在最後面，因此：
              </Typography>
              <ul className="ml-2 list-inside list-disc space-y-1">
                <li>
                  <Typography color="muted" variant="sm">
                    <strong className="text-foreground">
                      可以完全覆蓋預設樣式
                    </strong>{' '}
                    - 不需要擔心 CSS 權重問題
                  </Typography>
                </li>
                <li>
                  <Typography color="muted" variant="sm">
                    <strong className="text-foreground">同屬性後者優先</strong>{' '}
                    - 如{' '}
                    <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                      text-xl text-sm
                    </code>{' '}
                    最終會是{' '}
                    <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                      text-sm
                    </code>
                  </Typography>
                </li>
                <li>
                  <Typography color="muted" variant="sm">
                    <strong className="text-foreground">不同屬性會合併</strong>{' '}
                    - 預設的 font-weight 和你自訂的 text-color 可以共存
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-muted/30 space-y-6 rounded-lg border p-6">
            {/* 覆蓋預設樣式 */}
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                覆蓋預設樣式（證明 className 權重更高）
              </Typography>
              <div className="space-y-3">
                <div>
                  <Typography
                    className="text-muted-foreground mb-1"
                    variant="xs"
                  >
                    H3 預設是 text-2xl font-semibold
                  </Typography>
                  <Typography variant="h3">預設的 H3 標題</Typography>
                </div>
                <div>
                  <Typography
                    className="text-muted-foreground mb-1"
                    variant="xs"
                  >
                    用 className 覆蓋成 text-5xl font-light
                  </Typography>
                  <Typography className="text-5xl font-light" variant="h3">
                    覆蓋後的 H3 標題
                  </Typography>
                </div>
                <div>
                  <Typography
                    className="text-muted-foreground mb-1"
                    variant="xs"
                  >
                    Lead 預設是 text-xl text-accent
                  </Typography>
                  <Typography variant="lead">預設的 Lead 文字</Typography>
                </div>
                <div>
                  <Typography
                    className="text-muted-foreground mb-1"
                    variant="xs"
                  >
                    用 className 覆蓋成 text-sm text-destructive
                  </Typography>
                  <Typography
                    className="text-destructive text-sm"
                    variant="lead"
                  >
                    覆蓋後的 Lead 文字（變小且變紅）
                  </Typography>
                </div>
              </div>
            </div>

            {/* 自訂字體大小 */}
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                自訂字體大小
              </Typography>
              <Typography className="text-5xl" variant="h3">
                超大標題 (text-5xl)
              </Typography>
              <Typography className="text-xs" variant="p">
                超小段落 (text-xs)
              </Typography>
            </div>

            {/* 自訂字重 */}
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                自訂字重
              </Typography>
              <Typography className="font-light" variant="lg">
                輕字重 (font-light)
              </Typography>
              <Typography className="font-bold" variant="lg">
                粗字重 (font-bold)
              </Typography>
              <Typography className="font-black" variant="lg">
                特粗字重 (font-black)
              </Typography>
            </div>

            {/* 自訂顏色 */}
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                自訂顏色（透過 className）
              </Typography>
              <Typography
                className="text-blue-600 dark:text-blue-400"
                variant="lg"
              >
                藍色文字
              </Typography>
              <Typography
                className="text-purple-600 dark:text-purple-400"
                variant="lg"
              >
                紫色文字
              </Typography>
              <Typography
                className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-bold text-transparent"
                variant="lg"
              >
                漸層文字效果
              </Typography>
            </div>

            {/* 自訂樣式組合 */}
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                樣式組合
              </Typography>
              <Typography
                className="border-accent text-accent border-l-4 pl-4 italic"
                variant="h2"
              >
                帶左側邊框的斜體標題
              </Typography>
              <Typography
                className="bg-accent/10 border-accent/20 rounded-lg border p-4"
                variant="p"
              >
                帶背景色和邊框的段落文字
              </Typography>
            </div>

            {/* 覆蓋預設顏色 */}
            <div className="space-y-2">
              <Typography className="text-muted-foreground" variant="xs">
                覆蓋 color prop
              </Typography>
              <Typography color="primary" variant="lead">
                Lead 使用 Primary 顏色
              </Typography>
              <Typography color="error" variant="lead">
                Lead 使用 Error 顏色
              </Typography>
              <Typography
                className="text-pink-600 dark:text-pink-400"
                variant="lead"
              >
                Lead 使用 className 自訂顏色
              </Typography>
            </div>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`// ✅ 覆蓋預設樣式 - className 權重更高
<Typography variant="h3">
  預設的 H3 (text-2xl font-semibold)
</Typography>

<Typography variant="h3" className="text-5xl font-light">
  覆蓋後的 H3 (text-5xl font-light)
</Typography>

// ✅ 覆蓋預設顏色
<Typography variant="lead">
  預設的 Lead (text-xl text-accent)
</Typography>

<Typography variant="lead" className="text-sm text-destructive">
  覆蓋後的 Lead (text-sm text-destructive)
</Typography>

// 自訂顏色
<Typography variant="lg" className="text-blue-600 dark:text-blue-400">
  藍色文字
</Typography>

// 漸層文字
<Typography
  variant="lg"
  className="bg-gradient-to-r from-pink-500 to-violet-500
             bg-clip-text text-transparent font-bold"
>
  漸層文字效果
</Typography>

// 樣式組合
<Typography
  variant="h2"
  className="border-l-4 border-accent pl-4 italic text-accent"
>
  帶左側邊框的斜體標題
</Typography>

// color prop vs className
<Typography variant="lead" color="primary">
  使用 color prop
</Typography>
<Typography variant="lead" className="text-pink-600">
  使用 className（可覆蓋 color prop）
</Typography>`}</code>
          </pre>
        </section>

        {/* SEO Example */}
        <section className="space-y-4">
          <div>
            <Typography variant="h2">SEO 彈性範例</Typography>
            <Typography variant="muted">
              使用 as prop 來改變 HTML 標籤，同時保持視覺樣式。未指定 variant
              時預設為 div 標籤
            </Typography>
          </div>
          <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
            <Typography>
              這是預設的 Typography（div 標籤，無額外樣式）
            </Typography>
            <Typography as="h2" variant="h1">
              這是 h2 標籤，但看起來像 h1
            </Typography>
            <Typography as="div" variant="h3">
              這是 div 標籤，但看起來像 h3
            </Typography>
            <Typography as="span" variant="lead">
              這是 span 標籤，但有 lead 的樣式
            </Typography>
          </div>
          <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
            <code>{`<Typography>
  這是預設的 Typography（div 標籤，無額外樣式）
</Typography>

<Typography variant="h1" as="h2">
  這是 h2 標籤，但看起來像 h1
</Typography>

<Typography variant="h3" as="div">
  這是 div 標籤，但看起來像 h3
</Typography>

<Typography variant="lead" as="span">
  這是 span 標籤，但有 lead 的樣式
</Typography>`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default TypographyDemo;
