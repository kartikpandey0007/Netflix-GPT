// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2r7oxegrITNqgnoHGIzjqbGfJr23xFs8",
  authDomain: "netflix-gpt-82bd4.firebaseapp.com",
  projectId: "netflix-gpt-82bd4",
  storageBucket: "netflix-gpt-82bd4.firebasestorage.app",
  messagingSenderId: "343179715461",
  appId: "1:343179715461:web:102ec8e912357b89b11aec",
  measurementId: "G-DYK9K6N4VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);