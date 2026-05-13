import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNJYpPNt8X_WRGYl_k7xAJirSOKz6mq7I",
  authDomain: "smartsummer.firebaseapp.com",
  projectId: "smartsummer",
  storageBucket: "smartsummer.firebasestorage.app",
  messagingSenderId: "554241139938",
  appId: "1:554241139938:web:f127116ed0ddb1d9c42abb",
  measurementId: "G-L7HW4NZSL5",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
