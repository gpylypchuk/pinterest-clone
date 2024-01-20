// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrDy3r4Sy_PEPCP6b-mXCWXumokFbjvP0",
  authDomain: "bestyle-f2dbb.firebaseapp.com",
  projectId: "bestyle-f2dbb",
  storageBucket: "bestyle-f2dbb.appspot.com",
  messagingSenderId: "859785737921",
  appId: "1:859785737921:web:6b99c702d82d141dc00640",
  measurementId: "G-DBDQN08JDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;