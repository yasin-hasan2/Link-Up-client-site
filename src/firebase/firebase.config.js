// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const data = import.meta.env;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: data.VITE_apiKey,
  authDomain: data.VITE_authDomain,
  projectId: data.VITE_projectId,
  storageBucket: data.VITE_storageBucket,
  messagingSenderId: data.VITE_messagingSenderId,
  appId: data.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;