// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2PQs47pmHAehslIqHjiUmPzdkwP5fQA4",
  authDomain: "fixit-65dae.firebaseapp.com",
  projectId: "fixit-65dae",
  storageBucket: "fixit-65dae.firebasestorage.app",
  messagingSenderId: "335800910118",
  appId: "1:335800910118:web:f22f03b576a0d62abb01e7",
  measurementId: "G-NR9LY6N464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);