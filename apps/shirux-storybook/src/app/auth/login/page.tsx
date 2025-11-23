import { redirect } from 'next/navigation';
import type { SRC } from '@shirux/types/react';
import { LoginPageContent } from '@/components/auth/login/main';
import { pagePath } from '@/constants/page-path';
import { verifyFirebaseSession } from '@/server-actions/firebase';

const Page: SRC = async () => {
  const session = await verifyFirebaseSession();
  if (session) {
    redirect(pagePath.home);
  }
  return <LoginPageContent />;
};

export default Page;
