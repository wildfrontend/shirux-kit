import type { AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  status: number;
}

/**
 * 通用的 Mutation Hook Options
 * 用於所有使用 useMutation 的 API hooks
 *
 * @template TData - API 回應的資料型別
 * @template TError - 錯誤的型別（預設為 unknown）
 * @template TVariables - mutation 變數的型別（預設為 void）
 *
 * @example
 * ```typescript
 * // 範例 1: 基本使用（不需要拿到回傳資料）
 * export const useDeleteItem = (options?: UseMutationOptions) => {
 *   return useMutation({
 *     mutationFn: (id: number) => deleteItemApi(id),
 *     onSuccess: () => {
 *       options?.onSuccess?.();
 *     }
 *   });
 * };
 *
 * // 範例 2: 使用輔助型別（推薦）
 * export const useCreateItem = (
 *   options?: ApiMutationOptions<CreateItemResponse, CreateItemRequest>
 * ) => {
 *   return useMutation({
 *     mutationFn: (data: CreateItemRequest) => createItemApi(data),
 *     onSuccess: (response) => {
 *       options?.onSuccess?.(response);
 *     }
 *   });
 * };
 * ```
 */
export interface UseMutationOptions<
  TData = void,
  TError = unknown,
  TVariables = void,
> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onMutate?: (variables: TVariables) => void;
}

/**
 * API Mutation Options 輔助型別
 * 自動包裝 AxiosResponse，簡化 mutation hook 的型別定義
 *
 * @template TResponse - API 回應型別（會自動包裝成 AxiosResponse<TResponse>）
 * @template TRequest - API 請求型別（預設為 void）
 * @template TError - 錯誤型別（預設為 unknown）
 *
 * @example
 * ```typescript
 * // 之前：需要手動寫 AxiosResponse
 * export const useUpdateCaseOrders = (
 *   options?: UseMutationOptions<AxiosResponse<UpdateCaseOrdersResponse>, unknown, UpdateCaseOrdersRequest>
 * ) => { ... };
 *
 * // 現在：使用 ApiMutationOptions 自動處理
 * export const useUpdateCaseOrders = (
 *   options?: ApiMutationOptions<UpdateCaseOrdersResponse, UpdateCaseOrdersRequest>
 * ) => { ... };
 * ```
 */
export type ApiMutationOptions<
  TResponse,
  TRequest = void,
  TError = unknown,
> = UseMutationOptions<AxiosResponse<TResponse>, TError, TRequest>;
