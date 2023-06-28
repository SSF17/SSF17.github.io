
import Image from 'next/image'
import Link from "next/link";
import "./globals.css";
function Home() {
  return (
      <main className="Home">
        <div className="home">
          <Link href="/login" className="loginInicio">Login</Link>
          <Link href="/registro" className="registroInicio">Registrarse</Link>
        </div>
      </main>
  )
}
export default Home