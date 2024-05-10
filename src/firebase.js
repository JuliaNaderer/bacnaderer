// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFfX6sh3fj05MVsfmTM36sy1OdR2AcJ-Y",
  authDomain: "testpwa-3194a.firebaseapp.com",
  projectId: "testpwa-3194a",
  storageBucket: "testpwa-3194a.appspot.com",
  messagingSenderId: "263410497873",
  appId: "1:263410497873:web:215fd47d9324a052583b70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);