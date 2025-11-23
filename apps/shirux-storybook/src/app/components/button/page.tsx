import { Button } from '@shirux/rux-ui/components/button';
import { Typography } from '@shirux/rux-ui/components/typography';
import { Download, Loader2, Mail } from 'lucide-react';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';
import { Send } from '@shirux/rux-icons/lucide';

const ButtonPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Button
      </Typography>
      <Typography color="muted" variant="p">
        按鈕元件用於觸發動作或事件，支援多種樣式和尺寸變體。
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
              <td className="px-4 py-2 font-mono">variant</td>
              <td className="px-4 py-2 font-mono text-xs">
                "default" | "destructive" | "outline" | "secondary" | "accent" |
                "ghost" | "link" | "base"
              </td>
              <td className="px-4 py-2 font-mono">"default"</td>
              <td className="px-4 py-2">按鈕的樣式變體</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">size</td>
              <td className="px-4 py-2 font-mono text-xs">
                "default" | "sm" | "lg" | "icon"
              </td>
              <td className="px-4 py-2 font-mono">"default"</td>
              <td className="px-4 py-2">按鈕的尺寸大小</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">radius</td>
              <td className="px-4 py-2 font-mono text-xs">
                "default" | "pill" | "circle" | "none"
              </td>
              <td className="px-4 py-2 font-mono">"default"</td>
              <td className="px-4 py-2">按鈕的圓角樣式</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">color</td>
              <td className="px-4 py-2 font-mono text-xs">
                "primary" | "secondary" | "accent" | "destructive"
              </td>
              <td className="px-4 py-2 font-mono">"primary"</td>
              <td className="px-4 py-2">
                控制 outline、ghost、link 的顏色主題，或搭配 foreground 使用
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">foreground</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">啟用前景色樣式，適用於深色背景</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">asChild</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">
                將按鈕樣式套用到子元素（使用 Radix Slot）
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">disabled</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">禁用按鈕</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import { Button } from "@shirux/rux-ui/components/button"

// 基本用法
<Button>Click me</Button>

// 不同樣式
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Delete</Button>

// Outline 樣式 - 使用 color prop 控制顏色
<Button variant="outline">Primary Outline</Button>
<Button variant="outline" color="secondary">Secondary Outline</Button>
<Button variant="outline" color="accent">Accent Outline</Button>
<Button variant="outline" color="destructive">Destructive Outline</Button>

// Ghost 樣式 - 使用 color prop 控制顏色
<Button variant="ghost">Primary Ghost</Button>
<Button variant="ghost" color="secondary">Secondary Ghost</Button>
<Button variant="ghost" color="accent">Accent Ghost</Button>
<Button variant="ghost" color="destructive">Destructive Ghost</Button>

// Link 樣式 - 使用 color prop 控制顏色
<Button variant="link">Primary Link</Button>
<Button variant="link" color="secondary">Secondary Link</Button>
<Button variant="link" color="accent">Accent Link</Button>
<Button variant="link" color="destructive">Destructive Link</Button>

// 不同尺寸
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// 不同圓角樣式
<Button radius="default">標準圓角</Button>
<Button radius="pill">兩邊圓角（膠囊形）</Button>
<Button radius="circle" size="icon">圓形</Button>
<Button radius="none">無圓角</Button>

// 實際應用範例
<Button variant="outline" radius="pill">追蹤</Button>
<Button variant="accent" radius="pill">訂閱</Button>

// 帶圖示
<Button>
  <Mail />
  Login with Email
</Button>

// 禁用狀態
<Button disabled>Disabled</Button>

// 圖示按鈕
<Button size="icon">
  <Mail />
</Button>

// 圓形圖示按鈕
<Button size="icon" radius="circle">
  <Mail />
</Button>

// 前景色樣式 - 適用於深色背景（如 footer、header）
<Button variant="ghost" color="primary" foreground>
  Ghost on Primary
</Button>
<Button variant="link" color="secondary" foreground>
  Link on Secondary
