'use server';

import admin from 'firebase-admin';

// This function ensures Firebase Admin is initialized only once.
const initializeAdmin = () => {
  // Check if the default app is already initialized
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Your web app's Firebase configuration
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  // Verify that all required environment variables are set
  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    throw new Error('Firebase service account credentials are not set in environment variables.');
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    throw new Error('Failed to initialize Firebase Admin SDK.');
  }
};

// Lazy-loaded Firestore instance
let db: admin.firestore.Firestore;
export const getDb = async () => {
  if (!db) {
    initializeAdmin();
    db = admin.firestore();
  }
  return db;
};
