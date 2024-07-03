import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyAYvv_7BBl9jd4_-bAYzIT93SUhMmG6yp4",
  authDomain: "tt-ebuddy.firebaseapp.com",
  projectId: "tt-ebuddy",
  storageBucket: "tt-ebuddy.appspot.com",
  messagingSenderId: "442943671787",
  appId: "1:442943671787:web:507cda2f53dea7e12d1dae",
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

export { admin, db };
