import { ScrollArea } from '@shirux/rux-ui/components/scroll-area';
import { Separator } from '@shirux/rux-ui/components/separator';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';

const ScrollAreaPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Scroll Area
      </Typography>
      <Typography color="muted" variant="p">
        可滾動區域元件，提供自訂樣式的滾動條，支援垂直和水平滾動。
      </Typography>
    </div>

    <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">Props</Typography>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-semibold">Prop</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Default</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-2 font-mono">className</td>
              <td className="px-4 py-2 font-mono text-xs">string</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">額外的 CSS 類名</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">children</td>
              <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">滾動區域的內容</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import { ScrollArea } from "@shirux/rux-ui/components/scroll-area"

// 基本用法
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {/* 你的內容 */}
  </div>
</ScrollArea>

// 帶分隔線的列表
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <div key={item}>
        <div className="text-sm">{item}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>`}</code>
      </pre>
    </div>

    <ComponentPreview
      description="基本的垂直滾動區域，使用 accent 顏色和圓角樣式的滾動條"
      title="基本範例"
    >
      <ScrollArea className="h-72 w-48 rounded-md border p-4">
        <Typography className="mb-4 leading-none font-medium" variant="sm">
          標籤
        </Typography>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>
            <Typography variant="sm">標籤 {i + 1}</Typography>
            {i < 49 && <Separator className="my-2" />}
          </div>
        ))}
      </ScrollArea>
    </ComponentPreview>

    <ComponentPreview description="包含豐富內容的滾動區域範例" title="內容範例">
      <ScrollArea className="h-96 w-full max-w-md rounded-md border">
        <div className="p-4">
          <Typography className="mb-4 font-semibold" variant="md">
            關於 ELUELU
          </Typography>
          <div className="space-y-4">
            <Typography variant="sm">
              ELUELU 是一個現代化的 UI
              元件庫，專為建立優雅且高效的使用者介面而設計。
            </Typography>
            <Typography variant="sm">
              我們的元件庫基於 Radix UI 和 Tailwind
              CSS，提供了高度可自訂且易於使用的元件。
            </Typography>
            <Typography className="font-semibold" variant="sm">
              主要特色
            </Typography>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                <Typography variant="sm">完全可自訂的主題系統</Typography>
              </li>
              <li>
                <Typography variant="sm">支援深色模式</Typography>
              </li>
              <li>
                <Typography variant="sm">無障礙設計</Typography>
              </li>
              <li>
                <Typography variant="sm">TypeScript 支援</Typography>
              </li>
              <li>
                <Typography variant="sm">響應式設計</Typography>
              </li>
              <li>
                <Typography variant="sm">豐富的元件庫</Typography>
              </li>
            </ul>
            <Typography className="font-semibold" variant="sm">
              元件列表
            </Typography>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                <Typography variant="sm">Button - 按鈕元件</Typography>
              </li>
              <li>
                <Typography variant="sm">Input - 輸入框元件</Typography>
              </li>
              <li>
                <Typography variant="sm">Typography - 文字排版</Typography>
              </li>
              <li>
                <Typography variant="sm">Scroll Area - 滾動區域</Typography>
              </li>
              <li>
                <Typography variant="sm">Separator - 分隔線</Typography>
              </li>
              <li>
                <Typography variant="sm">Tooltip - 提示框</Typography>
              </li>
              <li>
                <Typography variant="sm">更多元件持續開發中...</Typography>
              </li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    </ComponentPreview>

    <ComponentPreview description="水平滾動區域範例" title="水平滾動">
      <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              className="bg-accent text-accent-foreground h-32 w-32 shrink-0 rounded-md p-4"
              key={i}
            >
              <Typography className="font-medium" variant="sm">
                項目 {i + 1}
              </Typography>
            </div>
          ))}
        </div>
      </ScrollArea>
    </ComponentPreview>

    <ComponentPreview
      className="flex-col items-stretch gap-4 md:flex-row"
      description="多個滾動區域並排使用"
      title="多個滾動區域"
    >
      <ScrollArea className="h-72 flex-1 rounded-md border p-4">
        <Typography className="mb-4 font-medium" variant="sm">
          清單 A
        </Typography>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i}>
            <Typography variant="sm">項目 A-{i + 1}</Typography>
            {i < 29 && <Separator className="my-2" />}
          </div>
        ))}
      </ScrollArea>
      <ScrollArea className="h-72 flex-1 rounded-md border p-4">
        <Typography className="mb-4 font-medium" variant="sm">
          清單 B
        </Typography>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i}>
            <Typography variant="sm">項目 B-{i + 1}</Typography>
            {i < 29 && <Separator className="my-2" />}
          </div>
        ))}
      </ScrollArea>
    </ComponentPreview>

    <ComponentPreview description="帶有樣式內容的滾動區域" title="樣式化內容">
      <ScrollArea className="h-96 w-full max-w-md rounded-md border">
        <div className="p-4">
          <Typography className="mb-4 font-semibold" variant="md">
            通知列表
          </Typography>
          <div className="space-y-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                className="hover:bg-accent/50 rounded-lg border p-3 transition-colors"
                key={i}
              >
                <div className="mb-1 flex items-center justify-between">
                  <Typography className="font-medium" variant="sm">
                    通知 {i + 1}
                  </Typography>
                  <Typography color="muted" variant="xs">
                    {i + 1} 分鐘前
                  </Typography>
                </div>
                <Typography color="muted" variant="xs">
                  這是通知內容的描述文字，可能會包含更多詳細資訊。
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </ComponentPreview>
  </div>
);

export default ScrollAreaPage;
