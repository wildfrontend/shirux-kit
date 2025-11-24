import { UserProfileData } from '@/types/apis/user';
import type { ApiResponse } from '../utils/api-format';

// Response Types
export type GetProfileResponse = ApiResponse<UserProfileData>;
