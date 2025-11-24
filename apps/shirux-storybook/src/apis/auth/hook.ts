import { useMutation } from '@tanstack/react-query';

import {
  loginMutationOptions,
  verifyTokenMutationOptions,
} from './query-options';

export const useLoginApi = () => {
  return useMutation(loginMutationOptions);
};

export const useVerifyToken = () => {
  return useMutation(verifyTokenMutationOptions);
};
