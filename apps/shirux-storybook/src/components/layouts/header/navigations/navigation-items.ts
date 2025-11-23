export type NavigationSubItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavigationItem = {
  title: string;
  href: string;
  items?: NavigationSubItem[];
};

export const navigationItems = [
  {
    title: '設計系統',
    href: '/design',
    items: [
      {
        title: '色彩系統',
        href: '/color-system',
        description: '完整的色彩規範與使用指南',
      },
      {
        title: 'Icons',
        href: '/rux-icons',
        description: 'Rux 圖示庫與使用說明',
      },
    ],
  },
  {
    title: '元件庫',
    href: '/components',
    items: [
      {
        title: 'Accordion',
        href: '/components/accordion',
        description: '可折疊的內容展示元件',
      },
      {
        title: 'Button',
        href: '/components/button',
        description: '按鈕元件，支援多種樣式與尺寸',
      },
      {
        title: 'Empty',
        href: '/components/empty',
        description: '空狀態展示容器，搭配標題、描述與操作',
      },
      {
        title: 'Card',
        href: '/components/card',
        description: '卡片容器元件',
      },
      {
        title: 'Collapsible Menu',
        href: '/components/collapsible-menu',
        description: '可折疊選單元件',
      },
      {
        title: 'Dropdown Menu',
        href: '/components/dropdown-menu',
        description: '下拉選單元件',
      },
      {
        title: 'Navigation Menu',
        href: '/components/navigation',
        description: '導覽選單元件，支援下拉內容',
      },
      {
        title: 'Input',
        href: '/components/input',
        description: '輸入框元件',
      },
      {
        title: 'Input OTP',
        href: '/components/input-otp',
        description: '一次性密碼輸入元件',
      },
      {
        title: 'Modal',
        href: '/components/modal',
        description: '彈出視窗元件',
      },
      {
        title: 'Phone Input',
        href: '/components/phone-input',
        description: '電話號碼輸入元件',
      },
      {
        title: 'Popover',
        href: '/components/popover',
        description: '彈出提示元件',
      },
      {
        title: 'Scroll Area',
        href: '/components/scroll-area',
        description: '自訂捲軸區域元件',
      },
      {
        title: 'Select',
        href: '/components/select',
        description: '選擇器元件',
      },
      {
        title: 'Separator',
        href: '/components/separator',
        description: '分隔線元件',
      },
      {
        title: 'Toast',
        href: '/components/toast',
        description: 'Toast 通知元件，用於顯示臨時訊息',
      },
      {
        title: 'Stack',
        href: '/components/stack',
        description: '堆疊佈局元件',
      },
      {
        title: 'Typography',
        href: '/components/typography',
        description: '排版文字元件',
      },
    ],
  },
];
