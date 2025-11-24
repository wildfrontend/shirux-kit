'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { toast } from '@shirux/rux-ui/components/toast';
import type { RC } from '@shirux/types/react';

export const BasicToastDemo: RC = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast('活動通知', {
            description: '你的活動已成功建立',
          })
        }
      >
        顯示 Toast
      </Button>
      <Button
        onClick={() =>
          toast.success('操作成功', {
            description: '資料已成功儲存',
          })
        }
        variant="secondary"
      >
        成功訊息
      </Button>
      <Button
        onClick={() =>
          toast.error('發生錯誤', {
            description: '無法完成此操作，請稍後再試',
          })
        }
        variant="destructive"
      >
        錯誤訊息
      </Button>
      <Button
        color="accent"
        onClick={() =>
          toast.info('系統提示', {
            description: '請注意系統維護時間',
          })
        }
        variant="outline"
      >
        提示訊息
      </Button>
      <Button
        onClick={() =>
          toast.warning('注意事項', {
            description: '此操作可能會影響其他資料',
          })
        }
        variant="outline"
      >
        警告訊息
      </Button>
    </div>
  );
};
