// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuZtMxYBfhV9z8qQo3v6A7m4OXhdTR-CI",
  authDomain: "wetailor4u.firebaseapp.com",
  projectId: "wetailor4u",
  storageBucket: "wetailor4u.appspot.com",
  messagingSenderId: "963514950097",
  appId: "1:963514950097:web:d83164259fe8ddc62600f0",
  measurementId: "G-B017HK1VSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'uniqueAppName');
const auth = getAuth(app);

export { app, auth };
