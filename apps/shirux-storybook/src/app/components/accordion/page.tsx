import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@shirux/rux-ui/components/accordion';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { ReactNode } from 'react';
import type { RC } from '@shirux/types/react';

import { ComponentPreview } from '@/components/ui/component-preview';

type DemoItem = {
  value: string;
  trigger: string;
  content: ReactNode;
  description?: string;
};

const singleModeItems: DemoItem[] = [
  {
    value: 'item-1',
    trigger: '什麼是手風琴元件？',
    content: (
      <p className="leading-relaxed">
        手風琴元件是一個垂直堆疊的互動式標題集合，每個標題都可以展開或收合相關的內容區塊。這種設計模式可以有效地組織大量資訊，讓使用者專注於他們感興趣的部分。
      </p>
    ),
  },
  {
    value: 'item-2',
    trigger: '何時使用手風琴？',
    content: (
      <p className="leading-relaxed">
        手風琴元件適合用於常見問題（FAQ）、產品功能說明、使用者設定選項、或任何需要組織多個相關內容區塊的場景。它可以幫助節省頁面空間，同時保持內容的可訪問性。
      </p>
    ),
  },
  {
    value: 'item-3',
    trigger: '支援哪些功能？',
    content: (
      <ul className="list-disc space-y-2 pl-4">
        <li>單一或多重展開模式</li>
        <li>平滑的動畫過渡效果</li>
        <li>鍵盤導航支援</li>
        <li>完全可自訂樣式</li>
        <li>無障礙支援（ARIA 屬性）</li>
      </ul>
    ),
  },
];

const profileAccordionItems: DemoItem[] = [
  {
    value: 'profile',
    trigger: '基本資訊',
    content: (
      <div className="space-y-2">
        <p>
          <strong>姓名：</strong>王小明
        </p>
        <p>
          <strong>年齡：</strong>28 歲
        </p>
        <p>
          <strong>職業：</strong>前端工程師
        </p>
      </div>
    ),
  },
  {
    value: 'contact',
    trigger: '聯絡方式',
    content: (
      <div className="space-y-2">
        <p>
          <strong>Email：</strong>example@example.com
        </p>
        <p>
          <strong>電話：</strong>0912-345-678
        </p>
        <p>
          <strong>地址：</strong>台北市信義區
        </p>
      </div>
    ),
  },
  {
    value: 'skills',
    trigger: '專業技能',
    content: (
      <ul className="list-disc space-y-1 pl-4">
        <li>React / Next.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Node.js</li>
      </ul>
    ),
  },
];

const faqItems: DemoItem[] = [
  {
    value: 'faq-1',
    trigger: '如何註冊帳號？',
    content: (
      <p className="leading-relaxed">
        點擊右上角的「註冊」按鈕，填寫必要資訊（電子郵件、密碼、姓名）後，系統會發送驗證信到您的信箱。請點擊信中的連結完成驗證即可開始使用。
      </p>
    ),
  },
  {
    value: 'faq-2',
    trigger: '忘記密碼怎麼辦？',
    content: (
      <p className="leading-relaxed">
        在登入頁面點擊「忘記密碼」連結，輸入您的註冊信箱，系統會發送重設密碼的連結到您的信箱。請在
        24 小時內點擊連結並設定新密碼。
      </p>
    ),
  },
  {
    value: 'faq-3',
    trigger: '如何聯絡客服？',
    content: (
      <div className="space-y-2">
        <p>您可以透過以下方式聯絡我們的客服團隊：</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>客服信箱：support@example.com</li>
          <li>客服專線：0800-123-456（週一至週五 9:00-18:00）</li>
          <li>線上客服：點擊右下角的對話圖示</li>
        </ul>
      </div>
    ),
  },
  {
    value: 'faq-4',
    trigger: '支援哪些付款方式？',
    content: (
      <p className="leading-relaxed">
        我們支援以下付款方式：信用卡（Visa、Mastercard、JCB）、ATM
        轉帳、超商代碼繳費、電子支付（LINE Pay、Apple Pay、Google
        Pay）。所有交易都採用 SSL 加密，確保您的付款安全。
      </p>
    ),
  },
];

const settingsItems: DemoItem[] = [
  {
    value: 'appearance',
    trigger: '外觀設定',
    description: '調整層級與間距，打造符合品牌的呈現方式',
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          預設樣式基於 Tailwind CSS，可透過 `className` 或 `data-slot`
          自訂細節。配合 `border`、`rounded` 和 `bg-muted`
          類別即可快速建立不同層級感。
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>調整 `AccordionItem` 的 `className` 以控制邊框和背景</li>
          <li>使用 `AccordionTrigger` 的 `className` 控制對齊與圖示</li>
          <li>在 `AccordionContent` 傳入額外間距或排版設定</li>
        </ul>
      </div>
    ),
  },
  {
    value: 'notifications',
    trigger: '通知偏好',
    description: '示範在內容中放入次要區塊與對齊控制',
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          Accordion 內容區塊支援任何 React
          節點，可放入表單控制項、提示訊息或次要排版。搭配 flex/grid
          可以打造設定面板的體驗。
        </p>
        <div className="rounded-md border border-dashed p-3">
          <p className="font-medium">常見組合</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>checkbox 列表用於通知或權限管理</li>
            <li>分段的說明文字搭配 CTA 按鈕</li>
            <li>巢狀 Accordion 以呈現更多層級</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    value: 'security',
    trigger: '安全設定',
    description: '搭配 `defaultValue` 讓重要資訊預設展開',
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          透過 `defaultValue`（single 模式）或 `defaultValue` 陣列（multiple
          模式）設定預設展開的項目，適合將常用或需要提醒使用者的資訊放在最上方。
        </p>
        <p>也可以搭配 `collapsible` 讓使用者自由收合所有內容，增加互動彈性。</p>
      </div>
    ),
  },
];

const AccordionPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Accordion
      </Typography>
      <Typography color="muted" variant="p">
        手風琴元件用於顯示可折疊的內容區塊，適用於 FAQ、選單或分組內容。
      </Typography>
    </div>

    <section
      className="bg-muted/30 scroll-m-24 space-y-4 rounded-lg border p-6"
      id="props"
    >
      <Typography variant="h3">Props</Typography>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-semibold">Component</th>
              <th className="px-4 py-2 text-left font-semibold">Prop</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-2 font-mono">Accordion</td>
              <td className="px-4 py-2 font-mono">type</td>
              <td className="px-4 py-2 font-mono text-xs">
                "single" | "multiple"
              </td>
              <td className="px-4 py-2">是否允許同時展開多個項目</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">Accordion</td>
              <td className="px-4 py-2 font-mono">collapsible</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2">
                是否允許收合所有項目（僅適用於 type="single"）
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">Accordion</td>
              <td className="px-4 py-2 font-mono">defaultValue</td>
              <td className="px-4 py-2 font-mono text-xs">string | string[]</td>
              <td className="px-4 py-2">
                預設展開的項目值，依照 type 控制傳入字串或字串陣列
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">AccordionItem</td>
              <td className="px-4 py-2 font-mono">value</td>
              <td className="px-4 py-2 font-mono text-xs">string</td>
              <td className="px-4 py-2">唯一識別碼</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">AccordionTrigger</td>
              <td className="px-4 py-2 font-mono">children</td>
              <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
              <td className="px-4 py-2">觸發按鈕的內容，支援複合排版</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">AccordionContent</td>
              <td className="px-4 py-2 font-mono">children</td>
              <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
              <td className="px-4 py-2">可折疊的內容，接受任意 React 元素</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section
      className="bg-muted/30 mt-12 scroll-m-24 space-y-4 rounded-lg border p-6"
      id="usage"
    >
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shirux/rux-ui/components/accordion"

// 單一展開（一次只能展開一個），並允許全部收合
<Accordion type="single" defaultValue="item-1" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>什麼是手風琴元件？</AccordionTrigger>
    <AccordionContent>
      手風琴元件是一個垂直堆疊的互動式標題集合，每個標題都可以展開或收合相關的內容區塊。
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>何時使用手風琴？</AccordionTrigger>
    <AccordionContent>
      適合用於 FAQ、設定面板或其他需要組織大量資訊的場景。
    </AccordionContent>
  </AccordionItem>
</Accordion>

// 多重展開（可以同時展開多個）
<Accordion type="multiple" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>項目 1</AccordionTrigger>
    <AccordionContent>內容 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>項目 2</AccordionTrigger>
    <AccordionContent>內容 2</AccordionContent>
  </AccordionItem>
</Accordion>

// 自訂樣式與描述
<Accordion type="single" defaultValue="appearance">
  <AccordionItem
    className="mb-3 last:mb-0 border-b-0 rounded-lg border border-border/60 bg-muted/40 px-4"
    value="appearance"
  >
    <AccordionTrigger className="items-start text-left">
      <div className="flex flex-col text-left">
        <span>外觀設定</span>
        <span className="text-muted-foreground text-xs font-normal">
          調整標題排版與間距
        </span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="text-sm leading-relaxed">
      將樣式傳入 AccordionItem、AccordionTrigger 或 AccordionContent，即可依需求客製外觀。
    </AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
      </pre>
    </section>

    <section className="scroll-m-24" id="single-mode">
      <ComponentPreview
        description="一次只能展開一個項目，點擊其他項目會自動收合當前項目"
        title="單一展開模式"
      >
        <div className="w-full max-w-2xl">
          <Accordion collapsible defaultValue="item-1" type="single">
            {singleModeItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ComponentPreview>
    </section>

    <section className="scroll-m-24" id="multiple-mode">
      <ComponentPreview
        description="可以同時展開多個項目，適合需要比較或同時查看多個內容的場景"
        title="多重展開模式"
      >
        <div className="w-full max-w-2xl">
          <Accordion type="multiple">
            {profileAccordionItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ComponentPreview>
    </section>

    <section className="scroll-m-24" id="advanced">
      <ComponentPreview
        description="透過自訂 className 與 defaultValue 打造設定面板式的操作體驗"
        title="自訂樣式與進階用法"
      >
        <div className="w-full max-w-3xl">
          <Accordion defaultValue="appearance" type="single">
            {settingsItems.map((item) => (
              <AccordionItem
                className="border-border/60 bg-background/90 mb-3 rounded-lg border border-b-0 px-4 shadow-sm last:mb-0"
                key={item.value}
                value={item.value}
              >
                <AccordionTrigger className="items-start gap-3 py-3 text-left">
                  <div className="flex min-w-0 flex-col text-left">
                    <span className="text-sm font-medium">{item.trigger}</span>
                    {item.description && (
                      <Typography
                        className="text-muted-foreground"
                        variant="xs"
                      >
                        {item.description}
                      </Typography>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ComponentPreview>
    </section>

    <section className="scroll-m-24" id="faq">
      <ComponentPreview
        description="適合用於常見問題頁面，讓使用者快速找到答案"
        title="FAQ 範例"
      >
        <div className="w-full max-w-2xl">
          <Accordion collapsible type="single">
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ComponentPreview>
    </section>
  </div>
);

export default AccordionPage;
