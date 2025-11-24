'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { toast } from '@shirux/rux-ui/components/toast';
import type { RC } from '@shirux/types/react';
import { Mail, Download, Upload } from 'lucide-react';

export const CustomToastDemo: RC = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast('新郵件', {
            description: '你有 3 封未讀郵件',
            icon: <Mail className="size-5" />,
            duration: 5000,
          })
        }
      >
        自訂圖示
      </Button>
      <Button
        onClick={() =>
          toast('下載完成', {
            description: 'document.pdf',
            icon: <Download className="size-5" />,
            duration: 3000,
          })
        }
        variant="secondary"
      >
        下載通知
      </Button>
      <Button
        onClick={() =>
          toast('上傳中', {
            description: '正在上傳檔案...',
            icon: <Upload className="size-5" />,
            duration: Infinity,
          })
        }
        variant="outline"
      >
        持續顯示
      </Button>
    </div>
  );
};
