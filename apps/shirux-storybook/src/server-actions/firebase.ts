'use server';

import { cookies } from 'next/headers';

import { DecodedIdToken } from 'firebase-admin/auth';

import { adminAuth } from '@/utils/firebase-admin';

const SESSION_COOKIE_NAME = 'firebase_session';
const SESSION_EXPIRES_IN_MS = 60 * 60 * 1000;
const SESSION_EXPIRES_IN_SEC = SESSION_EXPIRES_IN_MS / 1000;

const setSessionCookie = async (idToken: string) => {
  const sessionCookie = await adminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRES_IN_MS,
  });

  (await cookies()).set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_EXPIRES_IN_SEC,
  });
};

export async function loginWithFirebase(idToken: string) {
  await setSessionCookie(idToken);
  return true;
}

export async function refreshFirebaseSession(idToken: string) {
  await setSessionCookie(idToken);
  return true;
}

export async function clearFirebaseSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
  return true;
}

export async function verifyFirebaseSession(): Promise<DecodedIdToken | null> {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!session) {
    return null;
  }

  try {
    const decoded = await adminAuth().verifySessionCookie(session, true);
    return decoded;
  } catch (error) {
    (await cookies()).delete(SESSION_COOKIE_NAME);
    return null;
  }
}
