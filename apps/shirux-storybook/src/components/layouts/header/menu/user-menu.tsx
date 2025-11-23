'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@shirux/rux-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shirux/rux-ui/components/dropdown-menu';
import { LogIn, LogOut, Settings, User, UserCircle } from 'lucide-react';
import type { RC } from '@shirux/types/react';

import { pagePath } from '@/constants/page-path';
import { useAuth } from '@/hooks/auth';

export const UserMenu: RC = () => {
  const { signOut, isAuthorizing, isAuthenticated } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (isAuthorizing) {
    return (
      <Button disabled size="icon" variant="ghost">
        <User className="size-5 animate-pulse" />
      </Button>
    );
  }

  const handleLogout = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOut(); // signOut 現在會自動處理跳轉
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isSigningOut && isAuthenticated}
          size="icon"
          variant="ghost"
        >
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem asChild>
                <Link className="flex items-center gap-2" href="/profile">
                  <UserCircle />
                  <span>個人資料</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="flex items-center gap-2" href="/settings">
                  <Settings />
                  <span>設定</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              <span>登出</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center gap-2"
                href={pagePath.auth.login}
              >
                <LogIn />
                <span>登入</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
