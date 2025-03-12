import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // For production, use service account credentials
  admin.initializeApp({
    projectId: 'demo-project',
  });
  
  // Set Firestore emulator host if running locally
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    admin.firestore().settings({
      host: process.env.FIRESTORE_EMULATOR_HOST,
      ssl: false,
    });
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export { admin, functions }; 