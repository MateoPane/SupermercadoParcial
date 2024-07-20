const productosHome = [
  {
    id: 1,
    imagen: "../imgs/desodorante-axe-apollo-x-88-gr.jpg",
    nombre: "Desodorante AXE APOLLO",
    precio: 1990,
    stock: 10,
  },
  {
    id: 2,
    imagen: "../imgs/perfume-anotonio-banderas.jpg",
    nombre: "Perfume Antonio Banderas",
    precio: 45099,
    stock: 5,
  },
  {
    id: 3,
    imagen: "../imgs/teatrical-crema-facial-antiarrugas-200-g.jpg",
    nombre: "Crema Corporal Teatrical",
    precio: 9670,
    stock: 20,
  },
  {
    id: 4,
    imagen: "../imgs/perfume-verde.jpg",
    nombre: "Perfume Vertiver Terra",
    precio: 21700,
    stock: 8,
  },
];

const productosDos = [
  {
    id: 5,
    imagen: "../imgs/aceite-oliva.jpg",
    nombre: "Aceite de Oliva",
    precio: 8990,
    stock: 15,
  },
  {
    id: 6,
    imagen: "../imgs/gatorade-frutas-tropicales.jpg",
    nombre: "Gatorade Frutas Tropicales",
    precio: 1820,
    stock: 25,
  },
  {
    id: 7,
    imagen: "../imgs/harina-pureza.png",
    nombre: "Harina Pureza",
    precio: 1425,
    stock: 30,
  },
  {
    id: 8,
    imagen: "../imgs/cerveza-miller.jpeg",
    nombre: "Cerveza Pack x6 Miller",
    precio: 7600,
    stock: 12,
  },
];

function aplicarDescuento(productos, descuento) {
  return productos.map((producto) => {
    return {
      id: producto.id,
      imagen: producto.imagen,
      nombre: producto.nombre,
      precio: producto.precio - (producto.precio * descuento) / 100,
      stock: producto.stock,
    };
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  // Buscar el producto en productosHome
  let producto = productosHome.find((p) => p.id === id);

  // Si no se encuentra en productosHome, buscar en productosDos
  if (!producto) {
    producto = productosDos.find((p) => p.id === id);
  }

  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);

  if (isNaN(cantidad) || cantidad <= 0) {
    Swal.fire({
      title: "Cantidad inválida",
      html: "Por favor ingresa una cantidad válida.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  // Obtener el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificar si el producto ya está en el carrito
  let productoEnCarrito = carrito.find((p) => p.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  Swal.fire({
    title: "Producto agregado",
    html: `El producto <strong>${producto.nombre}</strong> ha sido agregado al carrito.`,
    icon: "success",
    confirmButtonText: "Ok",
  });
}

function cargarProductosHome() {
  let productosDescuento = aplicarDescuento(productosHome, 30);
  const contenedor = document.getElementById("productosHome");
  for (let i = 0; i < productosDescuento.length; i++) {
    const producto = productosDescuento[i];
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
              <img src="${producto.imagen}" alt="${
      producto.nombre
    }" width="100" height="100">
              <h3>${producto.nombre}</h3>
              <p class="precio"> <span class="descuento">30%</span> $${producto.precio.toFixed(
                2
              )}</p>
              <p>Stock: ${producto.stock}</p>
              <input type="number" id="cantidad-${
                producto.id
              }" min="0" value="0" placeholder="Cantidad">
            <button class="btn" onclick="agregarAlCarrito(${
              producto.id
            })">Agregar al carrito</button>
              `;
    contenedor.appendChild(div);
  }
}

function cargarProductosHomeDos() {
  let productosDescuento = aplicarDescuento(productosDos, 30);
  const contenedor = document.getElementById("productosDos");
  for (let i = 0; i < productosDescuento.length; i++) {
    const producto = productosDescuento[i];
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
                <img src="${producto.imagen}" alt="${
      producto.nombre
    }" width="100" height="100">
                <h3>${producto.nombre}</h3>
                <p class="precio"> <span class="descuento">30%</span> $${producto.precio.toFixed(
                  2
                )}</p>
                <p>Stock: ${producto.stock}</p>
                <input type="number" id="cantidad-${
                  producto.id
                }" min="0" value="0" placeholder="Cantidad">
                <button class="btn" onclick="agregarAlCarrito(${
                  producto.id
                })">Agregar al carrito</button>
              `;
    contenedor.appendChild(div);
  }
}

window.onload = function () {
  cargarProductosHome();
  cargarProductosHomeDos();
};
