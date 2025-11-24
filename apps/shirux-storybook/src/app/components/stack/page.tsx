import { Button } from '@shirux/rux-ui/components/button';
import { Separator } from '@shirux/rux-ui/components/separator';
import { Stack } from '@shirux/rux-ui/components/stack';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@shirux/rux-ui/components/navigation-menu';

import { ComponentPreview } from '@/components/ui/component-preview';

const StackPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Stack
      </Typography>
      <Typography color="muted" variant="p">
        類似 MUI Stack 的排版容器，可快速定義 flex 方向、分隔線與包裹元素，
        方便建立按鈕群組、導覽列或卡片間距。間距請直接透過 className 指定
        Tailwind gap 工具類，例如 <code>gap-4</code> 或 <code>lg:gap-6</code>
        ；分隔線 與元素之間的距離則透過 <code>dividerClassName</code> 或是修改
        divider 本身的 class 控制。
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
              <td className="px-4 py-2 font-mono">direction</td>
              <td className="px-4 py-2 font-mono text-xs">
                &quot;row&quot; | &quot;column&quot;
              </td>
              <td className="px-4 py-2 font-mono">&quot;column&quot;</td>
              <td className="px-4 py-2">
                排列方向，依需求在水平或垂直之間切換。
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">divider</td>
              <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">
                插入在項目之間的分隔元素，常搭配 Separator 使用。
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">dividerClassName</td>
              <td className="px-4 py-2 font-mono text-xs">string</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">
                自訂分隔線 wrapper 的樣式，可在此加入 mx/my 來控制間距。
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">align</td>
              <td className="px-4 py-2 font-mono text-xs">
                &quot;start&quot; | &quot;center&quot; | &quot;end&quot; |
                &quot;stretch&quot; | &quot;baseline&quot;
              </td>
              <td className="px-4 py-2 font-mono">&quot;stretch&quot;</td>
              <td className="px-4 py-2">對應 flex 的 align-items 設定。</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">justify</td>
              <td className="px-4 py-2 font-mono text-xs">
                &quot;start&quot; | &quot;center&quot; | &quot;end&quot; |
                &quot;between&quot; | &quot;around&quot; | &quot;evenly&quot;
              </td>
              <td className="px-4 py-2 font-mono">&quot;start&quot;</td>
              <td className="px-4 py-2">對應 flex 的 justify-content 設定。</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">wrap</td>
              <td className="px-4 py-2 font-mono text-xs">
                &quot;wrap&quot; | &quot;nowrap&quot; | &quot;wrap-reverse&quot;
              </td>
              <td className="px-4 py-2 font-mono">&quot;wrap&quot;</td>
              <td className="px-4 py-2">
                控制 flex-wrap 行為，方便建立自適應導覽群組。
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">inline</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">切換成 inline-flex 以適應文字流。</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">fullWidth</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">快速讓 Stack 佔滿容器寬度。</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">as / asChild</td>
              <td className="px-4 py-2 font-mono text-xs">
                keyof JSX.IntrinsicElements / boolean
              </td>
              <td className="px-4 py-2 font-mono">div / false</td>
              <td className="px-4 py-2">
                以自訂元素或 Radix Slot 包覆 Stack，例如
                nav、form、ButtonGroup。 使用 asChild
                時請保持僅有單一子元素；若搭配 divider，系統會直接在該元素的
                children 之間插入分隔線，請確保目標元件允許額外節點。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import { Stack } from "@shirux/rux-ui/components/stack";
import { Button } from "@shirux/rux-ui/components/button";
import { Separator } from "@shirux/rux-ui/components/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@shirux/rux-ui/components/navigation-menu";

// 垂直排列
<Stack className="gap-4">
  <Button variant="secondary">建立專案</Button>
  <Button variant="outline">複製</Button>
</Stack>

// 水平排列 + wrap
<Stack as="nav" className="gap-2" direction="row" wrap="wrap">
  <Button variant="ghost">總覽</Button>
  <Button variant="ghost">報表</Button>
  <Button variant="ghost">設定</Button>
