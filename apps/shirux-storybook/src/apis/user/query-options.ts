import { queryOptions } from '@tanstack/react-query';

import { getProfileApi } from './api';

/**
 * 用戶相關的 Query Keys
 */

export const userQueryKeys = {
  // 用戶根目錄
  all: ['user'] as const,
  profile: () => [...userQueryKeys.all, 'profile'] as const,
} as const;

export const profileQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKeys.profile(),
    queryFn: ({ signal }) => {
      return getProfileApi({ config: { signal } });
    },
  });
};
