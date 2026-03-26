import { db, collection, addDoc, getDocs } from "./firebase.js";

const btnAgregar = document.getElementById("btnAgregar");
const listaProductos = document.getElementById("listaProductos");
const carritoLista = document.getElementById("carritoLista");
const totalSpan = document.getElementById("total");
const btnPagar = document.getElementById("btnPagar");

const productosCol = collection(db, "productos");
let carrito = [];
let total = 0;

// Mostrar productos desde Firestore
async function mostrarProductos() {
    listaProductos.innerHTML = "";
    const snapshot = await getDocs(productosCol);
    snapshot.forEach(doc => {
        const producto = doc.data();
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio} - ${producto.categoria}`;

        const btnCarrito = document.createElement("button");
        btnCarrito.textContent = "Añadir al carrito";
        btnCarrito.addEventListener("click", () => agregarAlCarrito(producto));
        li.appendChild(btnCarrito);

        listaProductos.appendChild(li);
    });
}

// Agregar producto a Firestore
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

// Añadir al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    total += producto.precio;
    actualizarCarrito();
}

// Actualizar carrito en la página
function actualizarCarrito() {
    carritoLista.innerHTML = "";
    carrito.forEach((prod, index) => {
        const li = document.createElement("li");
        li.textContent = `${prod.nombre} - $${prod.precio}`;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            total -= carrito[index].precio;
            carrito.splice(index, 1);
            actualizarCarrito();
        });
        li.appendChild(btnEliminar);
        carritoLista.appendChild(li);
    });
    totalSpan.textContent = total.toFixed(2);
}

// Botón de pagar
btnPagar.addEventListener("click", () => {
    if(carrito.length === 0) return alert("Tu carrito está vacío!");
    alert(`¡Gracias por tu compra! Total: $${total.toFixed(2)}`);
    carrito = [];
    total = 0;
    actualizarCarrito();
});

// Mostrar productos al cargar
mostrarProductos();
