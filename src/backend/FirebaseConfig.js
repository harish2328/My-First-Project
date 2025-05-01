// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALVaOC_TpHtynkdRg-EntyvzJWbQ9ElHE",
  authDomain: "innovators-hub-music-821fb.firebaseapp.com",
  projectId: "innovators-hub-music-821fb",
  storageBucket: "innovators-hub-music-821fb.firebasestorage.app",
  messagingSenderId: "670882459863",
  appId: "1:670882459863:web:e6c3f2858e38f1d0b40092",
  measurementId: "G-DLQ321V1SK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __Auth=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)
