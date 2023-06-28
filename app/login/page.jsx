import Link from "next/link";

function LoginPage() {
  return (
    <main className="datos">
      <div className="fuera">
        <div className="dentro">
          <form>
            <h1 className="datos">Iniciar sesión</h1>
            <input
              type="email"
              placeholder="Email"
            />
            <input
              type="password"
              placeholder="Contraseña"
            />
            <Link href="/registro">
              ¿Aún no tienes cuenta?
            </Link>
            <button type="submit" className="boton" >Iniciar sesión</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;