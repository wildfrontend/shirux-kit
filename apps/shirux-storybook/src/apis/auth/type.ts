import { UserProfileData } from '@/types/apis/user';
import type { ApiResponse } from '../utils/api-format';

// Login
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
}

export type LoginResponse = ApiResponse<LoginData>;

// Forgot Password
export interface ForgotPasswordRequest {
  phone: string;
}

export interface ForgotPasswordData {
  email: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordData>;

// Verify Token
export interface VerifyTokenData {
  exists: boolean;
  token_valid: boolean;
  user?: UserProfileData;
}

export type VerifyTokenResponse = ApiResponse<VerifyTokenData>;
