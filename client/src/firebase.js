// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBboPNaRcTDQQyO7qfEUjN0dlVPFKVCvgc",
  authDomain: "laptop-ed1eb.firebaseapp.com",
  projectId: "laptop-ed1eb",
  storageBucket: "laptop-ed1eb.appspot.com",
  messagingSenderId: "162404922216",
  appId: "1:162404922216:web:7a4ecc7c45317326aa5cdd",
  measurementId: "G-J3QYDMY46H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
