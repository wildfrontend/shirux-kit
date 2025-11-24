'use client';

import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';
import {
  BasicValidationDemo,
  AsyncValidationDemo,
  ConfirmBeforeCloseDemo,
  RateLimitDemo,
} from '@/components/demo/dropdown-menu/on-before-open-change';
import { BasicUsageDemo } from '@/components/demo/dropdown-menu/basic';

const DropdownMenuPage: RC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Dropdown Menu
        </Typography>
        <Typography color="muted" variant="p">
          下拉式選單元件，支援條件式開關控制。可在狀態變更前進行驗證和攔截。
        </Typography>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">Props</Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">元件</th>
                <th className="px-4 py-2 text-left font-semibold">Props</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono">DropdownMenu</td>
                <td className="px-4 py-2 font-mono">open</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">控制選單開關狀態</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DropdownMenu</td>
                <td className="px-4 py-2 font-mono">onOpenChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (open: boolean) =&gt; void
                </td>
                <td className="px-4 py-2">狀態改變時的回調函數</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DropdownMenu</td>
                <td className="px-4 py-2 font-mono">onBeforeOpenChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (open: boolean) =&gt; boolean | Promise&lt;boolean&gt;
                </td>
                <td className="px-4 py-2">
                  在狀態變更前執行的驗證函數，返回 false 可拒絕操作
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ComponentPreview
        description="展示 Dropdown Menu 的基本使用方式，包含標籤、分隔線和圖標"
        title="基本用法"
      >
        <BasicUsageDemo />
      </ComponentPreview>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">基本使用範例</Typography>
        <div className="bg-muted/50 rounded-lg border p-4">
          <pre className="bg-background overflow-x-auto rounded p-3">
            <code className="font-mono text-xs">{`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shirux/rux-ui/components/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">開啟選單</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>個人資料</DropdownMenuItem>
    <DropdownMenuItem>設定</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>登出</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <Typography className="mb-4" variant="h2">
            onBeforeOpenChange 使用範例
          </Typography>
          <Typography color="muted" variant="p">
            onBeforeOpenChange
            允許您在選單開關前執行驗證邏輯，例如檢查權限、確認操作或限制使用次數等。
          </Typography>
        </div>

        <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
          <Typography variant="h3">核心特性</Typography>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            <li>
              <strong>條件驗證</strong>：在打開或關閉前檢查特定條件
            </li>
            <li>
              <strong>非同步支援</strong>：支援 async/await 進行非同步驗證（如
              API 呼叫）
            </li>
            <li>
              <strong>雙向控制</strong>：可控制打開和關閉兩個方向的操作
            </li>
            <li>
              <strong>靈活的回傳值</strong>：返回 true 允許操作，false 拒絕操作
            </li>
          </ul>
        </div>

        <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
          <Typography variant="h3">使用情境</Typography>
          <div className="grid gap-3">
            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-1 font-semibold" variant="small">
                1. 權限檢查
              </Typography>
              <Typography className="text-muted-foreground" variant="small">
                在打開選單前檢查使用者是否已登入或具有相應權限
              </Typography>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-1 font-semibold" variant="small">
                2. 非同步驗證
              </Typography>
              <Typography className="text-muted-foreground" variant="small">
                透過 API 呼叫驗證使用者權限或取得最新狀態
              </Typography>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-1 font-semibold" variant="small">
                3. 未儲存變更確認
              </Typography>
              <Typography className="text-muted-foreground" variant="small">
                在關閉前檢查是否有未儲存的變更，並提示使用者確認
              </Typography>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-1 font-semibold" variant="small">
                4. 使用限制
              </Typography>
              <Typography className="text-muted-foreground" variant="small">
                限制選單打開的次數或頻率
              </Typography>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
          <Typography variant="h3">基本使用範例</Typography>
          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                同步驗證
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`<DropdownMenu
  onBeforeOpenChange={(open) => {
    if (open && !isLoggedIn) {
      showLoginModal();
      return false; // 拒絕打開
    }
    return true; // 允許操作
  }}
>
  <DropdownMenuTrigger asChild>
    <Button>開啟選單</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {/* ... */}
  </DropdownMenuContent>
</DropdownMenu>`}</code>
              </pre>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                非同步驗證
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`<DropdownMenu
  onBeforeOpenChange={async (open) => {
    if (open) {
      const hasPermission = await checkPermission();
      return hasPermission;
    }
    return true;
  }}
>
  {/* ... */}
</DropdownMenu>`}</code>
              </pre>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                關閉前確認
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`<DropdownMenu
  onBeforeOpenChange={(open) => {
    // 只在關閉時檢查
    if (!open && hasUnsavedChanges) {
      return window.confirm('有未儲存的變更，確定要關閉嗎？');
    }
    return true;
  }}
>
  {/* ... */}
</DropdownMenu>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <ComponentPreview
        description="當使用者未登入時，拒絕打開選單並顯示提示訊息"
        title="基本條件驗證"
      >
        <BasicValidationDemo />
      </ComponentPreview>

      <ComponentPreview
        description="使用非同步函數驗證使用者權限，模擬 API 呼叫場景"
        title="非同步權限驗證"
      >
        <AsyncValidationDemo />
      </ComponentPreview>

      <ComponentPreview
        description="在關閉選單前檢查未儲存的變更，並要求使用者確認"
        title="關閉前確認"
      >
        <ConfirmBeforeCloseDemo />
      </ComponentPreview>

      <ComponentPreview
        description="限制選單可以打開的次數，達到上限後拒絕打開"
        title="使用限制"
      >
        <RateLimitDemo />
      </ComponentPreview>
    </div>
  );
};

export default DropdownMenuPage;
