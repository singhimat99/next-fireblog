// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUWHSFiBT2wjF4Bh41SsCJ9o43UBak0Uk",
  authDomain: "fireblog-ace5d.firebaseapp.com",
  projectId: "fireblog-ace5d",
  storageBucket: "fireblog-ace5d.appspot.com",
  messagingSenderId: "825559189958",
  appId: "1:825559189958:web:4f5f258d26fb534d0d0ac7"
};
let app;
// Initialize Firebase
if (!getApps.length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const database = getFirestore();
export const storage = getStorage(app);