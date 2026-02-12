/**
 * Firebase configuration and initialization
 * This module handles Firebase initialization and exports the Firestore instance
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  type Firestore,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import {
  getAuth,
  type Auth,
  signInAnonymously,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

// Firebase configuration
// These should be environment variables in production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let authInitPromise: Promise<User> | null = null;

/**
 * Initialize Firebase app and services
 * @returns Object containing initialized Firebase services
 */
export function initFirebase(): {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
} {
  if (app && db && auth) {
    return { app, db, auth };
  }

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);

  // Connect to emulator in development
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true'
  ) {
    const emulatorHost =
      import.meta.env.VITE_FIREBASE_EMULATOR_HOST || 'localhost';
    const emulatorPort = parseInt(
      import.meta.env.VITE_FIREBASE_EMULATOR_PORT || '8080',
      10
    );
    try {
      connectFirestoreEmulator(db, emulatorHost, emulatorPort);
      console.log(
        `Connected to Firestore emulator at ${emulatorHost}:${emulatorPort}`
      );
    } catch (error) {
      console.warn('Failed to connect to Firestore emulator:', error);
    }
  }

  return { app, db, auth };
}

/**
 * Get the Firestore instance
 * Initializes Firebase if not already initialized
 */
export function getFirestoreInstance(): Firestore {
  if (!db) {
    const { db: firestore } = initFirebase();
    return firestore;
  }
  return db;
}

/**
 * Get the Auth instance
 * Initializes Firebase if not already initialized
 */
export function getAuthInstance(): Auth {
  if (!auth) {
    const { auth: firebaseAuth } = initFirebase();
    return firebaseAuth;
  }
  return auth;
}

/**
 * Initialize Firebase Anonymous Authentication
 * This ensures every user has a unique UID without requiring login
 * @returns Promise resolving to authenticated user
 */
export async function ensureAuthenticated(): Promise<User> {
  // If already authenticating, return existing promise
  if (authInitPromise) {
    return authInitPromise;
  }

  const authInstance = getAuthInstance();

  // If already authenticated, return current user
  if (authInstance.currentUser) {
    return authInstance.currentUser;
  }

  // Create authentication promise
  authInitPromise = new Promise((resolve, reject) => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(
      authInstance,
      (user) => {
        if (user) {
          unsubscribe();
          resolve(user);
        }
      },
      reject
    );

    // Sign in anonymously
    signInAnonymously(authInstance).catch((error) => {
      unsubscribe();
      authInitPromise = null;
      reject(error);
    });
  });

  return authInitPromise;
}

/**
 * Get current user ID
 * @returns User ID if authenticated, throws error if not
 * @throws Error if user is not authenticated
 */
export async function getCurrentUserId(): Promise<string> {
  const user = await ensureAuthenticated();
  if (!user || !user.uid) {
    throw new Error('User authentication failed - no UID available');
  }
  return user.uid;
}

/**
 * Get current user synchronously (if already authenticated)
 * @returns User ID or null if not yet authenticated
 */
export function getCurrentUserIdSync(): string | null {
  const authInstance = getAuthInstance();
  return authInstance.currentUser?.uid || null;
}
