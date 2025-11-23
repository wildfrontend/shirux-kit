import { Button } from '@shirux/rux-ui/components/button';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@shirux/rux-ui/components/popover';
import { Separator } from '@shirux/rux-ui/components/separator';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import { Calendar, Info, Settings, User, X } from 'lucide-react';

import { ComponentPreview } from '@/components/ui/component-preview';

const PopoverPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Popover
      </Typography>
      <Typography color="muted" variant="p">
        彈出元件用於顯示額外的內容或選項，適合用於工具提示、選單或表單等場景。
      </Typography>
    </div>
    <div className="bg-muted/30 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">Props</Typography>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-semibold">Component</th>
              <th className="px-4 py-2 text-left font-semibold">Prop</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Default</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-2 font-mono">Popover</td>
              <td className="px-4 py-2 font-mono">open</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">受控模式下的開關狀態</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">Popover</td>
              <td className="px-4 py-2 font-mono">defaultOpen</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">非受控模式下的初始狀態</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">Popover</td>
              <td className="px-4 py-2 font-mono">onOpenChange</td>
              <td className="px-4 py-2 font-mono text-xs">
                (open: boolean) ={'>'} void
              </td>
              <td className="px-4 py-2 font-mono">-</td>
              <td className="px-4 py-2">開關狀態變化時的回調函數</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">PopoverContent</td>
              <td className="px-4 py-2 font-mono">align</td>
              <td className="px-4 py-2 font-mono text-xs">
                "start" | "center" | "end"
              </td>
              <td className="px-4 py-2 font-mono">"center"</td>
              <td className="px-4 py-2">對齊方式</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">PopoverContent</td>
              <td className="px-4 py-2 font-mono">side</td>
              <td className="px-4 py-2 font-mono text-xs">
                "top" | "right" | "bottom" | "left"
              </td>
              <td className="px-4 py-2 font-mono">"bottom"</td>
              <td className="px-4 py-2">彈出位置</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">PopoverContent</td>
              <td className="px-4 py-2 font-mono">sideOffset</td>
              <td className="px-4 py-2 font-mono text-xs">number</td>
              <td className="px-4 py-2 font-mono">4</td>
              <td className="px-4 py-2">與觸發元素的距離（像素）</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">PopoverAnchor</td>
              <td className="px-4 py-2 font-mono">asChild</td>
              <td className="px-4 py-2 font-mono text-xs">boolean</td>
              <td className="px-4 py-2 font-mono">false</td>
              <td className="px-4 py-2">
                將 Popover 定位到自訂的錨點元素，啟用 asChild 可復用既有節點
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  PopoverArrow,
} from "@shirux/rux-ui/components/popover"
import { Button } from "@shirux/rux-ui/components/button"

// 基本用法
<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>這是彈出內容</p>
  </PopoverContent>
</Popover>

// 帶箭頭
<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <p>帶箭頭的彈出內容</p>
  </PopoverContent>
</Popover>

// 不同位置
<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    <p>從上方彈出</p>
  </PopoverContent>
</Popover>

// 受控模式
const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button>Toggle</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>受控的彈出內容</p>
    <PopoverClose asChild>
      <Button>關閉</Button>
    </PopoverClose>
  </PopoverContent>
</Popover>

// 實際應用 - 使用者資訊卡
<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon">
      <User />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h3 className="font-medium">使用者資訊</h3>
      <p className="text-sm text-muted">
        查看和管理您的帳戶資訊
      </p>
    </div>
  </PopoverContent>
</Popover>

// 進階應用 - Anchor 定位
<Popover>
  <PopoverAnchor asChild>
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">專案報告</h3>
          <p className="text-sm text-muted">Popover 對齊整個卡片</p>
        </div>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            變更
          </Button>
        </PopoverTrigger>
      </div>
    </div>
  </PopoverAnchor>
  <PopoverContent align="end" className="w-64">
    <div className="space-y-2 text-sm">
      <p>Anchor 讓 Popover 依據自訂容器定位，而非觸發按鈕。</p>
      <PopoverClose asChild>
        <Button size="sm">完成</Button>
      </PopoverClose>
    </div>
  </PopoverContent>
