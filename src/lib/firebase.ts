// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxLJJ9w1v58qqZ_Vr0fvcjqZQar28aeG0",
  authDomain: "esports-hub-e7046.firebaseapp.com",
  databaseURL: "https://esports-hub-e7046-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esports-hub-e7046",
  storageBucket: "esports-hub-e7046.firebasestorage.app",
  messagingSenderId: "896704091656",
  appId: "1:896704091656:web:60c4272ca3996ebc9063bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);