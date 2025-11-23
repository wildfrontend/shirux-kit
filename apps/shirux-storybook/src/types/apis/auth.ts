import type { ApiResponse } from '../globals/api';

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
}

export type LoginResponse = ApiResponse<LoginData>;

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ForgotPasswordData {
  email: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordData>;

export interface ProfileData {
  user_id: number;
  account_id: string;
  email: string;
  phone: string;
  firebase_uid: string;
  first_name: string;
  last_name: string;
  full_name: string;
  nickname: string;
  display_name: string | null;
  avatar_url: string | null;
  professional_avatar_url: string | null;
  bio: string | null;
  birthday: string | null;
  gender: 'male' | 'female' | 'other' | null;
  location: string | null;
  role: 'user' | 'admin' | string;
  is_active: boolean;
  is_verified: boolean;
  is_public_account: boolean;
  is_identity_visible: boolean;
  has_phone: boolean;
  has_personal_id: boolean;
  personal_id: string;
  profile_completion: number;
  hubble_coins: number;
  follower_count: number;
  following_count: number;
  post_count: number;
  identity_tags: string | null;
  google_id: string | null;
  facebook_id: string | null;
  facebook_sync_enabled: boolean;
  line_id: string | null;
  line_user_id: string | null;
  created_at: string;
  updated_at: string;
  last_active: string;
}

export type GetProfileResponse = ApiResponse<ProfileData>;
