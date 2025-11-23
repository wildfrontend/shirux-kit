import { useQuery } from '@tanstack/react-query';

import { profileQueryOptions } from './query-options';
import { useAuth } from '@/hooks/auth';

export const useGetProfile = () => {
  const { isAuthenticated } = useAuth();
  const query = useQuery({
    ...profileQueryOptions(),
    enabled: isAuthenticated,
  });
  return {
    ...query,
    profile: query.data?.data.data,
  };
};
