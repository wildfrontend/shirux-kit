'use client';

import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';
import {
  BasicUsageDemo,
  ControlledOpenItemsDemo,
  SingleOpenDemo,
} from '@/components/demo/collapsible-menu/basic';

const CollapsibleMenuPage: RC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Collapsible Menu
        </Typography>
        <Typography color="muted" variant="p">
          可折疊選單元件，支援多層次導航結構、展開/收合動畫，以及靈活的狀態控制。適合用於側邊欄導航、多層次選單等場景。
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
                <th className="px-4 py-2 text-left font-semibold">Default</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenu</td>
                <td className="px-4 py-2 font-mono">openItems</td>
                <td className="px-4 py-2 font-mono text-xs">string[]</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">受控模式：當前展開的項目值陣列</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenu</td>
                <td className="px-4 py-2 font-mono">defaultOpenItems</td>
                <td className="px-4 py-2 font-mono text-xs">string[]</td>
                <td className="px-4 py-2">[]</td>
                <td className="px-4 py-2">非受控模式：預設展開的項目值陣列</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenu</td>
                <td className="px-4 py-2 font-mono">onOpenItemsChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (items: string[]) =&gt; void
                </td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">展開項目改變時的回調函數</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenu</td>
                <td className="px-4 py-2 font-mono">multiple</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">true</td>
                <td className="px-4 py-2">
                  是否允許同時展開多個項目。false 時為單選模式
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenuItem</td>
                <td className="px-4 py-2 font-mono">value</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">項目的唯一識別值（必填）</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenuTrigger</td>
                <td className="px-4 py-2 font-mono">asChild</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">
                  是否作為子元件的容器，不渲染額外的按鈕元素
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenuContent</td>
                <td className="px-4 py-2 font-mono">asChild</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">
                  是否作為子元件的容器，不渲染額外的 div 元素
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenuContent</td>
                <td className="px-4 py-2 font-mono">forceMount</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">
                  強制掛載內容，即使未展開也保留在 DOM 中
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenuLink</td>
                <td className="px-4 py-2 font-mono">asChild</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">
                  是否作為子元件的容器，不渲染額外的 a 元素
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">CollapsibleMenuLink</td>
                <td className="px-4 py-2 font-mono">isActive</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">是否為當前活動連結</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">基本使用範例</Typography>
        <div className="bg-muted/50 rounded-lg border p-4">
          <pre className="bg-background overflow-x-auto rounded p-3">
            <code className="font-mono text-xs">{`import {
  CollapsibleMenu,
  CollapsibleMenuContent,
  CollapsibleMenuItem,
  CollapsibleMenuLink,
  CollapsibleMenuList,
  CollapsibleMenuTrigger,
} from '@shirux/rux-ui/components/collapsible-menu';
import { ChevronRight, Home } from 'lucide-react';

<CollapsibleMenu defaultOpenItems={['home']}>
  <CollapsibleMenuList>
    <CollapsibleMenuItem value="home">
      <CollapsibleMenuTrigger>
        <Home className="h-4 w-4" />
        <span className="flex-1">首頁</span>
        <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90" />
      </CollapsibleMenuTrigger>
      <CollapsibleMenuContent>
        <CollapsibleMenuList>
          <li>
            <CollapsibleMenuLink href="#" isActive>
              概覽
            </CollapsibleMenuLink>
          </li>
          <li>
            <CollapsibleMenuLink href="#">
              最近活動
            </CollapsibleMenuLink>
          </li>
        </CollapsibleMenuList>
      </CollapsibleMenuContent>
    </CollapsibleMenuItem>
  </CollapsibleMenuList>
</CollapsibleMenu>`}</code>
          </pre>
        </div>
      </div>

      <ComponentPreview
        description="展示 Collapsible Menu 的基本使用方式，包含多個可展開的選單項目和子連結"
        title="基本用法"
      >
        <BasicUsageDemo />
      </ComponentPreview>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">核心特性</Typography>
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          <li>
            <strong>多層次結構</strong>：支援無限層級的選單嵌套
          </li>
          <li>
            <strong>受控/非受控模式</strong>
            ：可使用 openItems 進行受控，或使用 defaultOpenItems 非受控
          </li>
          <li>
            <strong>單選/多選模式</strong>：透過 multiple 屬性切換
          </li>
          <li>
            <strong>無障礙支援</strong>：完整的 ARIA 屬性和鍵盤導航支援
          </li>
          <li>
            <strong>動畫效果</strong>：流暢的展開/收合動畫
          </li>
          <li>
            <strong>活動狀態</strong>：支援標記當前活動的連結項目
          </li>
        </ul>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用情境</Typography>
        <div className="grid gap-3">
          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-1 font-semibold" variant="small">
              1. 側邊欄導航
            </Typography>
            <Typography className="text-muted-foreground" variant="small">
              在後台管理系統或複雜應用中，作為主要導航選單
            </Typography>
          </div>

          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-1 font-semibold" variant="small">
              2. 文件目錄
            </Typography>
            <Typography className="text-muted-foreground" variant="small">
              展示多層次的文件或資料夾結構
            </Typography>
          </div>

          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-1 font-semibold" variant="small">
              3. 設定選單
            </Typography>
            <Typography className="text-muted-foreground" variant="small">
              組織複雜的設定選項，按類別分組
            </Typography>
          </div>

          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-1 font-semibold" variant="small">
              4. 產品分類
            </Typography>
            <Typography className="text-muted-foreground" variant="small">
              電商網站的產品分類選單
            </Typography>
          </div>
        </div>
      </div>

      <ComponentPreview
        description="使用 defaultOpenItems 控制多個項目預設展開狀態"
        title="控制展開項目"
      >
        <ControlledOpenItemsDemo />
      </ComponentPreview>

      <ComponentPreview
        description="設定 multiple={false} 啟用單選模式，一次只能展開一個項目"
        title="單選模式"
      >
        <SingleOpenDemo />
      </ComponentPreview>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">進階用法</Typography>
        <div className="space-y-3">
          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-2" variant="small">
              受控模式
            </Typography>
            <pre className="bg-background overflow-x-auto rounded p-3">
              <code className="font-mono text-xs">{`const [openItems, setOpenItems] = useState<string[]>(['dashboard']);

<CollapsibleMenu
  openItems={openItems}
  onOpenItemsChange={setOpenItems}
>
  {/* ... */}
</CollapsibleMenu>`}</code>
            </pre>
          </div>

          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-2" variant="small">
              使用 asChild 自訂觸發器
            </Typography>
            <pre className="bg-background overflow-x-auto rounded p-3">
              <code className="font-mono text-xs">{`<CollapsibleMenuTrigger asChild>
  <button className="custom-button">
    自訂按鈕樣式
  </button>
</CollapsibleMenuTrigger>`}</code>
            </pre>
          </div>

          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-2" variant="small">
              與 Next.js Link 整合
            </Typography>
            <pre className="bg-background overflow-x-auto rounded p-3">
              <code className="font-mono text-xs">{`import Link from 'next/link';

<CollapsibleMenuLink asChild>
  <Link href="/dashboard">
    儀表板
  </Link>
</CollapsibleMenuLink>`}</code>
            </pre>
          </div>

          <div className="bg-muted/50 rounded-lg border p-4">
            <Typography className="mb-2" variant="small">
              監聽展開狀態變化
            </Typography>
            <pre className="bg-background overflow-x-auto rounded p-3">
              <code className="font-mono text-xs">{`<CollapsibleMenu
  onOpenItemsChange={(items) => {
    console.log('當前展開的項目:', items);
    // 可以在這裡儲存狀態到 localStorage
    localStorage.setItem('menuState', JSON.stringify(items));
  }}
>
  {/* ... */}
</CollapsibleMenu>`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">無障礙設計</Typography>
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          <li>
            <strong>ARIA 屬性</strong>：自動設定 aria-expanded、aria-controls
            等屬性
          </li>
          <li>
            <strong>鍵盤導航</strong>：支援 Tab、Enter、Space 等鍵盤操作
          </li>
          <li>
            <strong>語義化 HTML</strong>：使用正確的 button、ul、li、a 標籤
          </li>
          <li>
            <strong>焦點管理</strong>
            ：自動處理焦點狀態，確保良好的鍵盤導航體驗
          </li>
        </ul>
      </div>

      <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">Data Attributes</Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Attribute</th>
                <th className="px-4 py-2 text-left font-semibold">Values</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono">data-state</td>
                <td className="px-4 py-2 font-mono">
                  &quot;open&quot; | &quot;closed&quot;
                </td>
                <td className="px-4 py-2">項目的展開/收合狀態</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">data-active</td>
                <td className="px-4 py-2 font-mono">
                  &quot;true&quot; | undefined
                </td>
                <td className="px-4 py-2">連結是否為活動狀態</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">data-slot</td>
                <td className="px-4 py-2 font-mono">string</td>
                <td className="px-4 py-2">元件標識符，用於樣式選擇器</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Typography className="text-muted-foreground text-sm" variant="small">
          可以使用這些 data attributes 來自訂樣式或動畫。例如：使用
          <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
            group-data-[state=open]/collapsible-menu-item:rotate-90
          </code>
          來實現箭頭旋轉動畫。
        </Typography>
      </div>
    </div>
  );
};

export default CollapsibleMenuPage;
