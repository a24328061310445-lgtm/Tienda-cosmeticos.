// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configuración de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyD3Cms2PyOYMCIYVgv_e0YtBHyZSqi6AOA",
  authDomain: "tienda-cosmeticos-c0e38.firebaseapp.com",
  projectId: "tienda-cosmeticos-c0e38",
  storageBucket: "tienda-cosmeticos-c0e38.appspot.com",
  messagingSenderId: "222333125235",
  appId: "1:222333125235:web:b4fef9bcf45076c7a96006"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
