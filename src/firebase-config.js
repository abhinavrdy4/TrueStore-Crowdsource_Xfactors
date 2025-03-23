// firebase-config.js
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCBMK0D94p1W2Fyfx_Qsbc-Er-Rr2ckIA",
    authDomain: "crowdsource-b266e.firebaseapp.com",
    projectId: "crowdsource-b266e",
    storageBucket: "crowdsource-b266e.firebasestorage.app",
    messagingSenderId: "16866966697",
    appId: "1:16866966697:web:2abc5f873c150fcf21bdb8",
    measurementId: "G-J6PWY80GL4"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
  export const db = getFirestore(app);
  
  // Optionally restrict sign-ins to Bits Goa domain:
  googleProvider.setCustomParameters({
    hd: 'goa.bits-pilani.ac.in',
  });
