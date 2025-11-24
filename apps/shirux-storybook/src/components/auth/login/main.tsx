'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@shirux/rux-ui/components/typography';
import type { RC } from '@shirux/types/react';

import { LoginForm } from '@/components/auth/login/form';
import { pagePath } from '@/constants/page-path';

const getSafeRedirect = (redirectUrl?: string) => {
  if (redirectUrl && redirectUrl.startsWith('/')) {
    return redirectUrl;
  }
  return pagePath.home;
};

export const LoginPageContent: RC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = useMemo(() => {
    const redirectUrl = searchParams.get('redirect_url') || undefined;
    return getSafeRedirect(redirectUrl);
  }, [searchParams]);

  const registerPath = useMemo(() => {
    if (!redirectPath) return pagePath.auth.register;
    const query = new URLSearchParams({ redirect_url: redirectPath });
    return `${pagePath.auth.register}?${query.toString()}`;
  }, [redirectPath]);

  return (
    <div className="bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Typography variant="h1">歡迎回來</Typography>
          <Typography className="mt-2" color="muted" variant="lead">
            請使用您的手機號碼登入
          </Typography>
        </div>

        <LoginForm
          onError={(error) => {
            console.error('Login failed:', error);
          }}
          onForgotPassword={() => {
            // TODO: 實作忘記密碼功能
            console.log('忘記密碼');
          }}
          onRegister={() => {
            router.push(registerPath);
          }}
          onSuccess={async () => {
            router.push(redirectPath || pagePath.home);
          }}
        />
      </div>
    </div>
  );
};
