const API = "https://tienda-cosmeticos-4lfg.onrender.com"; // reemplaza con tu URL de Render después

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Cargar productos
async function cargarProductos() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    data.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${p.nombre} - $${p.precio} (${p.categoria})
        <div>
          <button class="btnCarrito" onclick='agregarAlCarrito(${JSON.stringify(p)})'>🛒</button>
          <button data-id="${p._id}" class="btnEliminar">❌</button>
        </div>
      `;
      lista.appendChild(li);
    });
  } catch (error) {
    console.log("❌ Error al cargar:", error);
  }
}

// Agregar producto
async function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;
  if (!nombre || !precio || !categoria) { alert("⚠️ Llena todos los campos"); return; }

  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio: Number(precio), categoria })
    });

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("categoria").value = "";

    cargarProductos();
  } catch (error) {
    console.log("❌ Error al agregar:", error);
  }
}

// Eliminar producto
async function eliminarProducto(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarProductos();
  } catch (error) {
    console.log("❌ Error al eliminar:", error);
  }
}

// Delegación eliminar
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("btnEliminar")) {
    const id = e.target.getAttribute("data-id");
    eliminarProducto(id);
  }
});

// Carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
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
    li.innerHTML = `${p.nombre} - $${p.precio} <button onclick="eliminarDelCarrito(${index})">❌</button>`;
    lista.appendChild(li);
  });
  totalSpan.textContent = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

// Pagar
document.getElementById("btnPagar").addEventListener("click", () => {
  if (carrito.length === 0) { alert("🛒 Tu carrito está vacío"); return; }
  alert("💖 Compra realizada con éxito 💳✨");
  carrito = [];
  localStorage.removeItem("carrito");
  renderCarrito();
});

// Buscador
document.getElementById("buscador").addEventListener("input", function () {
  const texto = this.value.toLowerCase();
  const items = document.querySelectorAll("#lista li");
  items.forEach(li => li.style.display = li.textContent.toLowerCase().includes(texto) ? "flex" : "none");
});

// Botón agregar
document.getElementById("btnAgregar").addEventListener("click", agregarProducto);

// Inicio
cargarProductos();
renderCarrito();
