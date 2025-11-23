'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { toast } from '@shirux/rux-ui/components/toast';
import type { RC } from '@shirux/types/react';

export const PromiseToastDemo: RC = () => {
  const handlePromise = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('成功') : reject('失敗');
      }, 2000);
    });

    toast.promise(promise, {
      loading: '處理中...',
      success: '操作完成',
      error: '操作失敗',
    });
  };

  return <Button onClick={handlePromise}>Promise Toast</Button>;
};
