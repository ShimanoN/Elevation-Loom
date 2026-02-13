// Initialize Firebase and connect to emulators when in E2E/emulator mode
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// NOTE: adjust env variable names if your build system (Vite/Next) expects different prefixes
const firebaseConfig = {
  apiKey:
    (import.meta &&
      (import.meta as any).env &&
      (import.meta as any).env.VITE_FIREBASE_API_KEY) ||
    '',
  authDomain:
    (import.meta &&
      (import.meta as any).env &&
      (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN) ||
    '',
  projectId:
    (import.meta &&
      (import.meta as any).env &&
      (import.meta as any).env.VITE_FIREBASE_PROJECT_ID) ||
    '',
  storageBucket:
    (import.meta &&
      (import.meta as any).env &&
      (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET) ||
    '',
  messagingSenderId:
    (import.meta &&
      (import.meta as any).env &&
      (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID) ||
    '',
  appId:
    (import.meta &&
      (import.meta as any).env &&
      (import.meta as any).env.VITE_FIREBASE_APP_ID) ||
    '',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators when running E2E (window.__E2E__ is set by Playwright init script)
if (typeof window !== 'undefined' && (window as any).__E2E__ === true) {
  try {
    // Auth emulator default port 9099
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
    console.info('Firebase Auth emulator connected at http://localhost:9099');
  } catch (e) {
    console.warn('Failed to connect Auth emulator', e);
  }

  try {
    // Firestore emulator default port 8080
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.info('Firestore emulator connected at localhost:8080');
  } catch (e) {
    console.warn('Failed to connect Firestore emulator', e);
  }
}
