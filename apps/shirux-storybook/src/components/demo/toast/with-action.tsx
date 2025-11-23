'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { toast } from '@shirux/rux-ui/components/toast';
import type { RC } from '@shirux/types/react';

export const ActionToastDemo: RC = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast('確認刪除', {
            description: '此操作無法復原',
            action: {
              label: '確認',
              onClick: () => toast.success('已刪除'),
            },
          })
        }
      >
        帶有動作按鈕
      </Button>
      <Button
        onClick={() =>
          toast('更新可用', {
            description: '發現新版本，是否立即更新？',
            action: {
              label: '更新',
              onClick: () => toast.info('開始更新...'),
            },
            cancel: {
              label: '稍後',
              onClick: () => toast('已取消更新'),
            },
          })
        }
        variant="secondary"
      >
        帶有取消按鈕
      </Button>
    </div>
  );
};
