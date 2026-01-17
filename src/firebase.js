// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ci5NWKzITHfOqYj9ANYd7VJ-mYijSMk",
  authDomain: "kqskq-78074.firebaseapp.com",
  projectId: "kqskq-78074",
  storageBucket: "kqskq-78074.firebasestorage.app",
  messagingSenderId: "674297563739",
  appId: "1:674297563739:web:1ccd8375c61d17fe0c8d7e",
  measurementId: "G-YD841YG930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Initialize and Export Auth & Firestore (REQUIRED for App.jsx to work)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;