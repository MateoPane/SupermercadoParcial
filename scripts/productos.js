// Lista de productos con precios y stock
const productos = [
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
  {
    id: 9,
    imagen: "../imgs/bimbo-hamburgesa.jpg",
    nombre: "Bimbo Artesano",
    precio: 1535,
    stock: 20,
  },
  {
    id: 10,
    imagen: "../imgs/branca-fernet.jpg",
    nombre: "Fernet Branca",
    precio: 9900,
    stock: 10,
  },
  {
    id: 11,
    imagen: "../imgs/cocacola.png",
    nombre: "Coca-cola",
    precio: 3100,
    stock: 50,
  },
  {
    id: 12,
    imagen: "../imgs/Hinds-Crema-Rosa-Beauty-x-250-ml-7794640173103_img1.png",
    nombre: "Crema Corporal Hinds",
    precio: 5200,
    stock: 20,
  },
  {
    id: 13,
    imagen: "../imgs/papas-mccain.png",
    nombre: "Papas McCain Tradicionales",
    precio: 4600,
    stock: 15,
  },
  {
    id: 14,
    imagen: "../imgs/doritos.png",
    nombre: "Doritos Sabor Queso",
    precio: 4069,
    stock: 25,
  },
  {
    id: 15,
    imagen: "../imgs/lays.jpg",
    nombre: "Papitas Lays Sabor Asado",
    precio: 3100,
    stock: 30,
  },
  {
    id: 16,
    imagen: "../imgs/palitos-pehuamar.png",
    nombre: "Palitos Pehuamar de Queso",
    precio: 1700,
    stock: 40,
  },
];

// Funcion para cargar los productos
function cargarProductos() {
  const contenedor = document.getElementById("productos");
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
        <div class="prodsTamaño"><img src="${producto.imagen}" alt="${
      producto.nombre
    }">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toFixed(2)}</p>
        <p>Stock: ${producto.stock}</p>
        <input type="number" id="cantidad-${
          producto.id
        }" min="0" value="0" placeholder="Cantidad">
        <button class="btn" onclick="agregarAlCarrito(${
          producto.id
        }, parseInt(document.getElementById('cantidad-${
      producto.id
    }').value))">Agregar al Carrito</button>
      </div>`;
    contenedor.appendChild(div);
  });
}
// Funcion para agregar al carrito
function agregarAlCarrito(id) {
  // Obtener el producto seleccionado por su id
  const producto = productos.find((p) => p.id === id);
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
window.onload = cargarProductos;
