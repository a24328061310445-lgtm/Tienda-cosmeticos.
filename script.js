import { db, collection, addDoc, getDocs } from "./firebase.js";

const btnAgregar = document.getElementById("btnAgregar");
const listaProductos = document.getElementById("listaProductos");

// Colección Firestore
const productosCol = collection(db, "productos");

// Función para mostrar productos en la página
async function mostrarProductos() {
    listaProductos.innerHTML = "";
    const snapshot = await getDocs(productosCol);
    snapshot.forEach(doc => {
        const producto = doc.data();
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} - ${producto.categoria}`;
        listaProductos.appendChild(li);
    });
}

// Función para agregar producto
btnAgregar.addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;

    if (!nombre || !precio || !categoria) {
        alert("Llena todos los campos");
        return;
    }

    await addDoc(productosCol, { nombre, precio, categoria });

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("categoria").value = "";

    mostrarProductos();
});

// Mostrar productos al cargar la página
mostrarProductos();
