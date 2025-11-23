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
import { ArrowLeftIcon } from 'lucide-react';

export const CustomCloseButtonDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>開啟 Modal</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent
          closeButton={
            <Button
              className="absolute top-2 left-2"
              size="icon"
              variant="ghost"
            >
              <ArrowLeftIcon className="size-4" />
              <span className="sr-only">返回</span>
            </Button>
          }
        >
          <DialogHeader>
            <DialogTitle>自定義關閉按鈕</DialogTitle>
            <DialogDescription>
              使用 closeButton prop 可以自定義關閉按鈕的樣式和位置。
            </DialogDescription>
          </DialogHeader>
          <div className="text-primary py-4">
            <p>此範例將關閉按鈕改為左上角的返回箭頭，並使用 ghost 樣式。</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
