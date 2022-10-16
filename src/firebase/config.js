// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgtSLP6YRp6Tz8PCUTYQ5OUf-GPRgRr9A",
  authDomain: "sife-tablemaker.firebaseapp.com",
  projectId: "sife-tablemaker",
  storageBucket: "sife-tablemaker.appspot.com",
  messagingSenderId: "658231479519",
  appId: "1:658231479519:web:95d0140cfc1e38f911ed6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Firestore = getFirestore(app)
export const auth = getAuth(app)