// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: "next-blog-app-v4.firebaseapp.com",
  projectId: "next-blog-app-v4",
  storageBucket: "next-blog-app-v4.appspot.com",
  messagingSenderId: "500822403644",
  appId: "1:500822403644:web:04c1bcdcccc68f82b8b139",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
