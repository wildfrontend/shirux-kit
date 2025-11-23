import { redirect } from 'next/navigation';
import type { SRC } from '@shirux/types/react';
import { verifyFirebaseSession } from '@/server-actions/firebase';
import { pagePath } from '@/constants/page-path';
import { ProfileContent } from '@/components/profile/profile-content';

const Page: SRC = async () => {
  const session = await verifyFirebaseSession();
  if (!session) {
    const query = new URLSearchParams({ redirect_url: pagePath.profile });
    redirect(`${pagePath.auth.login}?${query.toString()}`);
  }
  return <ProfileContent />;
};

export default Page;
