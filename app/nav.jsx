"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Nav() {
  const [navVisible, setNavVisible] = useState(true);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className={`nav-container ${navVisible ? '' : 'collapsed'}`}>
      <button onClick={toggleNav} className="ocultar">
        <img src="\images\identical-to-mathematical-symbol.png" className='lineas' alt="Icono" />
      </button>
      <nav className="navegar">
        <Link href="/alarmas">
          <div className="img-container">
            <img src="/images/alarm-clock blanco.png" alt="Alarms" />
            {navVisible && <h2>Alarmas</h2>}
          </div>
        </Link>
        <Link href="/dispositivos">
          <div className="img-container">
            <img src="/images/lightbulb blanco.png" alt="light" />
            {navVisible && <h2>Dispositivos</h2>}
          </div>
        </Link>
        <Link href="/estadisticas">
          <div className="img-container">
            <img src="/images/graph blanco.png" alt="Chart" />
            {navVisible && <h2>Estadisticas</h2>}
          </div>
        </Link>
        <div className="partedeabajo">
          <Link href="/configuracion">
            <div className="img-container">
              <img src="/images/setting blanco.png" alt="Setting" />
              {navVisible && <h2>Configuración</h2>}
            </div>
          </Link>
          <Link href="#">
            <div className="img-container">
              <img src="/images/exit blanco.png" alt="Setting" />
              {navVisible && <h2>Log out</h2>}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav;