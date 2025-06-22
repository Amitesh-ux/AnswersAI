import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCjZR7T0Mslh-J08pIm9bMRsuF9F8ktiuk",
  authDomain: "answersai-dataviz.firebaseapp.com",
  projectId: "answersai-dataviz",
  storageBucket: "answersai-dataviz.firebasestorage.app",
  messagingSenderId: "713915916107",
  appId: "1:713915916107:web:c81bcb1033f4c8344752ce",
  measurementId: "G-HKT0VV3RN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;