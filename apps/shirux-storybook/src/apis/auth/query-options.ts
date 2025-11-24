import { loginApi, verifyTokenApi } from './api';
import type { LoginRequest } from './type';

export const authKeys = {
  all: ['auth'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  verifyToken: () => [...authKeys.all, 'verify-token'] as const,
};

export const loginMutationOptions = {
  mutationKey: authKeys.login(),
  mutationFn: async (payload: LoginRequest) => {
    const response = await loginApi({ data: payload });
    return response.data;
  },
};

export const verifyTokenMutationOptions = {
  mutationKey: authKeys.verifyToken(),
  mutationFn: verifyTokenApi,
};
