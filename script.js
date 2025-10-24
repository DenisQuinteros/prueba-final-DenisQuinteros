const form = document.getElementById("formRegistro");
const tabla = document.getElementById("tablaUsuarios");
const mensaje = document.getElementById("mensaje");
const toggleTema = document.getElementById("toggleTema");

// Referencias a los inputs
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const inputPais = document.getElementById("pais");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Mostrar los usuarios guardados al iniciar
mostrarUsuarios();

/* === VALIDACIONES EN TIEMPO REAL === */

// Validar nombre en tiempo real
inputNombre.addEventListener("input", () => {
  const valor = inputNombre.value.trim();
  if (valor === "") {
    inputNombre.style.borderColor = "red";
  } else {
    inputNombre.style.borderColor = "#0077b6";
  }
});

// Validar correo en tiempo real
inputCorreo.addEventListener("input", () => {
  const valor = inputCorreo.value.trim();
  if (valor === "") {
    inputCorreo.style.borderColor = "red";
  } else if (!valor.includes("@")) {
    inputCorreo.style.borderColor = "orange";
  } else {
    inputCorreo.style.borderColor = "#0077b6";
  }
});

// Validar contraseña en tiempo real
inputPassword.addEventListener("input", () => {
  const valor = inputPassword.value;
  if (valor === "") {
    inputPassword.style.borderColor = "red";
  } else if (valor.length < 6) {
    inputPassword.style.borderColor = "orange";
  } else {
    inputPassword.style.borderColor = "#0077b6";
  }
});

// Validar país en tiempo real
inputPais.addEventListener("change", () => {
  const valor = inputPais.value;
  if (valor === "") {
    inputPais.style.borderColor = "red";
  } else {
    inputPais.style.borderColor = "#0077b6";
  }
});

/* === FORMULARIO DE REGISTRO === */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const correo = inputCorreo.value.trim();
  const password = inputPassword.value.trim();
  const pais = inputPais.value;

  if (!nombre || !correo || !password || !pais) {
    mostrarMensaje("⚠️ Todos los campos son obligatorios.", "error");
    return;
  }

  if (!correo.includes("@")) {
    mostrarMensaje("⚠️ El correo no es válido.", "error");
    return;
  }

  if (password.length < 6) {
    mostrarMensaje("⚠️ La contraseña debe tener al menos 6 caracteres.", "error");
    return;
  }

  const nuevoUsuario = { nombre, correo, pais };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
  // Disparar evento para React
  window.dispatchEvent(new Event('storage'));
  
  mostrarUsuarios();
  mostrarMensaje("✅ Usuario registrado correctamente.", "success");
  form.reset();
  
  // Resetear bordes
  inputNombre.style.borderColor = "#ccc";
  inputCorreo.style.borderColor = "#ccc";
  inputPassword.style.borderColor = "#ccc";
  inputPais.style.borderColor = "#ccc";
});

/* === MOSTRAR USUARIOS === */
function mostrarUsuarios() {
  tabla.innerHTML = "";
  usuarios.forEach((u) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td>${u.pais}</td>
    `;
    fila.style.animation = "fadeIn 0.5s ease";
    tabla.appendChild(fila);
  });
}

/* === MENSAJE VISUAL === */
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.style.color = tipo === "error" ? "red" : "green";
  mensaje.style.opacity = 1;
  setTimeout(() => (mensaje.style.opacity = 0), 2500);
}

/* === MODO OSCURO === */
toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const modoOscuroActivo = document.body.classList.contains("dark");
  toggleTema.textContent = modoOscuroActivo ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
  localStorage.setItem("modoOscuro", modoOscuroActivo);
});

// Restaurar el modo guardado
if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark");
  toggleTema.textContent = "☀️ Modo Claro";
}