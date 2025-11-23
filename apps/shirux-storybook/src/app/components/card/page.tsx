import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shirux/rux-ui/components/card';
import { Button } from '@shirux/rux-ui/components/button';
import { Separator } from '@shirux/rux-ui/components/separator';
import { Switch } from '@shirux/rux-ui/components/switch';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import { Calendar, CheckCircle2, Download } from 'lucide-react';

import { ComponentPreview } from '@/components/ui/component-preview';

const CardPage: RC = () => (
  <div className="mx-auto max-w-5xl space-y-12">
    <div>
      <Typography className="mb-2" variant="h1">
        Card
      </Typography>
      <Typography color="muted" variant="p">
        Card 元件由 shadcn 提供的結構改寫，支援 header、content、footer 以及
        action 區域，可用於顯示資訊卡片、狀態摘要與表單區塊。
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
            {[
              ['Card', 'className', 'string', '-', '調整 Card 容器外觀'],
              ['CardHeader', 'children', 'ReactNode', '-', '標題區塊內容'],
              [
                'CardAction',
                'children',
                'ReactNode',
                '-',
                '對齊於 header 右側的操作',
              ],
              ['CardContent', 'children', 'ReactNode', '-', '主要內容區'],
              ['CardFooter', 'children', 'ReactNode', '-', '附加操作或資訊'],
              ['CardTitle', 'children', 'ReactNode', '-', '卡片標題文字'],
              ['CardDescription', 'children', 'ReactNode', '-', '標題下方描述'],
            ].map(([component, prop, type, defaultValue, description]) => (
              <tr key={`${component}-${prop}`}>
                <td className="px-4 py-2 font-mono">{component}</td>
                <td className="px-4 py-2 font-mono">{prop}</td>
                <td className="px-4 py-2 font-mono text-xs">{type}</td>
                <td className="px-4 py-2 font-mono">{defaultValue}</td>
                <td className="px-4 py-2">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="bg-muted/30 mt-12 space-y-4 rounded-lg border p-6">
      <Typography variant="h3">使用範例</Typography>
      <pre className="overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
        <code>{`import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
} from "@shirux/rux-ui/components/card"

<Card>
  <CardHeader>
    <CardTitle>案件狀態</CardTitle>
    <CardDescription>更新於 10:24</CardDescription>
    <CardAction>
      <Button size="sm" variant="outline">
        設定
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>可以放統計數字、表單或圖表等內容。</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">查看詳細</Button>
  </CardFooter>
</Card>`}</code>
      </pre>
    </div>
    <ComponentPreview description="最基本的卡片排版" title="基本卡片">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>本週進度</CardTitle>
          <CardDescription>同步最近 24 小時的成果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-success size-6" />
            <div>
              <Typography variant="h3">12 項任務完成</Typography>
              <Typography color="muted" variant="small">
                還有 4 項進行中
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">新增任務</Button>
          <Button size="sm" variant="ghost">
            查看全部
          </Button>
        </CardFooter>
      </Card>
    </ComponentPreview>
    <ComponentPreview
      description="利用 CardAction 將操作排在標題右側"
      title="帶操作列的標題"
    >
      <Card className="w-full">
        <CardHeader>
          <div>
            <CardTitle>通知設定</CardTitle>
            <CardDescription>控制是否推播案件更新</CardDescription>
          </div>
          <CardAction>
            <Switch defaultChecked />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <Typography color="muted" variant="small">
            開啟後，團隊會在案件更新立即收到提醒。
          </Typography>
          <Separator />
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span>每日摘要</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>重要變更</span>
              <Switch />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button size="sm" variant="ghost">
            取消
          </Button>
          <Button size="sm">儲存設定</Button>
        </CardFooter>
      </Card>
    </ComponentPreview>
    <ComponentPreview description="多欄卡片展示統計數據" title="統計資訊">
      <div className="grid w-full gap-4 md:grid-cols-3">
        {[
          { title: '上線案件', value: '32', delta: '+8.4%' },
          { title: '待面談', value: '14', delta: '+2' },
          { title: '成功媒合', value: '6', delta: '+1' },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
              <CardTitle>{item.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography color="muted" variant="small">
                相較上週 {item.delta}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </ComponentPreview>
    <ComponentPreview description="放置更完整的流程與分隔線" title="流程檢查">
      <Card>
        <CardHeader>
          <CardTitle>案件流程檢查</CardTitle>
          <CardDescription>更新於 09:40</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: '與客戶同步需求', desc: '完成' },
            { title: '安排候選人面談', desc: '進行中' },
            { title: '回收面談回饋', desc: '排程中' },
          ].map((item) => (
            <div className="space-y-1" key={item.title}>
              <Typography variant="sm">{item.title}</Typography>
              <Typography color="muted" variant="small">
                狀態：{item.desc}
              </Typography>
              <Separator />
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-between">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="size-4" />
            下次更新：明天 10:00
          </div>
          <Button size="sm" variant="outline">
            編輯進度
          </Button>
        </CardFooter>
      </Card>
    </ComponentPreview>
    <ComponentPreview
      description="利用不同背景與按鈕組合呈現公告卡片"
      title="公告樣式"
    >
      <Card className="bg-primary/5 w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>版本 2.11.0 即將上線</CardTitle>
          <CardDescription>共 12 項改動與 bug 修復</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Typography variant="p">
            此次發布包含批次匯出與追蹤改善，建議在今晚 23:00 後部署至正式環境。
          </Typography>
          <Typography color="muted" variant="small">
            完成部署後請回報於 #release 頻道。
          </Typography>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">
            <Download className="mr-1 size-4" />
            下載變更列表
          </Button>
          <Button size="sm" variant="ghost">
            稍後提醒我
          </Button>
        </CardFooter>
      </Card>
    </ComponentPreview>
  </div>
);

export default CardPage;
