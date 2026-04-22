

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tomar Firebase Console theke pawa credentials ekhane boshau
const firebaseConfig = {
   apiKey: "AIzaSyC2gXXVwHgOJgMdEPcFfXNNTnD-0wjGTNA",
  authDomain: "remote-ready-c3562.firebaseapp.com",
  projectId: "remote-ready-c3562",
  storageBucket: "remote-ready-c3562.firebasestorage.app",
  messagingSenderId: "1095845952091",
  appId: "1:1095845952091:web:884a92f27b46757da4dd7e",
  measurementId: "G-JENS536T2W"
};

// Next.js client-side refresh-e jate bar bar app initialize na hoy, sheta handle kora
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Services export kora
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;