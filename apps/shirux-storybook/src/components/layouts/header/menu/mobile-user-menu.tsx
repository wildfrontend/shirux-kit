'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { RC } from '@shirux/types/react';

import {
  CollapsibleMenuItem,
  CollapsibleMenuTrigger,
  CollapsibleMenuContent,
  CollapsibleMenuLink,
} from '@shirux/rux-ui/components/collapsible-menu';
import { Typography } from '@shirux/rux-ui/components/typography';

import { pagePath } from '@/constants/page-path';
import { useAuth } from '@/hooks/auth';

interface MobileUserMenuProps {
  onClose: () => void;
}

export const MobileUserMenu: RC<MobileUserMenuProps> = ({ onClose }) => {
  const { signOut, isAuthorizing, isAuthenticated } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOut(); // signOut 現在會自動處理跳轉
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <CollapsibleMenuItem value="user-menu">
      {isAuthorizing ? (
        <div className="flex items-center gap-3 rounded-md px-4 py-3">
          <Typography className="text-muted-foreground" variant="sm">
            載入中...
          </Typography>
        </div>
      ) : isAuthenticated ? (
        <>
          <CollapsibleMenuTrigger className="text-foreground hover:bg-primary/10 hover:text-primary flex w-full items-center gap-2 rounded-md px-4 py-3 text-left text-sm transition-colors">
            <Typography className="flex-1" variant="sm">
              我的帳戶
            </Typography>
            <ChevronRight
              aria-hidden="true"
              className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90"
            />
          </CollapsibleMenuTrigger>
          <CollapsibleMenuContent asChild>
            <ul className="bg-muted/40 mt-1 space-y-1 rounded-md p-2">
              <li>
                <CollapsibleMenuLink
                  asChild
                  className="pr-3 pl-6"
                  isActive={false}
                >
                  <Link href="/profile" onClick={onClose}>
                    <Typography variant="sm">個人資料</Typography>
                  </Link>
                </CollapsibleMenuLink>
              </li>
              <li>
                <CollapsibleMenuLink
                  asChild
                  className="pr-3 pl-6"
                  isActive={false}
                >
                  <Link href="/settings" onClick={onClose}>
                    <Typography variant="sm">設定</Typography>
                  </Link>
                </CollapsibleMenuLink>
              </li>
              <li>
                <button
                  className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors disabled:opacity-50"
                  disabled={isSigningOut}
                  onClick={handleLogout}
                >
                  <Typography variant="sm">
                    {isSigningOut ? '登出中...' : '登出'}
                  </Typography>
                </button>
              </li>
            </ul>
          </CollapsibleMenuContent>
        </>
      ) : (
        <CollapsibleMenuLink
          asChild
          className="py-3 font-medium"
          isActive={false}
        >
          <Link href={pagePath.auth.login} onClick={onClose}>
            <Typography variant="sm">登入</Typography>
          </Link>
        </CollapsibleMenuLink>
      )}
    </CollapsibleMenuItem>
  );
};
