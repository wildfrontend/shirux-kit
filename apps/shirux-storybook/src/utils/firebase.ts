// Import the functions you need from the SDKs you need
import { firebaseConfig } from 'firebase/config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export const googleProvider = new GoogleAuthProvider();

export default firebase;
