// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKKLtmuK7zDE5y-jT4Senhq90G5b1C_OE",
  authDomain: "dbtestpatients.firebaseapp.com",
  projectId: "dbtestpatients",
  storageBucket: "dbtestpatients.appspot.com",
  messagingSenderId: "35080155801",
  appId: "1:35080155801:web:9f2c4e7553f617b103fe08",
  measurementId: "G-142VR4C9Q1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore(app);
