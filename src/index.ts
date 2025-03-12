// import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';
import app from './core/app';

// Load environment variables
// dotenv.config();

// For Firebase Functions deployment
export const api = functions.https.onRequest(app); 