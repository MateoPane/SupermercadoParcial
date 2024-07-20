document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // Datos del form
  let nombre = document.getElementById("nombre").value.trim();
  let apellido = document.getElementById("apellido").value.trim();
  let email = document.getElementById("email").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let comentarios = document.getElementById("comentarios").value.trim();

  //Variable si se cumplen las validaciones se envie, sino frena el envio
  let hasError = false;

  // Limpiar mensajes de error previos
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));
  document.getElementById("form-message").textContent = "";

  if (!nombre) {
    document.getElementById("error-nombre").textContent =
      "El nombre es obligatorio.";
    hasError = true;
  }

  if (!apellido) {
    document.getElementById("error-apellido").textContent =
      "El apellido es obligatorio.";
    hasError = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("error-email").textContent =
      "El email no tiene un formato válido.";
    hasError = true;
  }

  let telefonoValido = /^\+54\d{10,15}$/;
  if (!telefonoValido.test(telefono)) {
    document.getElementById("error-telefono").textContent =
      "El teléfono debe comenzar con +54 y tener entre 10 y 15 dígitos.";
    hasError = true;
  }

  if (hasError) {
    return;
  }

  let informacion = [
    `Nombre: ${nombre}, Apellido: ${apellido}, Email: ${email}, Telefono: ${telefono}, Comentarios: "${comentarios}"`,
  ];
  let blob = new Blob([informacion], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "contacto.txt");
});
