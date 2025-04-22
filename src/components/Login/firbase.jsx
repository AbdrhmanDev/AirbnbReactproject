// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-pYhu-WchlSxFE7kwObX5148pl_FOT2U",
  authDomain: "login-640c9.firebaseapp.com",
  projectId: "login-640c9",
  storageBucket: "login-640c9.firebasestorage.app",
  messagingSenderId: "934614695570",
  appId: "1:934614695570:web:48e17e028a6b60c1d9f04b",
  measurementId: "G-NCDR42LEM6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
export default app;
