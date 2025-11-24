import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';
import { BasicToastDemo } from '@/components/demo/toast/basic';
import { ActionToastDemo } from '@/components/demo/toast/with-action';
import { PromiseToastDemo } from '@/components/demo/toast/promise';
import { CustomToastDemo } from '@/components/demo/toast/custom';
import { ServerActionToastDemo } from '@/components/demo/toast/server-action';

const ToastPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Toast (Sonner)
      </Typography>
      <Typography color="muted" variant="p">
        基於 Sonner 的 Toast 通知元件，用於顯示臨時訊息和通知。
      </Typography>
    </div>

    <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">安裝</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`// 1. 在你的根 layout 中引入 Toaster 元件
import { Toaster } from '@shirux/rux-ui/components/toast'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`}</code>
      </pre>
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
              <td className="px-4 py-2 font-mono">position</td>
              <td className="px-4 py-2 font-mono text-xs">
                "top-left" | "top-right" | "bottom-left" | "bottom-right" |
                "top-center" | "bottom-center"
              </td>
              <td className="px-4 py-2 font-mono">"bottom-right"</td>
              <td className="px-4 py-2">Toast 顯示位置</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">expand</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">是否展開顯示所有 toast</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">richColors</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">啟用豐富的顏色樣式</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">closeButton</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">顯示關閉按鈕</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">duration</td>
              <td className="px-4 py-2 font-mono text-xs">number</td>
              <td className="px-4 py-2 font-mono">4000</td>
              <td className="px-4 py-2">預設顯示時間（毫秒）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`'use client'

import { Button } from '@shirux/rux-ui/components/button'
import { toast } from 'sonner'

export default function MyComponent() {
  return (
    <>
      {/* 基本用法 */}
      <Button onClick={() => toast('我的第一個 toast')}>
        顯示 Toast
      </Button>

      {/* 帶有描述 */}
      <Button
        onClick={() => toast('活動通知', {
          description: '你的活動已成功建立'
        })}
      >
        帶描述
      </Button>

      {/* 不同類型 */}
      <Button onClick={() => toast.success('操作成功')}>
        成功
      </Button>
      <Button onClick={() => toast.error('發生錯誤')}>
        錯誤
      </Button>
      <Button onClick={() => toast.info('系統提示')}>
        提示
      </Button>
      <Button onClick={() => toast.warning('注意事項')}>
        警告
      </Button>

      {/* 帶有動作按鈕 */}
      <Button
        onClick={() => toast('確認刪除', {
          description: '此操作無法復原',
          action: {
            label: '確認',
            onClick: () => console.log('已確認')
          },
          cancel: {
            label: '取消',
            onClick: () => console.log('已取消')
          }
        })}
      >
        帶動作
      </Button>

      {/* Promise */}
      <Button
        onClick={() => {
          const promise = fetch('/api/data')
          toast.promise(promise, {
            loading: '載入中...',
            success: '載入成功',
            error: '載入失敗'
          })
        }}
      >
        Promise Toast
      </Button>

      {/* 自訂樣式 */}
      <Button
        onClick={() => toast('自訂 Toast', {
          duration: 5000,
          icon: '🎉',
          className: 'my-custom-class'
        })}
      >
        自訂樣式
      </Button>
    </>
  )
}`}</code>
      </pre>
    </div>

    <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">Server Action 範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`'use client'

import { Button } from '@shirux/rux-ui/components/button'
import { toast } from 'sonner'

export default function MyComponent() {
  // 方法 1: 手動處理 Server Action 回應
  const handleServerAction = async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        body: JSON.stringify({ data: 'example' })
      })

      if (!response.ok) throw new Error('請求失敗')

      const data = await response.json()

      // Server 成功後觸發 client toast
      toast.success('操作成功', {
        description: data.message
      })
    } catch (error) {
      // Server 錯誤時觸發 client toast
      toast.error('操作失敗', {
        description: error.message
      })
    }
  }

  // 方法 2: 使用 toast.promise
  const handleWithPromise = () => {
    const promise = fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ data: 'example' })
    }).then(res => res.json())

    toast.promise(promise, {
      loading: '處理中...',
      success: (data) => \`成功: \${data.message}\`,
      error: (err) => \`錯誤: \${err.message}\`
    })
  }

  return (
    <>
      <Button onClick={handleServerAction}>
        Server Action
      </Button>
      <Button onClick={handleWithPromise}>
        Promise 方式
      </Button>
    </>
  )
}`}</code>
      </pre>
    </div>

    <ComponentPreview
      description="Toast 元件提供多種類型的通知訊息"
      title="基本用法"
    >
      <BasicToastDemo />
    </ComponentPreview>

    <ComponentPreview
      description="Toast 可以包含動作按鈕和取消按鈕"
      title="帶有動作按鈕"
    >
      <ActionToastDemo />
    </ComponentPreview>

    <ComponentPreview
      description="使用 toast.promise 來處理非同步操作的狀態顯示"
      title="Promise Toast"
    >
      <PromiseToastDemo />
    </ComponentPreview>

    <ComponentPreview
      description="可以自訂圖示、持續時間等選項"
      title="自訂樣式"
    >
      <CustomToastDemo />
    </ComponentPreview>

    <ComponentPreview
      description="從 Server Action 或 API 呼叫觸發 Client 端的 Toast 通知"
      title="Server Action 範例"
    >
      <ServerActionToastDemo />
    </ComponentPreview>

    <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">API 方法</Typography>
      <div className="space-y-4">
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast(message, options)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            顯示一個基本的 toast 通知
          </Typography>
        </div>
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast.success(message, options)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            顯示成功訊息
          </Typography>
        </div>
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast.error(message, options)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            顯示錯誤訊息
          </Typography>
        </div>
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast.info(message, options)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            顯示提示訊息
          </Typography>
        </div>
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast.warning(message, options)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            顯示警告訊息
          </Typography>
        </div>
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast.promise(promise, options)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            根據 Promise 狀態自動顯示不同訊息
          </Typography>
        </div>
        <div>
          <code className="rounded bg-black px-2 py-1 text-sm text-white">
            toast.dismiss(id)
          </code>
          <Typography className="mt-2" color="muted" variant="p">
            關閉指定的 toast
          </Typography>
        </div>
      </div>
    </div>
  </div>
);

export default ToastPage;
