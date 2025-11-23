import { Input } from '@shirux/rux-ui/components/input';
import { Typography } from '@shirux/rux-ui/components/typography';
import { Mail, Search } from 'lucide-react';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';

const InputPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Input
      </Typography>
      <Typography color="muted" variant="p">
        輸入框元件用於接收使用者輸入，支援多種圓角樣式和輸入類型。
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
              <td className="px-4 py-2 font-mono">radius</td>
              <td className="px-4 py-2 font-mono text-xs">
                "default" | "pill" | "none"
              </td>
              <td className="px-4 py-2 font-mono">"default"</td>
              <td className="px-4 py-2">輸入框的圓角樣式</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">type</td>
              <td className="px-4 py-2 font-mono text-xs">string</td>
              <td className="px-4 py-2 font-mono">"text"</td>
              <td className="px-4 py-2">
                輸入框類型（text, email, password, search, etc.）
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">placeholder</td>
              <td className="px-4 py-2 font-mono text-xs">string</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">佔位符文字</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">disabled</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">禁用輸入框</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">aria-invalid</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">標記為無效狀態，顯示錯誤樣式</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import { Input } from "@shirux/rux-ui/components/input"

// 基本用法
<Input placeholder="輸入文字..." />

// 不同圓角樣式
<Input radius="default" placeholder="標準圓角" />
<Input radius="pill" placeholder="膠囊形圓角" />
<Input radius="none" placeholder="無圓角" />

// 不同輸入類型
<Input type="email" placeholder="電子郵件" />
<Input type="password" placeholder="密碼" />
<Input type="search" placeholder="搜尋..." />
<Input type="number" placeholder="數字" />
<Input type="tel" placeholder="電話號碼" />

// 禁用狀態
<Input disabled placeholder="禁用的輸入框" />

// 錯誤狀態
<Input aria-invalid placeholder="錯誤的輸入" />

// 搭配圖示
<div className="relative">
  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
  <Input className="pl-9" placeholder="搜尋..." />
</div>`}</code>
      </pre>
    </div>
    <ComponentPreview description="Input 元件提供三種圓角樣式" title="圓角樣式">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Input placeholder="Default - 標準圓角" radius="default" />
        <Input placeholder="Pill - 膠囊形圓角" radius="pill" />
        <Input placeholder="None - 無圓角" radius="none" />
      </div>
    </ComponentPreview>
    <ComponentPreview description="支援多種不同的輸入類型" title="輸入類型">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Input placeholder="文字輸入" type="text" />
        <Input placeholder="電子郵件" type="email" />
        <Input placeholder="密碼" type="password" />
        <Input placeholder="搜尋..." type="search" />
        <Input placeholder="數字" type="number" />
        <Input placeholder="電話號碼" type="tel" />
        <Input placeholder="日期" type="date" />
      </div>
    </ComponentPreview>
    <ComponentPreview description="輸入框的不同狀態顯示" title="狀態">
      <div className="flex w-full max-w-md flex-col gap-4">
        <div>
          <Typography className="mb-2 text-sm" color="muted">
            正常狀態
          </Typography>
          <Input placeholder="輸入文字..." />
        </div>
        <div>
          <Typography className="mb-2 text-sm" color="muted">
            禁用狀態
          </Typography>
          <Input disabled placeholder="禁用的輸入框" />
        </div>
        <div>
          <Typography className="mb-2 text-sm" color="muted">
            錯誤狀態 (aria-invalid)
          </Typography>
          <Input aria-invalid placeholder="錯誤的輸入" />
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="搭配圖示的搜尋框範例，展示 pill 樣式的實際應用"
      title="搜尋框"
    >
      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input className="pl-9" placeholder="搜尋..." radius="pill" />
        </div>
        <div className="relative">
          <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="輸入電子郵件..."
            radius="pill"
            type="email"
          />
        </div>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="組合不同圓角樣式和輸入類型的範例"
      title="組合範例"
    >
      <div className="flex w-full max-w-md flex-col gap-4">
        <Input placeholder="預設樣式的文字輸入" />
        <Input placeholder="膠囊形的搜尋框" radius="pill" type="search" />
        <Input placeholder="無圓角的電子郵件" radius="none" type="email" />
        <Input placeholder="預設樣式的密碼" type="password" />
      </div>
    </ComponentPreview>
  </div>
);

export default InputPage;
