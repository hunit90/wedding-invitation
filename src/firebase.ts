// src/firebase.ts
import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore'; // Firestore 사용 시 주석 해제
// import { getDatabase } from 'firebase/database'; // Realtime Database 사용 시 주석 해제

// 파이어베이스 프로젝트 설정 값 입력 필요
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// 파이어베이스 초기화
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app); // Firestore 인스턴스
// const realtimeDb = getDatabase(app); // Realtime Database 인스턴스

export default app;
// export { db, realtimeDb };
