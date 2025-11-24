'use client';

import { useState } from 'react';
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
  MODAL_BACK,
  useModalController,
  useModalSlot,
} from '@shirux/rux-ui/components/modal-provider';

interface FormData {
  name: string;
  email: string;
}

interface ConfirmModalPayload {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  backText?: string;
  formData?: FormData;
}

interface FormModalPayload {
  title: string;
  description: string;
}

// 確認 Modal（第二層）
const ConfirmModal = () => {
  const { isOpen, payload, close } =
    useModalSlot<ConfirmModalPayload>('confirm');
  const { title, description, confirmText, cancelText, backText, formData } =
    payload;

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
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground text-sm">
            這是第二層 Modal，可以點擊「返回」回到上一層，或點擊「確認」關閉所有
            Modal。
          </p>
          {formData && (
            <div className="bg-muted/50 rounded-lg border p-4">
              <p className="mb-2 text-sm font-semibold">確認以下資訊：</p>
              <div className="space-y-1 text-sm">
                <div className="flex gap-2">
                  <span className="text-muted-foreground">姓名：</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Email：</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            {backText && (
              <Button onClick={() => close(MODAL_BACK)} variant="ghost">
                {backText}
              </Button>
            )}
            <div className="flex gap-2">
              <Button onClick={() => close(false)} variant="outline">
                {cancelText}
              </Button>
              <Button onClick={() => close(true)}>{confirmText}</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// 表單 Modal（第一層）
const FormModal = () => {
  const { isOpen, payload, close } = useModalSlot<FormModalPayload>('form');
  const { title, description } = payload;
  const openModal = useModalController('app');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });

  const handleSubmit = async () => {
    // 打開第二層確認 Modal，傳遞表單數據
    const confirmed = await openModal<ConfirmModalPayload, boolean | symbol>(
      'confirm',
      {
        title: '確認送出',
        description: '請確認以下資訊是否正確',
        confirmText: '確認送出',
        cancelText: '取消',
        backText: '← 返回',
        formData,
      }
    );

    // 如果返回 MODAL_BACK，不做任何處理（保持在表單 Modal）
    if (confirmed === MODAL_BACK) {
      return;
    }

    if (confirmed) {
      // 確認後關閉表單 Modal
      close({ submitted: true, data: formData });
    }
  };

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
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium">姓名</label>
            <input
              className="border-input bg-background mt-1 w-full rounded-md border px-3 py-2 text-sm"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="請輸入姓名"
              type="text"
              value={formData.name}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="border-input bg-background mt-1 w-full rounded-md border px-3 py-2 text-sm"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="請輸入 Email"
              type="email"
              value={formData.email}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            點擊「送出」會打開第二層確認 Modal 並顯示填寫的資料。
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => close(false)} variant="outline">
            取消
          </Button>
          <Button onClick={handleSubmit}>送出</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const NestedModalProviderDemo = () => {
  const openModal = useModalController('app');

  const handleOpenForm = async () => {
    const result = await openModal<FormModalPayload>('form', {
      title: '填寫表單',
      description: '請填寫以下資訊',
    });

    if (result) {
      console.log('表單結果:', result);
      alert('表單已送出！');
    } else {
      console.log('用戶取消表單');
    }
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleOpenForm}>打開表單 Modal</Button>
      <FormModal />
      <ConfirmModal />
    </div>
  );
};
