'use client';

import { axios } from '@/apis/utils/axios';
import { useAuth } from '@/hooks/auth';
import { type AxiosHeaders } from 'axios';
import { useEffect, useMemo } from 'react';
import { useAuthStore } from '@/stores/auth';
import { RC } from '@shirux/types/react';

type RequestBeforeFunction = Parameters<
  typeof axios.interceptors.request.use
>['0'];

const useAxiosInterceptor = () => {
  const { user: firebaseUser } = useAuth();

  const requestBefore: RequestBeforeFunction = useMemo(
    () => async (config) => {
      if (config.headers) {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();

          console.log('Setting Authorization header with token:', idToken);

          (config.headers as AxiosHeaders).set(
            'Authorization',
            `Bearer ${idToken}`
          );
        }
      }
      return config;
    },
    [firebaseUser]
  );

  useEffect(() => {
    const request = axios.interceptors.request.use(requestBefore);
    return () => {
      axios.interceptors.request.eject(request);
    };
  }, [requestBefore]);
};

const useAuthInitialize = () => {
  useEffect(() => {
    // 初始化 Auth 監聽器，返回 unsubscribe function
    const unsubscribe = useAuthStore.getState().initialize();

    // cleanup：組件卸載時取消訂閱
    return () => {
      unsubscribe();
    };
  }, []); // 空依賴陣列，確保只執行一次
};

const FirebaseAuthInitialize: RC = () => {
  useAuthInitialize();
  useAxiosInterceptor();
  return <></>;
};

export default FirebaseAuthInitialize;