</Stack>

// Divider
<Stack
  className="gap-2"
  direction="row"
  divider={<span className="h-4 w-px rounded-full bg-border dark:bg-border/80" />}
  dividerClassName="mx-3 justify-center"
>
  <Button variant="ghost">Today</Button>
  <Button variant="ghost">Week</Button>
  <Button variant="ghost">Month</Button>
</Stack>

// asChild 套用到 Navigation Menu
<NavigationMenu>
  <Stack
    asChild
    className="!space-x-0 gap-2 rounded-full bg-muted/40 px-2 py-1"
    direction="row"
  >
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink active href="#">
          Overview
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#">Analytics</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#">Automations</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </Stack>
</NavigationMenu>`}</code>
      </pre>
    </div>

    <ComponentPreview
      className="flex-col items-stretch gap-6 text-left"
      description="預設 flex-col 排列，適合設定區塊或控制組。"
      title="基本間距"
    >
      <Stack className="w-full max-w-md gap-3">
        <Button variant="secondary">建立專案</Button>
        <Button variant="outline">複製現有</Button>
        <Button variant="ghost">查看範本</Button>
      </Stack>
    </ComponentPreview>

    <ComponentPreview
      className="flex-col items-stretch gap-6 text-left"
      description="使用 as 將 Stack 渲染成語意化的 nav 容器。"
      title="語意元素（as）"
    >
      <Stack
        as="nav"
        className="border-border w-full gap-3 rounded-full border px-4 py-3 md:flex-row md:items-center md:justify-between"
        direction="column"
      >
        <div>
          <Typography className="text-sm font-medium" variant="sm">
            Project sections
          </Typography>
          <Typography color="muted" variant="xs">
            自訂元素也能保留 Stack 的間距與對齊控制
          </Typography>
        </div>
        <Stack className="gap-2" direction="row">
          <Button variant="ghost">Overview</Button>
          <Button variant="ghost">Activity</Button>
          <Button variant="ghost">Team</Button>
        </Stack>
      </Stack>
    </ComponentPreview>

    <ComponentPreview
      className="flex-col items-stretch gap-6 text-left"
      description="使用 as 與 wrap 建立可換行的導覽或工具列。"
      title="水平導覽"
    >
      <Stack
        as="nav"
        className="w-full gap-2"
        direction="row"
        justify="start"
        wrap="wrap"
      >
        <Button radius="pill" variant="ghost">
          Overview
        </Button>
        <Button radius="pill" variant="ghost">
          Tasks
        </Button>
        <Button radius="pill" variant="ghost">
          Files
        </Button>
        <Button radius="pill" variant="ghost">
          Analytics
        </Button>
      </Stack>
    </ComponentPreview>

    <ComponentPreview
      className="flex-col items-stretch gap-6 text-left"
      description="Divider 可套用在按鈕群組或分段控制，也能改成自訂長度並置中對齊。"
      title="搭配 Divider"
    >
      <Stack
        align="center"
        className="w-full gap-3"
        direction="row"
        divider={
          <span className="bg-border dark:bg-border/80 h-4 w-px rounded-full" />
        }
        dividerClassName="mx-4 justify-center"
        justify="start"
      >
        <Button variant="ghost">Today</Button>
        <Button variant="ghost">Week</Button>
        <Button variant="ghost">Month</Button>
      </Stack>
    </ComponentPreview>

    <ComponentPreview
      className="flex-col items-stretch gap-6 text-left"
      description="asChild 讓 Stack 的間距與分佈套用到現有的 Navigation Menu 元件。"
      title="整合 Navigation Menu（asChild）"
    >
      <NavigationMenu className="w-full justify-start">
        <Stack
          asChild
          direction="row"
          divider={<Separator orientation="vertical" />}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink active href="#">
                Overview
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Analytics</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Automations</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Settings</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </Stack>
      </NavigationMenu>
    </ComponentPreview>
  </div>
);

export default StackPage;
