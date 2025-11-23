import 'server-only';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { ServiceAccount } from 'firebase-admin/app';

const getAdminApp = () => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  };

  const adminApp = initializeApp({
    credential: cert(serviceAccount),
  });

  return adminApp;
};

export const getAdminAuth = () => {
  return getAuth(getAdminApp());
};

// 保留原有命名以便現有引用沿用
export const adminAuth = getAdminAuth;
