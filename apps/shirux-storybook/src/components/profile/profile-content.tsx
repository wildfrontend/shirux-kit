'use client';

import { Typography } from '@shirux/rux-ui/components/typography';
import { Stack } from '@shirux/rux-ui/components/stack';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@shirux/rux-ui/components/card';
import { useGetProfile } from '@/apis/user/hook';

export const ProfileContent = () => {
  const { profile, isLoading, isError, error } = useGetProfile();

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen px-6 py-10">
        <div className="container mx-auto max-w-4xl">
          <Typography variant="h2">個人檔案</Typography>
          <Typography className="mt-4" color="muted">
            載入中...
          </Typography>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-background min-h-screen px-6 py-10">
        <div className="container mx-auto max-w-4xl">
          <Typography variant="h2">個人檔案</Typography>
          <Typography className="mt-4 text-red-500">
            載入失敗：{error?.message || '未知錯誤'}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen px-6 py-10">
      <div className="container mx-auto max-w-4xl">
        <Typography variant="h2">個人檔案</Typography>

        <Stack className="mt-8 gap-6" direction="column">
          {/* 基本資訊 */}
          <Card>
            <CardHeader>
              <CardTitle>基本資訊</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack className="gap-3" direction="column">
                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">姓名</Typography>
                  <Typography color="muted">
                    {profile?.full_name || '未設定'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">暱稱</Typography>
                  <Typography color="muted">
                    {profile?.nickname || '未設定'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">帳號 ID</Typography>
                  <Typography color="muted">
                    {profile?.account_id || '未設定'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">Email</Typography>
                  <Typography color="muted">
                    {profile?.email || '未設定'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">手機</Typography>
                  <Typography color="muted">
                    {profile?.phone || '未設定'}
                  </Typography>
                </div>

                {profile?.birthday && (
                  <div className="flex gap-4">
                    <Typography className="w-24 font-medium">生日</Typography>
                    <Typography color="muted">{profile.birthday}</Typography>
                  </div>
                )}

                {profile?.gender && (
                  <div className="flex gap-4">
                    <Typography className="w-24 font-medium">性別</Typography>
                    <Typography color="muted">
                      {profile.gender === 'male'
                        ? '男'
                        : profile.gender === 'female'
                          ? '女'
                          : '其他'}
                    </Typography>
                  </div>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* 帳戶狀態 */}
          <Card>
            <CardHeader>
              <CardTitle>帳戶狀態</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack className="gap-3" direction="column">
                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">角色</Typography>
                  <Typography color="muted">
                    {profile?.role || '未設定'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">帳戶狀態</Typography>
                  <Typography
                    className={
                      profile?.is_active ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {profile?.is_active ? '啟用中' : '已停用'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">驗證狀態</Typography>
                  <Typography
                    className={
                      profile?.is_verified ? 'text-green-600' : 'text-gray-600'
                    }
                  >
                    {profile?.is_verified ? '已驗證' : '未驗證'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">
                    資料完整度
                  </Typography>
                  <Typography color="muted">
                    {profile?.profile_completion || 0}%
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">註冊時間</Typography>
                  <Typography color="muted">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString(
                          'zh-TW',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )
                      : '未知'}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Typography className="w-24 font-medium">最後活躍</Typography>
                  <Typography color="muted">
                    {profile?.last_active
                      ? new Date(profile.last_active).toLocaleString('zh-TW')
                      : '未知'}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* 社群統計 */}
          <Card>
            <CardHeader>
              <CardTitle>社群統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <Typography className="text-2xl font-bold">
                    {profile?.follower_count || 0}
                  </Typography>
                  <Typography color="muted">追蹤者</Typography>
                </div>

                <div className="text-center">
                  <Typography className="text-2xl font-bold">
                    {profile?.following_count || 0}
                  </Typography>
                  <Typography color="muted">追蹤中</Typography>
                </div>

                <div className="text-center">
                  <Typography className="text-2xl font-bold">
                    {profile?.post_count || 0}
                  </Typography>
                  <Typography color="muted">貼文數</Typography>
                </div>

                <div className="text-center">
                  <Typography className="text-2xl font-bold">
                    {profile?.hubble_coins || 0}
                  </Typography>
                  <Typography color="muted">Hubble Coins</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </div>
  );
};
