'use client';

import { Button } from '@shirux/rux-ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shirux/rux-ui/components/dialog';
import {
  useModalController,
  useModalSlot,
} from '@shirux/rux-ui/components/modal-provider';

interface AsyncModalPayload {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

// 模擬異步操作（例如 API 請求）
const simulateApiCall = async (delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: '操作成功！' });
    }, delay);
  });
};

const AsyncModal = () => {
  const { isOpen, payload, close, resolveWith, isResolving } =
    useModalSlot<AsyncModalPayload>('async');
  const { title, description, confirmText, cancelText } = payload;

  const handleConfirm = () => {
    resolveWith(async () => {
      // 執行異步操作
      const result = await simulateApiCall();
      return result;
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && !isResolving) {
          close(false);
        }
      }}
      open={isOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="text-primary py-4">
          <p>
            使用 resolveWith 處理異步操作，在操作完成前 modal
            會保持打開狀態並顯示 loading 狀態。
          </p>
        </div>
        <DialogFooter>
          <Button
            disabled={isResolving}
            onClick={() => close(false)}
            variant="outline"
          >
            {cancelText}
          </Button>
          <Button disabled={isResolving} onClick={handleConfirm}>
            {isResolving ? '處理中...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const AsyncModalProviderDemo = () => {
  const openModal = useModalController('app');

  const handleOpenModal = async () => {
    const result = await openModal<AsyncModalPayload>('async', {
      title: '異步操作確認',
      description: '點擊確認後將執行異步操作（模擬 2 秒 API 請求）',
      confirmText: '確認',
      cancelText: '取消',
    });

    if (result) {
      console.log('異步操作結果:', result);
      alert(`操作完成！結果: ${JSON.stringify(result)}`);
    } else {
      console.log('用戶取消操作');
    }
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleOpenModal}>打開異步 Modal</Button>
      <AsyncModal />
    </div>
  );
};
