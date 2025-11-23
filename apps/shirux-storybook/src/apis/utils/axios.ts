import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import Axios from 'axios';

type ExtendedAxiosRequestConfig<TData = never, TParams = never> = Omit<
  AxiosRequestConfig<TData>,
  'params'
> & {
  params?: TParams;
};

/**
 * HTTP 方法型別（僅小寫，保持一致性）
 */
type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'options';

// NEW Version
export const axios = Axios.create({
  baseURL: `/api`,
});

// 因為是專門驗證token的所以與一般連線分開
export const authAxios = Axios.create({
  baseURL: `/api`,
});

/**
 * API 函數工廠 - 建立型別安全的 API 呼叫函數
 *
 * @template TResponse - API 回應資料的型別
 * @template TArgs - 路徑參數的型別（當 url 是函數時使用）
 * @template TData - Request body 的型別
 * @template TParams - Query parameters 的型別
 *
 * @param axiosInstance - axios 實體，使用 `axios` 或 `authAxios`
 * @param method - HTTP 方法 (get, post, put, delete, etc.)
 * @param url - API 端點 URL，可以是：
 *   - 字串：固定的 URL 路徑
 *   - 函數：接收 args 參數，回傳動態組裝的 URL
 *
 * @example
 * ```typescript
 * // 範例 1: 簡單 GET 請求（固定 URL）
 * export const getProfileApi = createApiFunction<GetProfileResponse>(
 *   axios,
 *   'get',
 *   '/user/profile'
 * );
 *
 * // 使用方式
 * getProfileApi({ config: { signal } })
 *
 * // 範例 2: 帶路徑參數的 GET 請求（動態 URL）
 * export const getUserApi = createApiFunction(
 *   axios,
 *   'get',
 *   (args: { userId: string }) => `/users/${args.userId}`
 * );
 *
 * // 使用方式
 * getUserApi({
 *   args: { userId: '123' },
 *   config: { signal }
 * })
 *
 * // 範例 3: 帶 query parameters
 * interface SearchQueryParams {
 *   keyword: string;
 *   page?: number;
 * }
 *
 * export const searchApi = createApiFunction<SearchResponse, never, never, SearchQueryParams>(
 *   axios,
 *   'get',
 *   '/search'
 * );
 *
 * // 使用方式
 * searchApi({
 *   params: { keyword: 'test', page: 1 },
 *   config: { signal }
 * })
 *
 * // 範例 4: POST 請求帶 body
 * interface CreateUserBody {
 *   name: string;
 *   email: string;
 * }
 *
 * export const createUserApi = createApiFunction<UserResponse, never, CreateUserBody>(
 *   axios,
 *   'post',
 *   '/users'
 * );
 *
 * // 使用方式
 * createUserApi({
 *   data: { name: 'John', email: 'john@example.com' },
 *   config: { signal }
 * })
 *
 * // 範例 5: 複雜情境 - 路徑參數 + query parameters + body
 * export const updateUserApi = createApiFunction<
 *   UserResponse,
 *   { userId: string },
 *   UpdateUserBody,
 *   { notify?: boolean }
 * >(
 *   axios,
 *   'put',
 *   (args) => `/users/${args.userId}`
 * );
 *
 * // 使用方式
 * updateUserApi({
 *   args: { userId: '123' },
 *   data: { name: 'John' },
 *   params: { notify: true },
 *   config: { signal }
 * })
 *
 * // 範例 6: 使用 authAxios 處理認證相關請求
 * export const verifyTokenApi = createApiFunction<VerifyTokenResponse>(
 *   authAxios,  // 使用 authAxios 實體
 *   'post',
 *   '/auth/verify'
 * );
 *
 * // 使用方式與一般相同
 * verifyTokenApi({
 *   data: { token: 'xxx' },
 *   config: { signal }
 * })
 * ```
 */

// 函數重載：當 url 是字串時
export function createApiFunction<TResponse, TData = never, TParams = never>(
  axiosInstance: typeof axios,
  method: HttpMethod,
  url: string
): (options?: {
  data?: TData;
  params?: TParams;
  config?: Partial<ExtendedAxiosRequestConfig<TData, TParams>>;
}) => Promise<AxiosResponse<TResponse>>;

// 函數重載：當 url 是函數時
export function createApiFunction<
  TResponse,
  TArgs,
  TData = never,
  TParams = never,
>(
  axiosInstance: typeof axios,
  method: HttpMethod,
  url: (args: TArgs) => string
): (options: {
  args: TArgs;
  data?: TData;
  params?: TParams;
  config?: Partial<ExtendedAxiosRequestConfig<TData, TParams>>;
}) => Promise<AxiosResponse<TResponse>>;

// 實際實作
export function createApiFunction<
  TResponse,
  TArgs = never,
  TData = never,
  TParams = never,
>(
  axiosInstance: typeof axios,
  method: HttpMethod,
  url: string | ((args: TArgs) => string)
) {
  // 當 url 是字串時（固定 URL）
  if (typeof url === 'string') {
    return (options?: {
      data?: TData;
      params?: TParams;
      config?: Partial<ExtendedAxiosRequestConfig<TData, TParams>>;
    }): Promise<AxiosResponse<TResponse>> => {
      return axiosInstance.request<TResponse>({
        method,
        url,
        ...(options?.params ? { params: options.params } : {}),
        ...(options?.data ? { data: options.data } : {}),
        ...(options?.config || {}),
      });
    };
  }

  // 當 url 是函數時（動態 URL）
  return (options: {
    args: TArgs;
    data?: TData;
    params?: TParams;
    config?: Partial<ExtendedAxiosRequestConfig<TData, TParams>>;
  }): Promise<AxiosResponse<TResponse>> => {
    const finalUrl = url(options.args);

    return axiosInstance.request<TResponse>({
      method,
      url: finalUrl,
      ...(options?.params ? { params: options.params } : {}),
      ...(options?.data ? { data: options.data } : {}),
      ...(options?.config || {}),
    });
  };
}
