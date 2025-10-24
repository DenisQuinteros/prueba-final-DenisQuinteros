const form = document.getElementById("formRegistro");
const tabla = document.getElementById("tablaUsuarios");
const mensaje = document.getElementById("mensaje");
const toggleTema = document.getElementById("toggleTema");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Mostrar los usuarios guardados al iniciar
mostrarUsuarios();

/* === FORMULARIO DE REGISTRO === */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();
  const pais = document.getElementById("pais").value;

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
  
  // Disparar evento personalizado para que React lo escuche
  window.dispatchEvent(new Event('storage'));
  
  mostrarUsuarios();
  mostrarMensaje("✅ Usuario registrado correctamente.", "success");
  form.reset();
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
  
  // Log para debugging
  console.log("Modo oscuro:", modoOscuroActivo);
  console.log("Clases del body:", document.body.className);
});

// Restaurar el modo guardado
if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark");
  toggleTema.textContent = "☀️ Modo Claro";
}