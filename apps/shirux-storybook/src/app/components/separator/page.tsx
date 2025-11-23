import { Separator } from '@shirux/rux-ui/components/separator';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';

const SeparatorPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Separator
      </Typography>
      <Typography color="muted" variant="p">
        分隔線元件用於視覺上區分內容區塊，支援水平和垂直方向。
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
              <td className="px-4 py-2 font-mono">orientation</td>
              <td className="px-4 py-2 font-mono text-xs">
                "horizontal" | "vertical"
              </td>
              <td className="px-4 py-2 font-mono">"horizontal"</td>
              <td className="px-4 py-2">分隔線的方向</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">size</td>
              <td className="px-4 py-2 font-mono text-xs">
                "1" | "2" | "3" | "4" | number | string
              </td>
              <td className="px-4 py-2 font-mono">"1"</td>
              <td className="px-4 py-2">
                分隔線的粗細。可使用預設值（1=1px, 2=2px, 3=4px,
                4=6px）或自訂值（數字會自動加 px，也可傳入 CSS 單位如 "0.5rem"）
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">decorative</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">true</td>
              <td className="px-4 py-2">是否為裝飾性元素（影響無障礙屬性）</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">className</td>
              <td className="px-4 py-2 font-mono text-xs">string</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">
                自訂樣式，可用於改變顏色（如 bg-red-500）
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import { Separator } from "@shirux/rux-ui/components/separator"

// 基本用法 - 水平分隔線
<Separator />

// 不同粗細
<Separator size="1" />  // 1px（預設）
<Separator size="2" />  // 2px
<Separator size="3" />  // 4px
<Separator size="4" />  // 6px

// 垂直分隔線
<div className="flex h-20 items-center">
  <span>左側內容</span>
  <Separator orientation="vertical" className="mx-4" />
  <span>右側內容</span>
</div>

// 自訂顏色
<Separator className="bg-red-500" />
<Separator className="bg-primary" />
<Separator className="bg-accent" />

// 漸層效果
<Separator
  size="3"
  className="bg-gradient-to-r from-blue-500 to-purple-500"
/>

// 實際應用範例
<div className="space-y-4">
  <Typography variant="h3">標題</Typography>
  <Separator />
  <Typography variant="p">內容區塊</Typography>
