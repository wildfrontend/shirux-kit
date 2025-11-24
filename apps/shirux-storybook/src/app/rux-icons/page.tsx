import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import { IconBookmarks } from '@shirux/rux-icons/fill';
import { ShiruxLogo } from '@shirux/rux-icons/logo';
import {
  IconMessageOutline,
  IconShortcutOutline,
} from '@shirux/rux-icons/outline';
import { IconSupportTwoTone } from '@shirux/rux-icons/two-tone';
import { Heart } from '@shirux/rux-icons/lucide';

import { ComponentPreview } from '@/components/ui/component-preview';

const iconList: { name: string; component: JSX.Element }[] = [
  { name: 'IconBookmarks', component: <IconBookmarks className="size-8" /> },
];

const outlineIconList: { name: string; component: JSX.Element }[] = [
  {
    name: 'IconMessageOutline',
    component: <IconMessageOutline className="text-primary size-8" />,
  },
  {
    name: 'IconShortcutOutline',
    component: <IconShortcutOutline className="text-accent size-8" />,
  },
];

const IconsPage: RC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Icons
        </Typography>
        <Typography color="muted" variant="p">
          專案內建的 SVG 圖示元件集，支援自定義尺寸和顏色。
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
                <td className="px-4 py-2 font-mono">width</td>
                <td className="px-4 py-2 font-mono text-xs">number | string</td>
                <td className="px-4 py-2 font-mono">24</td>
                <td className="px-4 py-2">圖示的寬度</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">height</td>
                <td className="px-4 py-2 font-mono text-xs">number | string</td>
                <td className="px-4 py-2 font-mono">24</td>
                <td className="px-4 py-2">圖示的高度</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">color</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">currentColor</td>
                <td className="px-4 py-2">圖示的顏色（支援 CSS 顏色值）</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono">-</td>
                <td className="px-4 py-2">自定義 CSS class</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
        <Typography variant="h3">使用範例</Typography>
        <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
          <code>{`import { IconHome } from "@shirux/rux-icons/fill"
import { IconMessageOutline } from "@shirux/rux-icons/outline"
import { Heart } from "@shirux/rux-icons/lucide"

// 基本用法（預設 24x24，outline 樣式）
<Heart />

// 填滿樣式（fill + stroke 同色）
<Heart className="fill-primary stroke-primary" />

// 自定義尺寸
<IconHome width={32} height={32} />

// 使用 className 控制尺寸和顏色（outline）
<IconMessageOutline className="size-6 text-blue-500" />

// 自定義顏色（填滿樣式）
<Heart className="size-6 fill-red-500 stroke-red-500" />
<IconHome className="text-primary" />`}</code>
        </pre>
      </div>

      <ComponentPreview
        description="品牌 Logo 為固定色彩，僅調整尺寸"
        title="Logo"
      >
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <ShiruxLogo className="h-6 w-auto" />
            <span className="text-muted-foreground text-xs">24px 高</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShiruxLogo className="h-8 w-auto" />
            <span className="text-muted-foreground text-xs">32px 高</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShiruxLogo className="h-10 w-auto" />
            <span className="text-muted-foreground text-xs">40px 高</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        description="雙色圖示，主色支援 Tailwind 文本色，副色可用 secondaryColor 傳入（建議使用 Tailwind 顏色變數）"
        title="Two-tone Icons"
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <IconSupportTwoTone
              className="size-10"
              primaryColor="var(--primary)"
              secondaryColor="var(--accent)"
            />
            <span className="text-muted-foreground text-center text-xs">
              以 CSS 變數指定主/副色（與 Tailwind 主題一致）
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <IconSupportTwoTone
              className="size-10"
              primaryColor="var(--accent"
              secondaryColor="var(--primary)"
            />
            <span className="text-muted-foreground text-center text-xs">
              副色以 secondaryColor 傳入（可用 Tailwind 顏色變數）
            </span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview description="Outline 風格圖示" title="Outline Icons">
        <div className="grid w-full grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
          {outlineIconList.map(({ name, component }) => (
            <div
              className="hover:bg-muted/50 flex flex-col items-center justify-center gap-2 rounded-lg border p-4"
              key={name}
            >
              {component}
              <span className="text-muted-foreground text-center text-xs">
                {name.replace('Icon', '')}
              </span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview description="所有可用的圖示元件清單" title="圖示集合">
        <div className="grid w-full grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
          {iconList.map(({ name, component }) => (
            <div
              className="hover:bg-muted/50 flex flex-col items-center justify-center gap-2 rounded-lg border p-4"
              key={name}
            >
              {component}
              <span className="text-muted-foreground text-center text-xs">
                {name.replace('Icon', '')}
              </span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview description="不同尺寸的圖示展示" title="尺寸變化">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Heart className="fill-primary stroke-primary size-4" />
            <span className="text-muted-foreground text-xs">16px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="fill-primary stroke-primary size-6" />
            <span className="text-muted-foreground text-xs">24px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="fill-primary stroke-primary size-8" />
            <span className="text-muted-foreground text-xs">32px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="fill-primary stroke-primary size-12" />
            <span className="text-muted-foreground text-xs">48px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="fill-primary stroke-primary size-16" />
            <span className="text-muted-foreground text-xs">64px</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview description="圖示配合文字顏色系統" title="顏色變化">
        <div className="flex flex-wrap gap-6">
          <div className="bg-muted flex flex-col items-center gap-2">
            <IconMessageOutline className="text-secondary size-8" />
            <span className="text-muted-foreground text-xs">Secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="fill-accent stroke-accent size-8" />
            <span className="text-muted-foreground text-xs">Accent</span>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default IconsPage;
