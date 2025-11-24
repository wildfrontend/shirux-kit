'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { toast } from '@shirux/rux-ui/components/toast';
import type { RC } from '@shirux/types/react';
import { useState } from 'react';

export const ServerActionToastDemo: RC = () => {
  const [loading, setLoading] = useState(false);

  // 模擬 Server Action
  const handleServerAction = async () => {
    setLoading(true);

    try {
      // 模擬 API 呼叫
      const response = await fetch('/api/example', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'example' }),
      });

      if (!response.ok) {
        throw new Error('API 請求失敗');
      }

      const data = await response.json();

      // Server 成功後觸發 client toast
      toast.success('操作成功', {
        description: `資料已儲存: ${data.message || '完成'}`,
      });
    } catch (error) {
      // Server 錯誤時觸發 client toast
      toast.error('操作失敗', {
        description: error instanceof Error ? error.message : '請稍後再試',
      });
    } finally {
      setLoading(false);
    }
  };

  // 使用 toast.promise 的方式
  const handleServerActionWithPromise = () => {
    const promise = fetch('/api/example', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'example' }),
    }).then((res) => {
      if (!res.ok) throw new Error('請求失敗');
      return res.json();
    });

    toast.promise(promise, {
      loading: '處理中...',
      success: (data) => `操作成功: ${data.message || '完成'}`,
      error: (err) => `錯誤: ${err.message}`,
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled={loading} onClick={handleServerAction}>
        {loading ? '處理中...' : 'Server Action (手動處理)'}
      </Button>
      <Button onClick={handleServerActionWithPromise} variant="secondary">
        Server Action (Promise)
      </Button>
    </div>
  );
};