</div>`}</code>
      </pre>
    </div>
    <ComponentPreview description="不同粗細的分隔線效果" title="粗細大小">
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Typography variant="small">Size 1 (1px - 預設)</Typography>
          <Separator size="1" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">Size 2 (2px)</Typography>
          <Separator size="2" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">Size 3 (4px)</Typography>
          <Separator size="3" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">Size 4 (6px)</Typography>
          <Separator size="4" />
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="使用自訂數值或 CSS 單位設定粗細"
      title="自訂粗細"
    >
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Typography variant="small">
            數字值 (自動加 px): size={'{5}'}
          </Typography>
          <Separator size={5} />
        </div>
        <div className="space-y-2">
          <Typography variant="small">數字值: size={'{10}'}</Typography>
          <Separator size={10} />
        </div>
        <div className="space-y-2">
          <Typography variant="small">字串值: size="8px"</Typography>
          <Separator size="8px" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">rem 單位: size="0.5rem"</Typography>
          <Separator size="0.5rem" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">em 單位: size="1em"</Typography>
          <Separator size="1em" />
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview description="垂直分隔線用於分隔左右內容" title="垂直方向">
      <div className="flex h-32 w-full items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <Typography variant="p">左側內容</Typography>
          <Separator orientation="vertical" />
          <Typography variant="p">右側內容</Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="p">Item 1</Typography>
          <Separator orientation="vertical" size="2" />
          <Typography variant="p">Item 2</Typography>
          <Separator orientation="vertical" size="2" />
          <Typography variant="p">Item 3</Typography>
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="使用 className 改變分隔線顏色"
      title="自訂顏色"
    >
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Typography variant="small">預設顏色 (border)</Typography>
          <Separator size="2" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">Primary 顏色</Typography>
          <Separator className="bg-primary" size="2" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">Accent 顏色</Typography>
          <Separator className="bg-accent" size="2" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">Destructive 顏色</Typography>
          <Separator className="bg-destructive" size="2" />
        </div>
        <div className="space-y-2">
          <Typography variant="small">自訂顏色 (Red 500)</Typography>
          <Separator className="bg-red-500" size="2" />
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview description="漸層效果的分隔線" title="漸層顏色">
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Typography variant="small">藍色到紫色漸層</Typography>
          <Separator
            className="bg-gradient-to-r from-blue-500 to-purple-500"
            size="3"
          />
        </div>
        <div className="space-y-2">
          <Typography variant="small">綠色到藍色漸層</Typography>
          <Separator
            className="bg-gradient-to-r from-green-500 to-blue-500"
            size="3"
          />
        </div>
        <div className="space-y-2">
          <Typography variant="small">粉色到橘色漸層</Typography>
          <Separator
            className="bg-gradient-to-r from-pink-500 to-orange-500"
            size="3"
          />
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="使用 Tailwind CSS className 進行更多客製化調整"
      title="Tailwind 客製化"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Typography variant="small">自訂粗細（使用 h-* / w-*）</Typography>
          <div className="space-y-4">
            <Separator className="h-2" />
            <Separator className="h-3" />
            <Separator className="h-4" />
            <Separator className="h-[10px]" />
          </div>
        </div>
        <div className="space-y-2">
          <Typography variant="small">自訂寬度（部分寬度的分隔線）</Typography>
          <div className="space-y-4">
            <Separator className="w-1/2" size="2" />
            <Separator className="w-3/4" size="2" />
            <Separator className="mx-auto w-1/3" size="2" />
          </div>
        </div>
        <div className="space-y-2">
          <Typography variant="small">圓角效果</Typography>
          <div className="space-y-4">
            <Separator className="rounded-full" size="3" />
            <Separator className="rounded-lg" size="4" />
            <Separator className="bg-primary rounded-full" size="4" />
          </div>
        </div>
        <div className="space-y-2">
          <Typography variant="small">陰影與模糊效果</Typography>
          <div className="space-y-4">
            <Separator className="shadow-primary/50 shadow-md" size="2" />
            <Separator
              className="bg-accent shadow-accent/50 shadow-lg"
              size="3"
            />
            <Separator
              className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl"
              size="4"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Typography variant="small">透明度調整</Typography>
          <div className="space-y-4">
            <Separator className="bg-primary opacity-25" size="2" />
            <Separator className="bg-primary opacity-50" size="2" />
            <Separator className="bg-primary opacity-75" size="2" />
            <Separator className="bg-primary" size="2" />
          </div>
        </div>
        <div className="space-y-2">
          <Typography variant="small">虛線效果（使用 border）</Typography>
          <div className="space-y-4">
            <div className="border-border h-px w-full border-t border-dashed" />
            <div className="border-primary h-px w-full border-t-2 border-dashed" />
            <div className="border-accent h-px w-full border-t-4 border-dotted" />
          </div>
        </div>
        <div className="space-y-2">
          <Typography variant="small">組合應用</Typography>
          <div className="space-y-6">
            <Separator
              className="rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-lg"
              size="4"
            />
            <Separator
              className="bg-primary mx-auto w-3/4 rounded-full opacity-75 shadow-md"
              size="3"
            />
            <div className="flex items-center gap-4">
              <Separator
                className="to-border flex-1 bg-gradient-to-r from-transparent"
                size="2"
              />
              <Typography variant="small">或</Typography>
              <Separator
                className="to-border flex-1 bg-gradient-to-l from-transparent"
                size="2"
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview description="分隔線在實際內容中的應用" title="實際應用">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-6">
        <div>
          <Typography variant="h3">文章標題</Typography>
          <Typography color="muted" variant="small">
            2024年1月15日
          </Typography>
        </div>
        <Separator />
        <Typography variant="p">
          這是文章的內容段落。分隔線可以用來區分標題和內容，讓版面更清晰易讀。
        </Typography>
        <Separator className="bg-muted" />
        <div className="flex items-center justify-between">
          <Typography color="muted" variant="small">
            作者：Claude
          </Typography>
          <Typography color="muted" variant="small">
            閱讀時間：3 分鐘
          </Typography>
        </div>
      </div>
    </ComponentPreview>
  </div>
);

export default SeparatorPage;
