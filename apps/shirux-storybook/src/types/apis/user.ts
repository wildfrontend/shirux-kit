export interface UserProfileData {
  account_id: string; // 帳號 ID
  avatar_url?: string; // 頭像 URL
  bio?: string; // 個人簡介
  birthday: string; // 出生日期 (YYYY-MM-DD)
  created_at: string; // 建立時間 (YYYY-MM-DD HH:mm:ss)
  display_name?: string; // 顯示名稱
  email: string; // 電子郵件
  facebook_id?: string; // Facebook ID
  facebook_sync_enabled: boolean; // 是否啟用 Facebook 同步
  firebase_uid: string; // Firebase UID
  first_name: string; // 名
  follower_count: number; // 粉絲數
  following_count: number; // 追蹤數
  full_name: string; // 全名
  gender: string; // 性別
  google_id?: string; // Google ID
  has_personal_id: boolean; // 是否有身分證
  has_phone: boolean; // 是否有手機號碼
  hubble_coins: number; // Hubble 幣數量
  identity_tags?: string; // 身分標籤
  is_active: boolean; // 是否啟用帳號
  is_identity_visible: boolean; // 是否公開身份
  is_public_account: boolean; // 是否公開帳號
  is_verified: boolean; // 是否已驗證
  last_active: string; // 上次活躍時間 (YYYY-MM-DD HH:mm:ss)
  last_name: string; // 姓
  line_id?: string; // LINE ID
  line_user_id?: string; // LINE User ID
  location: string; // 位置
  nickname: string; // 暱稱
  personal_id: string; // 身分證號（部分遮蔽）
  phone: string; // 手機號碼（部分遮蔽）
  post_count: number; // 貼文數
  professional_avatar_url?: string; // 專業頭像 URL
  profile_completion: number; // 個人檔案完成度 (0~100)
  role: string; // 使用者角色
  updated_at: string; // 更新時間 (YYYY-MM-DD HH:mm:ss)
  user_id: number; // 使用者 ID
}
