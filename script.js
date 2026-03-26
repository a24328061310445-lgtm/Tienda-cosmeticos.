import { db } from './firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

let carrito = [];

// 🔄 Cargar productos
async function cargarProductos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((docSnap) => {
    const p = { id: docSnap.id, ...docSnap.data() };

    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nombre} - $${p.precio} (${p.categoria})
      <div>
        <button class="btnCarrito" onclick='agregarAlCarrito(${JSON.stringify(p)})'>🛒</button>
        <button data-id="${p.id}" class="btnEliminar">❌</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// ➕ Agregar producto
async function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value;

  if (!nombre || !precio || !categoria) {
    alert("⚠️ Llena todos los campos");
    return;
  }

  await addDoc(collection(db, "productos"), { nombre, precio, categoria });

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";

  cargarProductos();
}

// 🗑️ Eliminar producto
async function eliminarProducto(id) {
  await deleteDoc(doc(db, "productos", id));
  cargarProductos();
}

// Evento eliminar
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("btnEliminar")) {
    const id = e.target.getAttribute("data-id");
    eliminarProducto(id);
  }
});

// 🛒 Carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  renderCarrito();
}

function renderCarrito() {
  const lista = document.getElementById("carritoLista");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((p, index) => {
    total += p.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nombre} - $${p.precio}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  renderCarrito();
}

// 💳 Pagar
document.getElementById("btnPagar").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("🛒 Tu carrito está vacío");
    return;
  }
  alert("💖 Compra realizada con éxito 💳✨");
  carrito = [];
  renderCarrito();
});

// 🔍 Buscador
document.getElementById("buscador").addEventListener("input", function () {
  const texto = this.value.toLowerCase();
  const items = document.querySelectorAll("#lista li");

  items.forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(texto) ? "flex" : "none";
  });
});

// 🎯 Botón agregar
document.getElementById("btnAgregar").addEventListener("click", agregarProducto);

// 🚀 Iniciar
cargarProductos();