</Popover>`}</code>
      </pre>
    </div>
    <ComponentPreview description="基本的 Popover 使用方式" title="基本用法">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">開啟 Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <Typography variant="h4">這是一個 Popover</Typography>
            <Typography color="muted" variant="sm">
              點擊外部或按下 ESC 鍵可以關閉
            </Typography>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
    <ComponentPreview
      description="Popover 可以從不同的方向彈出"
      title="彈出位置"
    >
      <div className="flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Top</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <Typography variant="sm">從上方彈出</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Right</Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <Typography variant="sm">從右側彈出</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <Typography variant="sm">從下方彈出（預設）</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Left</Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <Typography variant="sm">從左側彈出</Typography>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="調整 Popover 內容相對於觸發元素的對齊方式"
      title="對齊方式"
    >
      <div className="flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Start</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Typography variant="sm">起始對齊</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Center</Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <Typography variant="sm">居中對齊（預設）</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">End</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <Typography variant="sm">結束對齊</Typography>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
    <ComponentPreview description="為 Popover 添加箭頭指示器" title="帶箭頭">
      <div className="flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Top Arrow</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <PopoverArrow />
            <Typography variant="sm">帶箭頭的 Popover</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Right Arrow</Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <PopoverArrow />
            <Typography variant="sm">帶箭頭的 Popover</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Bottom Arrow</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <PopoverArrow />
            <Typography variant="sm">帶箭頭的 Popover</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Left Arrow</Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <PopoverArrow />
            <Typography variant="sm">帶箭頭的 Popover</Typography>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="使用 PopoverClose 組件在內容中添加關閉按鈕"
      title="關閉按鈕"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">開啟 Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="h4">通知設定</Typography>
              <Typography color="muted" variant="sm">
                管理您的通知偏好設定
              </Typography>
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <PopoverClose asChild>
                <Button size="sm" variant="outline">
                  取消
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button size="sm">確認</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
    <ComponentPreview description="自訂 Popover 內容的寬度" title="自訂寬度">
      <div className="flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">窄版</Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Typography variant="sm">較窄的內容區域</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">預設寬度</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Typography variant="sm">預設寬度（w-72）</Typography>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">寬版</Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <Typography variant="sm">
              較寬的內容區域，可以容納更多內容
            </Typography>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="實際應用場景：使用者資訊卡"
      title="實際應用 - 使用者資訊"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button radius="circle" size="icon" variant="outline">
            <User />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Typography variant="h4">Claude AI</Typography>
                <Typography color="muted" variant="sm">
                  claude@anthropic.com
                </Typography>
              </div>
              <PopoverClose asChild>
                <Button radius="circle" size="icon" variant="ghost">
                  <X className="size-4" />
                </Button>
              </PopoverClose>
            </div>
            <Separator />
            <div className="space-y-2">
              <Typography color="muted" variant="small">
                帳戶資訊
              </Typography>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Typography variant="sm">訂閱方案</Typography>
                  <Typography color="muted" variant="sm">
                    Pro
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="sm">加入日期</Typography>
                  <Typography color="muted" variant="sm">
                    2024-01-15
                  </Typography>
                </div>
              </div>
            </div>
            <Separator />
            <Button className="w-full" size="sm" variant="outline">
              查看完整資料
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
    <ComponentPreview
      description="實際應用場景：資訊提示"
      title="實際應用 - 資訊提示"
    >
      <div className="flex items-center gap-2">
        <Typography variant="p">了解更多關於此功能</Typography>
        <Popover>
          <PopoverTrigger asChild>
            <Button radius="circle" size="icon" variant="ghost">
              <Info className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <PopoverArrow />
            <div className="space-y-2">
              <Typography variant="h4">功能說明</Typography>
              <Typography color="muted" variant="sm">
                這個功能可以幫助您快速管理和組織您的內容。您可以通過拖放來重新排列項目，或使用快捷鍵來加快操作速度。
              </Typography>
              <Separator />
              <Typography color="muted" variant="small">
                💡 提示：使用 Ctrl + Shift + K 開啟快捷鍵列表
              </Typography>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
    <ComponentPreview
      description="實際應用場景：快速設定面板"
      title="實際應用 - 設定選單"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <Typography variant="h4">快速設定</Typography>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Typography variant="sm">通知</Typography>
                <Button size="sm" variant="outline">
                  開啟
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="sm">深色模式</Typography>
                <Button size="sm" variant="outline">
                  關閉
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="sm">自動儲存</Typography>
                <Button size="sm" variant="outline">
                  開啟
                </Button>
              </div>
            </div>
            <Separator />
            <PopoverClose asChild>
              <Button className="w-full" size="sm" variant="ghost">
                更多設定
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
    <ComponentPreview
      description="實際應用場景：日期選擇器提示"
      title="實際應用 - 日期選擇"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Calendar />
            選擇日期
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <Typography variant="h4">選擇日期</Typography>
            <div className="grid grid-cols-3 gap-2">
              {['今天', '明天', '下週'].map((label) => (
                <PopoverClose asChild key={label}>
                  <Button size="sm" variant="outline">
                    {label}
                  </Button>
                </PopoverClose>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <Typography color="muted" variant="small">
                或選擇特定日期
              </Typography>
              <PopoverClose asChild>
                <Button className="w-full" size="sm" variant="secondary">
                  開啟日曆
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
    <ComponentPreview
      description="使用 PopoverAnchor 讓 Popover 對齊整個卡片或容器，而非僅是觸發按鈕"
      title="進階應用 - Anchor 對齊"
    >
      <Popover>
        <PopoverAnchor asChild>
          <div className="w-full max-w-lg rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Typography variant="h4">產品更新提醒</Typography>
                <Typography color="muted" variant="sm">
                  下一次更新會在今晚 8:00 推出，選擇通知時間吧。
                </Typography>
              </div>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  管理提醒
                </Button>
              </PopoverTrigger>
            </div>
            <div className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
              <Calendar className="size-4" />
              <span>最後更新：今天 09:24</span>
            </div>
          </div>
        </PopoverAnchor>
        <PopoverContent align="end" className="w-72">
          <div className="space-y-3">
            <Typography variant="h4">提醒時間</Typography>
            <div className="space-y-2">
              {['30 分鐘前', '1 小時前', '3 小時前'].map((option) => (
                <PopoverClose asChild key={option}>
                  <Button
                    className="w-full justify-between"
                    size="sm"
                    variant="ghost"
                  >
                    {option}
                    <span className="text-muted-foreground text-xs">推薦</span>
                  </Button>
                </PopoverClose>
              ))}
            </div>
            <Separator />
            <PopoverClose asChild>
              <Button className="w-full" size="sm">
                儲存提醒
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
    <ComponentPreview
      description="依據實際 UI 要求打造品牌化的確認提示樣式"
      title="自訂風格 - 確認提醒"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-full" variant="secondary">
            結束案件
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] rounded-[18px] border-2 border-[#d3d8e1] bg-[#fdf9f5] shadow-[0_12px_40px_rgba(25,33,78,0.18)]">
          <div className="space-y-4 text-center">
            <Typography className="leading-relaxed text-[#1c1a29]" variant="sm">
              如結束此案件即無法重啟，系統將自動發送通知，邀請此案件中所有聯繫過之候選人給予此案件評價。您的優良評價將有助於您的案件優先曝光。
              <br />
              <span className="mt-2 inline-block text-[#c0392b]">
                是否確認結束此案件？
              </span>
            </Typography>
            <div className="flex items-center justify-center gap-3">
              <PopoverClose asChild>
                <Button className="min-w-[88px] rounded-full bg-[#163866] text-white hover:bg-[#163866]/90">
                  YES
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button
                  className="min-w-[72px] rounded-full border border-[#c4cad8] text-[#5e657a]"
                  variant="ghost"
                >
                  No
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentPreview>
  </div>
);

export default PopoverPage;
