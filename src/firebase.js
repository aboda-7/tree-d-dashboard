// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBujUwrcz8HyF53K8XiaEWgUzPX91c8Dm8",
  authDomain: "treed-f2f2d.firebaseapp.com",
  projectId: "treed-f2f2d",
  storageBucket: "treed-f2f2d.firebasestorage.app",
  messagingSenderId: "1085721735071",
  appId: "1:1085721735071:web:ae49a7fb89df9ab1ab57aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
