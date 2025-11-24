'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shirux/rux-ui/components/select';
import { Typography } from '@shirux/rux-ui/components/typography';
import { useState } from 'react';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';

const SelectPage: RC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Select
        </Typography>
        <Typography color="muted" variant="p">
          下拉選單元件，用於從選項列表中選擇單一值。
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
                <th className="px-4 py-2 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono">variant</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "default" | "primary" | "secondary" | "accent" | "outline" |
                  "ghost"
                </td>
                <td className="px-4 py-2 font-mono">"default"</td>
                <td className="px-4 py-2">SelectTrigger 的樣式變體</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">radius</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "default" | "pill" | "none"
                </td>
                <td className="px-4 py-2 font-mono">"default"</td>
                <td className="px-4 py-2">SelectTrigger 的圓角樣式</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">value</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">受控元件的當前值</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onValueChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (value: string) =&gt; void
                </td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">值改變時的回調函數</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">defaultValue</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">非受控元件的預設值</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">disabled</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">false</td>
                <td className="px-4 py-2">是否禁用選單</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用範例</Typography>
        <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
          <code>{`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shirux/rux-ui/components/select"

// 基本用法
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="選擇水果" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">蘋果</SelectItem>
    <SelectItem value="banana">香蕉</SelectItem>
    <SelectItem value="orange">橘子</SelectItem>
  </SelectContent>
</Select>

// 不同樣式變體
<SelectTrigger variant="primary">
  <SelectValue placeholder="Primary" />
</SelectTrigger>

<SelectTrigger variant="secondary">
  <SelectValue placeholder="Secondary" />
</SelectTrigger>

<SelectTrigger variant="accent">
  <SelectValue placeholder="Accent" />
</SelectTrigger>

<SelectTrigger variant="outline">
  <SelectValue placeholder="Outline" />
</SelectTrigger>

// 不同圓角樣式
<SelectTrigger radius="default">
  <SelectValue placeholder="Default" />
</SelectTrigger>

<SelectTrigger radius="pill">
  <SelectValue placeholder="Pill" />
</SelectTrigger>

<SelectTrigger radius="none">
  <SelectValue placeholder="None" />
</SelectTrigger>

// 受控元件
const [value, setValue] = useState('')

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="請選擇..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">選項 1</SelectItem>
    <SelectItem value="option2">選項 2</SelectItem>
  </SelectContent>
</Select>

// 使用分組
<Select>
  <SelectTrigger>
    <SelectValue placeholder="選擇項目" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>水果</SelectLabel>
      <SelectItem value="apple">蘋果</SelectItem>
      <SelectItem value="banana">香蕉</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>蔬菜</SelectLabel>
      <SelectItem value="carrot">紅蘿蔔</SelectItem>
      <SelectItem value="potato">馬鈴薯</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}</code>
        </pre>
      </div>

      <ComponentPreview
        description="Select 元件提供多種樣式變體，適用於不同的使用場景。注意：選項的 hover 顏色會跟隨 variant"
        title="樣式變體"
      >
        <div className="flex flex-col gap-4">
          <Select variant="default">
            <SelectTrigger className="w-[280px]" variant="default">
              <SelectValue placeholder="Default (使用 primary 互動色)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select variant="primary">
            <SelectTrigger className="w-[280px]" variant="primary">
              <SelectValue placeholder="Primary (使用 primary 互動色)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select variant="secondary">
            <SelectTrigger className="w-[280px]" variant="secondary">
              <SelectValue placeholder="Secondary (使用 secondary 互動色)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select variant="accent">
            <SelectTrigger className="w-[280px]" variant="accent">
              <SelectValue placeholder="Accent (使用 accent 互動色)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select variant="outline">
            <SelectTrigger className="w-[280px]" variant="outline">
              <SelectValue placeholder="Outline (使用 primary 互動色)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select variant="ghost">
            <SelectTrigger className="w-[280px]" variant="ghost">
              <SelectValue placeholder="Ghost (使用 primary 互動色)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview description="支援不同的圓角樣式" title="圓角樣式">
        <div className="flex flex-col gap-4">
          <Select>
            <SelectTrigger className="w-[280px]" radius="default">
              <SelectValue placeholder="Default (標準圓角)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[280px]" radius="pill">
              <SelectValue placeholder="Pill (膠囊形)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[280px]" radius="none">
              <SelectValue placeholder="None (無圓角)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">選項 1</SelectItem>
              <SelectItem value="2">選項 2</SelectItem>
              <SelectItem value="3">選項 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview description="最基本的下拉選單使用方式" title="基本用法">
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="選擇水果" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">蘋果</SelectItem>
            <SelectItem value="banana">香蕉</SelectItem>
            <SelectItem value="orange">橘子</SelectItem>
            <SelectItem value="grape">葡萄</SelectItem>
            <SelectItem value="watermelon">西瓜</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        description="使用 value 和 onValueChange 控制選單狀態"
        title="受控元件"
      >
        <div className="flex flex-col gap-4">
          <Select onValueChange={setValue} value={value}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="請選擇選項" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">選項 1</SelectItem>
              <SelectItem value="option2">選項 2</SelectItem>
              <SelectItem value="option3">選項 3</SelectItem>
              <SelectItem value="option4">選項 4</SelectItem>
            </SelectContent>
          </Select>
          <Typography color="muted" variant="small">
            當前選擇的值: {value || '(未選擇)'}
          </Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="使用 SelectGroup 和 SelectLabel 將選項分組"
        title="分組選項"
      >
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="選擇食物" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>水果</SelectLabel>
              <SelectItem value="apple">蘋果</SelectItem>
              <SelectItem value="banana">香蕉</SelectItem>
              <SelectItem value="orange">橘子</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>蔬菜</SelectLabel>
              <SelectItem value="carrot">紅蘿蔔</SelectItem>
              <SelectItem value="potato">馬鈴薯</SelectItem>
              <SelectItem value="tomato">番茄</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>肉類</SelectLabel>
              <SelectItem value="chicken">雞肉</SelectItem>
              <SelectItem value="beef">牛肉</SelectItem>
              <SelectItem value="pork">豬肉</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        description="部分選項可以被設定為禁用狀態"
        title="禁用選項"
      >
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="選擇選項" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">選項 1</SelectItem>
            <SelectItem disabled value="option2">
              選項 2 (已禁用)
            </SelectItem>
            <SelectItem value="option3">選項 3</SelectItem>
            <SelectItem disabled value="option4">
              選項 4 (已禁用)
            </SelectItem>
            <SelectItem value="option5">選項 5</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        description="整個 Select 元件可以被禁用"
        title="禁用狀態"
      >
        <Select disabled>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="無法選擇" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">選項 1</SelectItem>
            <SelectItem value="option2">選項 2</SelectItem>
            <SelectItem value="option3">選項 3</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        description="Select 元件適用於各種使用場景"
        title="實際應用範例"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography variant="small">國家/地區</Typography>
            <Select>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="請選擇國家或地區" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tw">台灣</SelectItem>
                <SelectItem value="cn">中國</SelectItem>
                <SelectItem value="jp">日本</SelectItem>
                <SelectItem value="kr">韓國</SelectItem>
                <SelectItem value="us">美國</SelectItem>
                <SelectItem value="uk">英國</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="small">時區</Typography>
            <Select defaultValue="utc8">
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>亞洲</SelectLabel>
                  <SelectItem value="utc8">UTC+8 (台北、香港)</SelectItem>
                  <SelectItem value="utc9">UTC+9 (東京、首爾)</SelectItem>
                  <SelectItem value="utc7">UTC+7 (曼谷、雅加達)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>歐洲</SelectLabel>
                  <SelectItem value="utc0">UTC+0 (倫敦)</SelectItem>
                  <SelectItem value="utc1">UTC+1 (巴黎、柏林)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>美洲</SelectLabel>
                  <SelectItem value="utc-5">UTC-5 (紐約)</SelectItem>
                  <SelectItem value="utc-8">UTC-8 (洛杉磯)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="small">語言</Typography>
            <Select defaultValue="zh-tw">
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh-tw">繁體中文</SelectItem>
                <SelectItem value="zh-cn">简体中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default SelectPage;
