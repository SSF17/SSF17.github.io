"use client"
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

function RegisterPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("nombre");
    const email = formData.get("email");
    const password = formData.get("contrasena");

    try {
      const response = await axios.post("/app/registro", { name, email, password });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error en el servidor", error);
      setMessage("Error en el servidor");
    }
  };

  return (
    <main className="datos">
      <div className="fuera">
        <div className="dentro">
          <h1 className="datos">Registro</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="contrasena"
            />
            <Link href="login">¿Ya tienes cuenta?</Link>
            <button type="submit" className="boton">Registrarme</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
