import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgbi0JHeqdMhjbz2daf-PyAUIouIMMRaA",
  authDomain: "wedding-guestbook-e607e.firebaseapp.com",
  projectId: "wedding-guestbook-e607e",
  storageBucket: "wedding-guestbook-e607e.firebasestorage.app",
  messagingSenderId: "826636249169",
  appId: "1:826636249169:web:e82b88aa40dfd7d6c47070",
  measurementId: "G-SE1L8NS6XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
