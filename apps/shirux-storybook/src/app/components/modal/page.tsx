'use client';

import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';
import { BasicModalDemo } from '@/components/demo/modal/basic';
import { NoCloseButtonDemo } from '@/components/demo/modal/no-close-button';
import { WithCloseButtonDemo } from '@/components/demo/modal/with-close-button';
import { CustomCloseButtonDemo } from '@/components/demo/modal/custom-close-button';
import { BasicModalProviderDemo } from '@/components/demo/modal-provider/basic';
import { AsyncModalProviderDemo } from '@/components/demo/modal-provider/aysnc';
import { NestedModalProviderDemo } from '@/components/demo/modal-provider/nested';

const ModalPage: RC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Modal (Dialog)
        </Typography>
        <Typography color="muted" variant="p">
          彈出式對話框元件，用於顯示重要訊息或需要使用者互動的內容。採用
          secondary 背景色、primary 文字及邊框顏色的設計風格。
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
                <td className="px-4 py-2 font-mono">Dialog</td>
                <td className="px-4 py-2 font-mono">open</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">控制 Modal 開關狀態</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">Dialog</td>
                <td className="px-4 py-2 font-mono">onOpenChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (open: boolean) =&gt; void
                </td>
                <td className="px-4 py-2">狀態改變時的回調函數</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DialogContent</td>
                <td className="px-4 py-2 font-mono">transparentOverlay</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">
                  設為 true 時遮罩變為透明（預設 false）
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DialogContent</td>
                <td className="px-4 py-2 font-mono">showCloseButton</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">
                  設為 true 時顯示內建右上角 X 關閉按鈕（預設 false）
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DialogContent</td>
                <td className="px-4 py-2 font-mono">closeButton</td>
                <td className="px-4 py-2 font-mono text-xs">React.ReactNode</td>
                <td className="px-4 py-2">
                  自定義右上角關閉按鈕，會替換內建的 X 按鈕位置
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DialogContent</td>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2">自定義樣式類名</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DialogTitle</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2 font-mono text-xs">-</td>
                <td className="px-4 py-2">
                  Modal 標題（必須包含以符合無障礙）
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DialogDescription</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2 font-mono text-xs">-</td>
                <td className="px-4 py-2">Modal 描述文字</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ComponentPreview
        description="基本的 Modal 對話框，使用 Dialog + DialogTrigger 組合（非受控模式）"
        title="基本用法"
      >
        <BasicModalDemo />
      </ComponentPreview>

      <ComponentPreview
        description="預設不顯示關閉按鈕，需要自己在內容區域加入關閉邏輯"
        title="無關閉按鈕（預設）"
      >
        <NoCloseButtonDemo />
      </ComponentPreview>

      <ComponentPreview
        description="使用 showCloseButton 顯示內建的右上角 X 關閉按鈕"
        title="顯示內建關閉按鈕"
      >
        <WithCloseButtonDemo />
      </ComponentPreview>

      <ComponentPreview
        description="使用 closeButton 自定義關閉按鈕的樣式、圖示和位置"
        title="自定義關閉按鈕"
      >
        <CustomCloseButtonDemo />
      </ComponentPreview>

      <div className="space-y-8">
        <div>
          <Typography className="mb-4" variant="h2">
            Modal Provider
          </Typography>
          <Typography color="muted" variant="p">
            Modal Provider 提供了更強大且易用的 Promise-based API
            來管理彈窗狀態，推薦使用此方式來實作複雜的互動流程。
          </Typography>
        </div>

        <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
          <Typography variant="h3">核心 API</Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-semibold">API</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    參數 / 返回值
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">
                    useModalController
                  </td>
                  <td className="px-4 py-2">
                    <div className="space-y-1">
                      <div>
                        <span className="text-muted-foreground font-mono text-xs">
                          參數:
                        </span>
                        <code className="ml-1 text-xs">
                          namespace?: string | [string]
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-mono text-xs">
                          返回:
                        </span>
                        <code className="ml-1 text-xs">
                          (key, payload) =&gt; Promise
                        </code>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    用於打開 Modal，返回函數可打開指定 Modal
                    並等待結果。namespace 預設為 &apos;app&apos;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">useModalSlot</td>
                  <td className="px-4 py-2">
                    <div className="space-y-1">
                      <div>
                        <span className="text-muted-foreground font-mono text-xs">
                          參數:
                        </span>
                        <code className="ml-1 text-xs">
                          keyOrKeys: string | [string] | [string, string]
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-mono text-xs">
                          返回:
                        </span>
                        <code className="ml-1 text-xs">ModalSlot</code>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    監聽並顯示 Modal，返回包含 isOpen, payload, close,
                    resolveWith, isResolving 等狀態和方法
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">MODAL_BACK</td>
                  <td className="px-4 py-2">
                    <code className="text-xs">Symbol</code>
                  </td>
                  <td className="px-4 py-2">
                    特殊 Symbol，用於嵌套 Modal 中返回上一層而不關閉整個堆疊
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography className="mt-6" variant="h4">
            ModalSlot 返回值
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-semibold">屬性</th>
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">isOpen</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2">Modal 是否打開</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">payload</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Partial&lt;TPayload&gt;
                  </td>
                  <td className="px-4 py-2">傳遞給 Modal 的數據</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">close</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    (result?) =&gt; void
                  </td>
                  <td className="px-4 py-2">關閉 Modal 並返回結果</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">resolveWith</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    (executor) =&gt; Promise
                  </td>
                  <td className="px-4 py-2">
                    執行異步操作並在完成後關閉 Modal
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">isResolving</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2">是否正在執行異步操作</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">id</td>
                  <td className="px-4 py-2 font-mono text-xs">string | null</td>
                  <td className="px-4 py-2">Modal 的唯一 ID</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">index</td>
                  <td className="px-4 py-2 font-mono text-xs">number</td>
                  <td className="px-4 py-2">Modal 在堆疊中的位置</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">isTop</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2">是否為堆疊最頂層的 Modal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
          <Typography variant="h3">主要特性</Typography>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            <li>
              <strong>Promise-based API</strong>：使用 async/await
              等待用戶操作結果
            </li>
            <li>
              <strong>多層嵌套支援</strong>：支援在 Modal 中打開另一個 Modal
            </li>
            <li>
              <strong>異步操作處理</strong>：內建 resolveWith 和 isResolving
              處理異步任務
            </li>
            <li>
              <strong>自動狀態管理</strong>：自動管理 Modal
              堆疊，無需手動維護狀態
            </li>
            <li>
              <strong>TypeScript 支援</strong>：完整的類型定義和類型推斷
            </li>
            <li>
              <strong>靈活的 Namespace</strong>：支援多個 namespace
              隔離不同場景的 Modal
            </li>
          </ul>
        </div>

        <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
          <Typography variant="h3">基本使用範例</Typography>
          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                1. 打開 Modal
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`const openModal = useModalController(); // 預設 namespace 為 'app'
const result = await openModal('confirm', {
  title: '確認操作',
  message: '確定要繼續嗎？'
});`}</code>
              </pre>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                2. 監聽並顯示 Modal
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`const { isOpen, payload, close } = useModalSlot('confirm');

return (
  <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
    <DialogContent>
      <DialogTitle>{payload.title}</DialogTitle>
      {/* ... */}
    </DialogContent>
  </Dialog>
);`}</code>
              </pre>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                3. 處理異步操作
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`const { resolveWith, isResolving } = useModalSlot('async');

const handleConfirm = () => {
  resolveWith(async () => {
    const data = await api.save();
    return data;
  });
};

<Button disabled={isResolving} onClick={handleConfirm}>
  {isResolving ? '處理中...' : '確認'}
</Button>`}</code>
              </pre>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <Typography className="mb-2" variant="small">
                4. 嵌套 Modal 與返回
              </Typography>
              <pre className="bg-background overflow-x-auto rounded p-3">
                <code className="font-mono text-xs">{`const result = await openModal('second-layer', {
  title: '確認送出',
  backText: '← 返回'
});

if (result === MODAL_BACK) {
  // 用戶點擊返回，停留在當前層
  return;
}

// 處理確認結果
if (result) {
  close({ success: true });
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <ComponentPreview
        description="使用 Modal Provider 的 Promise-based API，更簡潔地管理 Modal 狀態"
        title="Modal Provider 基本用法"
      >
        <BasicModalProviderDemo />
      </ComponentPreview>

      <ComponentPreview
        description="使用 resolveWith 處理異步操作，在操作完成前 Modal 會保持打開狀態並顯示 loading 狀態"
        title="異步操作 Modal"
      >
        <AsyncModalProviderDemo />
      </ComponentPreview>

      <ComponentPreview
        description="展示如何在 Modal 中打開另一個 Modal，支援多層嵌套和獨立狀態管理"
        title="嵌套 Modal"
      >
        <NestedModalProviderDemo />
      </ComponentPreview>
    </div>
  );
};

export default ModalPage;
