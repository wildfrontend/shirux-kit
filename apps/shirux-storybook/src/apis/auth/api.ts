import { authAxios, axios, createApiFunction } from '../utils/axios';

import { AuthEndpoints } from './endpoints';
import type { LoginRequest, LoginResponse, VerifyTokenResponse } from './type';

/**
 * 使用者登入
 * @param data - 登入資料 (phone, password)
 * @param config - Axios request config (signal, headers, etc.)
 * @returns 登入結果
 */
export const loginApi = createApiFunction<LoginResponse, LoginRequest>(
  axios,
  'post',
  AuthEndpoints.LOGIN
);

/**
 * 驗證 Firebase Token
 * 使用 authAxios 實例處理認證請求
 */
const verifyTokenApiBase = createApiFunction<VerifyTokenResponse>(
  authAxios,
  'post',
  AuthEndpoints.VERIFY_TOKEN
);

/**
 * 驗證 Firebase Token
 * @param token - Firebase ID Token
 * @returns Token 驗證結果
 */
export const verifyTokenApi = (token: string) => {
  return verifyTokenApiBase({
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
