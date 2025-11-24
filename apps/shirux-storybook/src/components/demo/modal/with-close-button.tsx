'use client';

import { useState } from 'react';
import { Button } from '@shirux/rux-ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shirux/rux-ui/components/dialog';

export const WithCloseButtonDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>開啟 Modal</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>顯示內建關閉按鈕</DialogTitle>
            <DialogDescription>
              設定 showCloseButton 為 true，會在右上角顯示內建的 X 關閉按鈕。
            </DialogDescription>
          </DialogHeader>
          <div className="text-primary py-4">
            <p>點擊右上角的 X 按鈕或按 ESC 鍵即可關閉此 Modal。</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
