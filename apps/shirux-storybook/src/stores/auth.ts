'use client';

import { create } from 'zustand';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';

import { verifyTokenApi } from '@/apis/auth/api';
import type { UserProfileData } from '@/types/apis/user';
import { auth } from '@/utils/firebase';
import { clearFirebaseSession } from '@/server-actions/firebase';

interface AuthState {
  // 狀態
  firebaseUser: User | null;
  profile: UserProfileData | null;
  isAuthorizing: boolean;
  isAuthenticated: boolean;

  // Actions
  initialize: () => () => void;
  verifyAndSetUser: (firebaseUser: User) => Promise<void>;
  clearAuth: () => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 初始狀態
  firebaseUser: null,
  profile: null,
  isAuthorizing: true,
  isAuthenticated: false,

  /**
   * 初始化 Auth 監聽器
   * @returns unsubscribe function
   */
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // 有 Firebase user，進行 verify
        await get().verifyAndSetUser(firebaseUser);
      } else {
        // 無 Firebase user，清除狀態
        get().clearAuth();
      }
    });
    return unsubscribe;
  },

  /**
   * 驗證 Firebase Token 並設定使用者資料
   */
  verifyAndSetUser: async (firebaseUser: User) => {
    set({ isAuthorizing: true });
    try {
      const token = await firebaseUser.getIdToken();
      const response = await verifyTokenApi(token);
      const apiResponse = response.data;

      if (
        apiResponse.success &&
        apiResponse.data?.token_valid &&
        apiResponse.data?.user
      ) {
        // Token 有效且有使用者資料
        set({
          firebaseUser,
          profile: apiResponse.data.user,
          isAuthenticated: true,
          isAuthorizing: false,
        });
      } else {
        // Token 無效或無使用者資料
        console.warn('Token verification failed or user data not found');
        set({
          firebaseUser: null,
          profile: null,
          isAuthenticated: false,
          isAuthorizing: false,
        });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      set({
        firebaseUser: null,
        profile: null,
        isAuthenticated: false,
        isAuthorizing: false,
      });
    }
  },

  /**
   * 清除 Auth 狀態
   */
  clearAuth: () => {
    set({
      firebaseUser: null,
      profile: null,
      isAuthenticated: false,
      isAuthorizing: false,
    });
  },

  /**
   * 登出
   */
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      await clearFirebaseSession();
      get().clearAuth();
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  },
}));
