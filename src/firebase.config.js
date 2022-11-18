import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdD2pjm7b0jPb9p6adrtadLKSdShTg0QQ",
  authDomain: "house-marketplace-app-f36b5.firebaseapp.com",
  projectId: "house-marketplace-app-f36b5",
  storageBucket: "house-marketplace-app-f36b5.appspot.com",
  messagingSenderId: "954974595181",
  appId: "1:954974595181:web:92944870a964aec9cff764"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(); 