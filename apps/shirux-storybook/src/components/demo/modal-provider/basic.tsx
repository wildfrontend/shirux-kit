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

interface BasicModalPayload {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

const BasicModal = () => {
  const { isOpen, payload, close } = useModalSlot<BasicModalPayload>('basic');
  const { title, description, confirmText, cancelText } = payload;

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
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
            Modal
            元件適合用於需要使用者關注的重要訊息、確認操作或表單輸入等場景。
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => close(false)} variant="outline">
            {cancelText}
          </Button>
          <Button onClick={() => close(true)}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const BasicModalProviderDemo = () => {
  const openModal = useModalController('app');

  const handleOpenModal = async () => {
    const result = await openModal<BasicModalPayload, boolean>('basic', {
      title: '確認操作',
      description: '您確定要執行此操作嗎？',
      confirmText: '確認',
      cancelText: '取消',
    });

    console.log('Modal result:', result);
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleOpenModal}>打開 Modal</Button>
      <BasicModal />
    </div>
  );
};