</Button>
<Button size="icon" radius="circle" color="accent" foreground>
  <Mail />
</Button>`}</code>
      </pre>
    </div>
    <ComponentPreview
      description="Button 元件提供多種樣式變體，適用於不同的使用場景"
      title="樣式變體"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="outline、ghost、link 變體可透過 color prop 控制顏色"
      title="顏色變體 (使用 color prop)"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Typography className="text-sm font-semibold" variant="p">
            Outline
          </Typography>
          <div className="flex flex-wrap gap-3 bg-black p-2">
            <Button variant="outline">Primary</Button>
            <Button color="secondary" variant="outline">
              Secondary
            </Button>
            <Button color="accent" variant="outline">
              Accent
            </Button>
            <Button color="destructive" variant="outline">
              Destructive
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Typography className="text-sm font-semibold" variant="p">
            Ghost
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost">Primary</Button>
            <Button color="secondary" variant="ghost">
              Secondary
            </Button>
            <Button color="accent" variant="ghost">
              Accent
            </Button>
            <Button color="destructive" variant="ghost">
              Destructive
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Typography className="text-sm font-semibold" variant="p">
            Link
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Button variant="link">Primary</Button>
            <Button color="secondary" variant="link">
              Secondary
            </Button>
            <Button color="accent" variant="link">
              Accent
            </Button>
            <Button color="destructive" variant="link">
              Destructive
            </Button>
          </div>
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview description="三種不同的尺寸大小供選擇" title="尺寸">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </ComponentPreview>
    <ComponentPreview
      description="支援不同的圓角樣式，從標準圓角到完全圓形"
      title="圓角樣式"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <Button radius="default">Default</Button>
          <Button radius="pill">Pill</Button>
          <Button radius="circle" size="icon">
            <Mail />
          </Button>
          <Button radius="none">None</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button radius="pill" variant="outline">
            追蹤
          </Button>
          <Button radius="pill" variant="accent">
            訂閱
          </Button>
          <Button radius="circle" size="icon" variant="outline">
            <Download />
          </Button>
        </div>
      </div>
    </ComponentPreview>
    <div className="flex flex-col gap-4">
      <ComponentPreview
        description="圖示搭配多種尺寸的應用示例"
        title="圖示按鈕"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button radius="circle" size="icon">
            <Mail />
          </Button>
          <Button radius="circle" size="icon" variant="secondary">
            <Mail />
          </Button>
          <Button radius="circle" size="icon" variant="accent">
            <Mail />
          </Button>
          <Button radius="circle" size="icon" variant="destructive">
            <Mail />
          </Button>
        </div>
      </ComponentPreview>
      <ComponentPreview
        description="圖示與文字組合時的垂直置中對齊效果"
        title="圖示與文字組合"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">
              <Send className="size-4" />
              Small Button
            </Button>
            <Button size="default">
              <Send className="size-5" />
              Default Button
            </Button>
            <Button size="lg">
              <Send className="size-6" />
              Large Button
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline">
              <Download />
              下載檔案
            </Button>
            <Button variant="secondary">
              <Send className="size-5" />
              發送評分
            </Button>
            <Button color="accent" radius="pill" variant="outline">
              評分
              <Send className="size-5" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button radius="pill" variant="outline">
              <Mail />
              追蹤
            </Button>
            <Button radius="pill" variant="accent">
              <Send className="size-5" />
              給予評分
            </Button>
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview
        description="不同 loading 狀態的顯示方式"
        title="Loading 狀態"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled>
            <Loader2 className="mr-2 size-4 animate-spin" />
            載入中
          </Button>
          <Button variant="secondary">
            <Loader2 className="mr-2 size-4 animate-spin" />
            處理中
          </Button>
          <Button variant="outline">
            <Loader2 className="mr-2 size-4 animate-spin" />
            請稍候
          </Button>
        </div>
      </ComponentPreview>
    </div>
  </div>
);

export default ButtonPage;
