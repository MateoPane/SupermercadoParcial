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

let productosHomeDescuento = [];
let productosDosDescuento = [];

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

function agregarAlCarrito(id) {
  // Buscar el producto en productosHomeDescuento
  let producto = productosHomeDescuento.find((p) => p.id === id);

  // Si no se encuentra en productosHomeDescuento, busca en productosDosDescuento
  if (!producto) {
    producto = productosDosDescuento.find((p) => p.id === id);
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
  if (cantidad > producto.stock) {
    Swal.fire({
      title: "Stock insuficiente",
      html: `No hay suficiente stock de <strong>${producto.nombre}</strong>`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }
  // Obtener el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificar si el producto esta en el carrito
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
  productosHomeDescuento = aplicarDescuento(productosHome, 30);
  const contenedor = document.getElementById("productosHome");
  productosHomeDescuento.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <div class="prodsTamaño"><img src="${producto.imagen}" alt="${
      producto.nombre
    }">
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
      </div>`;
    contenedor.appendChild(div);
  });
}

function cargarProductosHomeDos() {
  productosDosDescuento = aplicarDescuento(productosDos, 30);
  const contenedor = document.getElementById("productosDos");
  productosDosDescuento.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <div class="prodsTamaño"><img src="${producto.imagen}" alt="${
      producto.nombre
    }">
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
      </div>`;
    contenedor.appendChild(div);
  });
}

window.onload = function () {
  cargarProductosHome();
  cargarProductosHomeDos();
};
