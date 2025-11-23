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

export const NoCloseButtonDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>開啟 Modal</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>無關閉按鈕</DialogTitle>
            <DialogDescription>
              預設不顯示任何關閉按鈕，需要自己在內容區域加入關閉邏輯。
            </DialogDescription>
          </DialogHeader>
          <div className="text-primary py-4">
            <p>
              此 Modal 沒有右上角的關閉按鈕，只能透過下方的「關閉」按鈕或按 ESC
              鍵來關閉。
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              關閉
            </Button>
            <Button onClick={() => setOpen(false)}>確認</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
