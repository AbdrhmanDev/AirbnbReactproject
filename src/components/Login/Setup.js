
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyARJbW4lo5FZ10oN1rgy0qODlF1-xb5vW4",
  authDomain: "airbnb-cec8f.firebaseapp.com",
  projectId: "airbnb-cec8f",
  storageBucket: "airbnb-cec8f.firebasestorage.app",
  messagingSenderId: "41414985756",
  appId: "1:41414985756:web:37f56568a76709842df7d9"
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)