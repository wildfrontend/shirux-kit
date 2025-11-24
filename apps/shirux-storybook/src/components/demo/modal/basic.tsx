import { Button } from '@shirux/rux-ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shirux/rux-ui/components/dialog';

export const BasicModalDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>開啟 Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>歡迎使用 Modal</DialogTitle>
          <DialogDescription>
            這是一個基本的對話框範例，使用 secondary 背景色和 primary
            邊框及文字顏色。
          </DialogDescription>
        </DialogHeader>
        <div className="text-primary py-4">
          <p>
            Modal
            元件適合用於需要使用者關注的重要訊息、確認操作或表單輸入等場景。{' '}
          </p>
        </div>
        <DialogFooter>
          <DialogClose
            asChild
            onClick={() => {
              alert('關閉');
            }}
          >
            <Button variant="outline">關閉</Button>
          </DialogClose>

          <Button
            onClick={() => {
              alert('確認');
            }}
          >
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
