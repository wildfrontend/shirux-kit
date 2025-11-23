'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@shirux/rux-ui/components/input-otp';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import { useState } from 'react';

import { ComponentPreview } from '@/components/ui/component-preview';

const InputOTPPage: RC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Input OTP
        </Typography>
        <Typography color="muted" variant="p">
          一次性密碼輸入元件，提供一格一格的輸入體驗，適合用於驗證碼輸入。
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
                <td className="px-4 py-2 font-mono">maxLength</td>
                <td className="px-4 py-2 font-mono text-xs">number</td>
                <td className="px-4 py-2 font-mono">6</td>
                <td className="px-4 py-2">OTP 輸入框的最大長度</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">value</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">受控的輸入值</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">onChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (value: string) =&gt; void
                </td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">值改變時的回調函數</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">disabled</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono">false</td>
                <td className="px-4 py-2">禁用輸入框</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">pattern</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">
                  正則表達式，用於限制輸入字元（如僅數字）
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-accent/10 mt-4 rounded-md p-4">
          <Typography className="mb-2 font-semibold" variant="sm">
            💡 客製化樣式
          </Typography>
          <Typography className="text-sm" color="muted">
            InputOTPSlot 支援透過 className 來客製化樣式。使用{' '}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              data-[active=true]
            </code>{' '}
            選擇器來自訂 focus 狀態的樣式。
          </Typography>
        </div>
      </div>

      <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用範例</Typography>
        <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
          <code>{`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "@shirux/rux-ui/components/input-otp"

// 基本用法 - 6 位數驗證碼
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// 分組顯示 - 使用分隔符
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// 受控元件
const [value, setValue] = useState('')

<InputOTP
  maxLength={6}
  value={value}
  onChange={setValue}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// 僅允許數字輸入
<InputOTP maxLength={6} pattern="[0-9]*">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// 客製化 Focus 樣式 - Accent 顏色
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} focusRingColor="accent" />
    <InputOTPSlot index={1} focusRingColor="accent" />
    <InputOTPSlot index={2} focusRingColor="accent" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} focusRingColor="accent" />
    <InputOTPSlot index={4} focusRingColor="accent" />
    <InputOTPSlot index={5} focusRingColor="accent" />
  </InputOTPGroup>
</InputOTP>`}</code>
        </pre>
      </div>

      <ComponentPreview
        description="基本的 6 位數 OTP 輸入，一格一格的設計"
        title="基本用法"
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputOTP maxLength={6} onChange={setValue1} value={value1}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Typography className="text-sm" color="muted">
            當前值: {value1 || '(空)'}
          </Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="使用分隔符將驗證碼分成兩組，提升可讀性"
        title="分組顯示"
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputOTP maxLength={6} onChange={setValue2} value={value2}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Typography className="text-sm" color="muted">
            當前值: {value2 || '(空)'}
          </Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="限制只能輸入數字的 OTP 輸入框"
        title="僅數字輸入"
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputOTP
            maxLength={6}
            onChange={setValue3}
            pattern="[0-9]*"
            value={value3}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Typography className="text-sm" color="muted">
            當前值: {value3 || '(空)'} (僅接受數字)
          </Typography>
        </div>
      </ComponentPreview>

      <ComponentPreview description="禁用狀態的 OTP 輸入框" title="禁用狀態">
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputOTP disabled maxLength={6} value="123456">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </ComponentPreview>

      <ComponentPreview description="4 位數的短驗證碼" title="不同長度">
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="透過 className 客製化樣式：無邊框、灰色背景、Accent focus"
        title="客製化樣式"
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <InputOTP maxLength={6} onChange={setValue4} value={value4}>
            <InputOTPGroup>
              <InputOTPSlot
                className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
                index={0}
              />
              <InputOTPSlot
                className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
                index={1}
              />
              <InputOTPSlot
                className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
                index={2}
              />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot
                className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
                index={3}
              />
              <InputOTPSlot
                className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
                index={4}
              />
              <InputOTPSlot
                className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          <Typography className="text-sm" color="muted">
            當前值: {value4 || '(空)'} (無邊框、灰色背景、Accent focus)
          </Typography>
        </div>
      </ComponentPreview>
      <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用範例</Typography>
        <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
          <code>{`
  <InputOTP maxLength={6} onChange={setValue4} value={value4}>
    <InputOTPGroup>
      <InputOTPSlot
        className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
        index={0}
      />
      <InputOTPSlot
        className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
        index={1}
      />
      <InputOTPSlot
        className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
        index={2}
      />
    </InputOTPGroup>
    <InputOTPGroup>
      <InputOTPSlot
        className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
        index={3}
      />
      <InputOTPSlot
        className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
        index={4}
      />
      <InputOTPSlot
        className="bg-muted data-[active=true]:border-accent data-[active=true]:ring-accent/50 border-0"
        index={5}
      />
    </InputOTPGroup>
  </InputOTP>
          `}</code>
        </pre>
      </div>
    </div>
  );
};

export default InputOTPPage;
