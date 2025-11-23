'use client';

import { useState } from 'react';
import { Button } from '@shirux/rux-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shirux/rux-ui/components/dropdown-menu';

/**
 * 基本的條件驗證範例
 * 當未登入時拒絕打開選單
 */
export const BasicValidationDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm">
          登入狀態: {isLoggedIn ? '已登入' : '未登入'}
        </span>
        <Button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          size="sm"
          variant="outline"
        >
          {isLoggedIn ? '登出' : '登入'}
        </Button>
      </div>

      {message && (
        <div className="border-destructive bg-destructive/10 text-destructive rounded-md border p-2 text-sm">
          {message}
        </div>
      )}

      <DropdownMenu
        onBeforeOpenChange={(open) => {
          if (open && !isLoggedIn) {
            setMessage('請先登入才能使用此功能');
            setTimeout(() => setMessage(''), 3000);
            return false; // 拒絕打開
          }
          setMessage('');
          return true; // 允許操作
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">開啟選單</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>個人資料</DropdownMenuItem>
          <DropdownMenuItem>設定</DropdownMenuItem>
          <DropdownMenuItem>登出</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

/**
 * 非同步驗證範例
 * 模擬 API 呼叫來驗證權限
 */
export const AsyncValidationDemo = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckResult, setLastCheckResult] = useState<boolean | null>(null);

  // 模擬 API 呼叫
  const checkPermission = async (): Promise<boolean> => {
    setIsChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsChecking(false);

    // 模擬隨機結果
    const hasPermission = Math.random() > 0.3;
    setLastCheckResult(hasPermission);
    return hasPermission;
  };

  return (
    <div className="flex flex-col gap-4">
      {isChecking && (
        <div className="bg-muted rounded-md border p-2 text-sm">
          正在驗證權限...
        </div>
      )}

      {lastCheckResult !== null && !isChecking && (
        <div
          className={`rounded-md border p-2 text-sm ${
            lastCheckResult
              ? 'border-green-500 bg-green-500/10 text-green-700'
              : 'border-destructive bg-destructive/10 text-destructive'
          }`}
        >
          {lastCheckResult ? '權限驗證通過' : '權限驗證失敗，拒絕打開'}
        </div>
      )}

      <DropdownMenu
        onBeforeOpenChange={async (open) => {
          if (open) {
            const hasPermission = await checkPermission();
            return hasPermission;
          }
          setLastCheckResult(null);
          return true;
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button disabled={isChecking} variant="outline">
            {isChecking ? '驗證中...' : '開啟選單 (需驗證權限)'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>進階功能</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>危險操作 1</DropdownMenuItem>
          <DropdownMenuItem>危險操作 2</DropdownMenuItem>
          <DropdownMenuItem>危險操作 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

/**
 * 二次確認範例
 * 關閉前詢問確認
 */
export const ConfirmBeforeCloseDemo = () => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm">
          未儲存變更: {hasUnsavedChanges ? '是' : '否'}
        </span>
        <Button
          onClick={() => setHasUnsavedChanges(!hasUnsavedChanges)}
          size="sm"
          variant="outline"
        >
          切換狀態
        </Button>
      </div>

      <DropdownMenu
        onBeforeOpenChange={(open) => {
          // 只在關閉時檢查
          if (!open && hasUnsavedChanges) {
            const confirmed = window.confirm('有未儲存的變更，確定要關閉嗎？');
            if (confirmed) {
              setHasUnsavedChanges(false);
            }
            return confirmed;
          }
          return true;
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">開啟編輯選單</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>編輯操作</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setHasUnsavedChanges(true)}>
            進行編輯 (產生未儲存變更)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setHasUnsavedChanges(false)}>
            儲存變更
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

/**
 * 使用限制範例
 * 限制打開次數或頻率
 */
export const RateLimitDemo = () => {
  const [openCount, setOpenCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const maxOpens = 3;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm">
        已打開次數: {openCount} / {maxOpens}
      </div>

      {isBlocked && (
        <div className="border-destructive bg-destructive/10 text-destructive rounded-md border p-2 text-sm">
          已達到最大打開次數限制，請重新整理頁面
        </div>
      )}

      <DropdownMenu
        onBeforeOpenChange={(open) => {
          if (open) {
            if (openCount >= maxOpens) {
              setIsBlocked(true);
              return false;
            }
            setOpenCount((prev) => prev + 1);
          }
          return true;
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button disabled={isBlocked} variant="outline">
            開啟選單 (限制 {maxOpens} 次)
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>限量功能</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>選項 1</DropdownMenuItem>
          <DropdownMenuItem>選項 2</DropdownMenuItem>
          <DropdownMenuItem>選項 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={() => {
          setOpenCount(0);
          setIsBlocked(false);
        }}
        size="sm"
        variant="outline"
      >
        重置計數器
      </Button>
    </div>
  );
};
