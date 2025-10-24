import { useState, useEffect } from "react";

export default function ContadorUsuarios() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Función para actualizar el contador
    const actualizarContador = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      setTotal(usuarios.length);
    };

    // Actualizar al cargar
    actualizarContador();

    // Escuchar cambios en localStorage
    window.addEventListener("storage", actualizarContador);

    // Observar cambios en la tabla
    const tabla = document.querySelector("#tablaUsuarios");
    if (tabla) {
      const observer = new MutationObserver(actualizarContador);
      observer.observe(tabla, { childList: true });
      
      return () => {
        observer.disconnect();
        window.removeEventListener("storage", actualizarContador);
      };
    }
  }, []);

  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "20px",
      fontSize: "18px",
      fontWeight: "bold",
      color: "#0077b6"
    }}>
      <h3>👥 Total de usuarios registrados: {total}</h3>
    </div>
  );
}