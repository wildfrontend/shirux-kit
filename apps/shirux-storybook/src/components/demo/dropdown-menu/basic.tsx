'use client';

import { Button } from '@shirux/rux-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shirux/rux-ui/components/dropdown-menu';
import {
  User,
  Settings,
  LogOut,
  FileText,
  Download,
  Trash2,
} from 'lucide-react';

/**
 * 基本用法範例
 * 展示 Dropdown Menu 的標準使用方式
 */
export const BasicUsageDemo = () => {
  return (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">開啟選單</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            個人資料
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            設定
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            登出
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">檔案操作</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            檢視詳情
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            下載
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            刪除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
