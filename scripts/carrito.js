// Función para cargar los productos del carrito en la página
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carrito");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de cargar
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }
  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}" width="100" height="100">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio}</p>
          <p>Cantidad: ${producto.cantidad}</p>
        `;
    contenedor.appendChild(div);
  });
}
// Función para vaciar el carrito
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás recuperar los productos después de vaciar el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vacíalo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito"); // Elimina el carrito del localStorage
      cargarCarrito(); // Actualiza la vista del carrito
      Swal.fire("Vacío!", "El carrito ha sido vaciado.", "success");
    }
  });
}
/* --------------------- Funcion Comprar ---------------------*/
// Función para procesar la compra
function comprar() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  let total = 0;
  let error = false;
  let seleccionoProducto = false;

  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "El carrito está vacío.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }
  carrito.forEach((producto) => {
    if (producto.cantidad > 0) {
      seleccionoProducto = true;
      if (producto.cantidad > producto.stock) {
        Swal.fire({
          title: "Stock insuficiente",
          html: `No hay suficiente stock de <strong>${producto.nombre}</strong>`,
          icon: "error",
          confirmButtonText: "Ok",
        });
        error = true;
      } else {
        total += producto.cantidad * producto.precio;
      }
    }
  });

  if (!error) {
    if (seleccionoProducto) {
      // Mostrar formulario de pago
      Swal.fire({
        title: "Compra realizada",
        html: `
            <p>Total de la compra: <strong>$${total.toFixed(2)}</strong></p>
            <form id="paymentForm">
              <div class="form-group">
                <label for="cardNumber">Número de tarjeta:</label>
                <input type="text" id="cardNumber" class="swal2-input" placeholder="Número de tarjeta" maxlength="16" required>
              </div>
              <div class="form-group">
                <label for="expiryDate">Fecha de expiración:</label>
                <input type="text" id="expiryDate" class="swal2-input" placeholder="MM/AA" maxlength="5" required>
              </div>
              <div class="form-group">
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" class="swal2-input" placeholder="CVV" maxlength="3" required>
              </div>
            </form>
          `,
        showCancelButton: true,
        confirmButtonText: "Pagar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const cardNumber = Swal.getPopup().querySelector("#cardNumber").value;
          const expiryDate = Swal.getPopup().querySelector("#expiryDate").value;
          const cvv = Swal.getPopup().querySelector("#cvv").value;

          if (!cardNumber || !expiryDate || !cvv) {
            Swal.showValidationMessage("Por favor complete todos los campos.");
            return false;
          }
          return {
            cardNumber,
            expiryDate,
            cvv,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Mensaje de confirmacion con el valor total en negrita
          Swal.fire({
            title: "Compra completada",
            html: `Valor total de su compra: <strong>$${total.toFixed(
              2
            )}</strong>`,
            icon: "success",
            confirmButtonText: "Ok",
          });
          //Borra lo que habia en el carrito luego de comprar
          localStorage.removeItem("carrito");
          cargarCarrito();
        }
      });
    }
  }
}
// Cargar los productos del carrito cuando se carga la página
window.onload = cargarCarrito;
