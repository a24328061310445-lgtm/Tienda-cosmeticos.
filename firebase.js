// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU-APIKEY",
  authDomain: "TU-PROYECTO.firebaseapp.com",
  projectId: "TU-PROYECTO",
  storageBucket: "TU-PROYECTO.appspot.com",
  messagingSenderId: "TU-SENDER-ID",
  appId: "TU-APP-ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
