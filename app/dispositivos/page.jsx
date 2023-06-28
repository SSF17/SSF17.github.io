"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '../Nav';

function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [nombreDispositivo, setNombreDispositivo] = useState('');
  const [mostrarCampo, setMostrarCampo] = useState(false);

  const handleNombreDispositivoChange = (e) => {
    setNombreDispositivo(e.target.value);
  };

  const agregarDispositivo = () => {
    if (nombreDispositivo.trim() === '') return;
    const nuevoDispositivo = (
      <div className="nuevo-dispositivo">
        <img src="/images/idea.png" className="luz" />
        <h2>{nombreDispositivo}</h2>
        <div className="ajuste-dispositivo">
          <button className="ajuste-dispositivo">
            <img src="/images/setting blanco.png" alt="Ajustes" className="imagen-dispositivo" />
            <h2>Ajustes</h2>
          </button>
        </div>
      </div>
    );

    setDispositivos([...dispositivos, nuevoDispositivo]);
    setNombreDispositivo('');
    setMostrarCampo(false);
  
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      agregarDispositivo();
    }
  };

  return (
    <div className="dispositivos">
      <Nav />
      <main className="dispositivos">
        <section className="section-dispositivos">
          <h1 className="dispositivos">Dispositivos</h1>
          <div className="container-dispositivos">
            <h2>Todos los dispositivos</h2>
            {mostrarCampo ? (
              <div className="agregar">
                <input
                  type="text"
                  value={nombreDispositivo}
                  onKeyDown={handleKeyDown}
                  onChange={handleNombreDispositivoChange}
                  placeholder="Ingresa el nombre del dispositivo"
                />
                <button className="Agregar-dispositivo" onClick={agregarDispositivo}>
                Agregar
                </button>
              </div>
            ) : (
              <button className="agregar-dispositivo" onClick={() => setMostrarCampo(true)}>
                <Image src="/images/plus-sign.png" className="dialogo" alt="Signo de más" width={20} height={20} />
              </button>
            )}
          </div>
          {dispositivos.map((dispositivo, index) => (
            <div key={index}>{dispositivo}</div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dispositivos;