import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@shirux/rux-ui/components/empty';
import { Button } from '@shirux/rux-ui/components/button';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';
import { Inbox, MailWarning, RefreshCcw } from 'lucide-react';

import { ComponentPreview } from '@/components/ui/component-preview';

const EmptyPage: RC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <div>
        <Typography className="mb-2" variant="h1">
          Empty
        </Typography>
        <Typography color="muted" variant="p">
          空狀態展示元件，用於列表、卡片或頁面沒有資料時提供引導與操作。
        </Typography>
      </div>

      <ComponentPreview
        description="最簡單的空狀態，搭配說明文字"
        title="基本空狀態"
      >
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia className="text-primary">
              <Inbox className="size-10" />
            </EmptyMedia>
            <EmptyTitle>目前沒有資料</EmptyTitle>
            <EmptyDescription>
              新增資料或調整篩選條件，即可在此看到結果。
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </ComponentPreview>

      <ComponentPreview
        description="可加入操作按鈕、次要提示與圖示容器樣式"
        title="含操作的空狀態"
      >
        <Empty className="bg-muted/30 border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MailWarning />
            </EmptyMedia>
            <EmptyTitle>找不到符合的郵件</EmptyTitle>
            <EmptyDescription>
              嘗試調整關鍵字或重新整理。也可以建立新的郵件草稿。
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex items-center gap-3">
              <Button variant="secondary">
                <RefreshCcw className="mr-2 size-4" />
                重新整理
              </Button>
              <Button>建立郵件</Button>
            </div>
          </EmptyContent>
        </Empty>
      </ComponentPreview>
    </div>
  );
};

export default EmptyPage;
