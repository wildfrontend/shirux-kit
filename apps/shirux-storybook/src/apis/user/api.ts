import { axios, createApiFunction } from '../utils/axios';

import { UserEndpoints } from './endpoints';
import type { GetProfileResponse } from './type';

/**
 * 取得當前用戶個人資料
 * @param config - Axios request config (signal, headers, etc.)
 * @returns 用戶資料
 */
export const getProfileApi = createApiFunction<GetProfileResponse>(
  axios,
  'get',
  UserEndpoints.PROFILE
);
