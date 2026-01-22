import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZsRuM-4fYMcBAlCZ3js8ra1pywT2-U1I",
  authDomain: "sector-institute.firebaseapp.com",
  projectId: "sector-institute",
  storageBucket: "sector-institute.firebasestorage.app",
  messagingSenderId: "187024206730",
  appId: "1:187024206730:web:4f37bcb5920ccf5b313673",
  measurementId: "G-7E6R5RDJHP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // This connects to your Mumbai database