// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Esto es para usar la base de datos

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3Cms2PyOYMCIYVgv_e0YtBHyZSqi6AOA",
  authDomain: "tienda-cosmeticos-c0e38.firebaseapp.com",
  projectId: "tienda-cosmeticos-c0e38",
  storageBucket: "tienda-cosmeticos-c0e38.firebasestorage.app",
  messagingSenderId: "222333125235",
  appId: "1:222333125235:web:b4fef9bcf45076c7a96006"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore para usarlo en otros archivos
export const db = getFirestore(app);