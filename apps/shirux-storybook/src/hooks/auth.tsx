'use client';

import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { loginApi } from '@/apis/auth/api';
import { auth } from '@/utils/firebase';
import { loginWithFirebase } from '@/server-actions/firebase';
import type { LoginRequest } from '@/apis/auth/type';
import { toast } from '@shirux/rux-ui/components/toast';
import { useAuthStore } from '@/stores/auth';

// 登入
export const useSignIn = () => {
  const verifyAndSetUser = useAuthStore((state) => state.verifyAndSetUser);

  return useMutation({
    mutationFn: async ({ phone, password }: LoginRequest) => {
      // 1. 先呼叫你的 API 取得 email
      const response = await loginApi({ data: { phone, password } });
      const apiResponse = response.data;

      if (apiResponse.success !== true) {
        throw new Error(
          apiResponse.message || '登入失敗,請檢查您的手機號碼和密碼'
        );
      }

      const email = apiResponse.data?.email;

      if (!email) {
        throw new Error('查無此帳號或密碼不正確');
      }

      // 2. 用取得的 email 登入 Firebase
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await credential.user.getIdToken();

      await loginWithFirebase(idToken);

      // 3. 登入成功後，立即驗證並更新 Zustand 狀態
      await verifyAndSetUser(credential.user);

      return credential;
    },
    onSuccess: () => {
      toast.success('登入成功');
    },
    onError: (error) => {
      toast.error(error.message || '登入失敗，請稍後再試');
    },
  });
};

// 登出
export const useSignOut = () => {
  const signOutFromStore = useAuthStore((state) => state.signOut);

  return useMutation({
    mutationFn: async () => {
      await signOutFromStore();
    },
    onSuccess: () => {
      toast.success('已成功登出');
    },
    onError: () => {
      toast.error('登出失敗，請稍後再試');
    },
  });
};

// Auth hook - 提供當前使用者狀態（從 Zustand store 取得）
export const useAuth = () => {
  const firebaseUser = useAuthStore((state) => state.firebaseUser);
  const profile = useAuthStore((state) => state.profile);
  const isAuthorizing = useAuthStore((state) => state.isAuthorizing);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOutMutation = useSignOut();

  const signOut = () => signOutMutation.mutateAsync();

  return {
    user: firebaseUser,
    profile,
    isAuthorizing,
    isAuthenticated,
    signOut,
  };
};
