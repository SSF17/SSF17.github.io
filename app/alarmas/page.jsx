"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DateTimePicker from 'react-datetime-picker';
import Nav from '/app/Nav';

function Alarmas() {
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [alarmas, setAlarmas] = useState([]);

    const handleAddAlarm = () => {
        setPopupOpen(true);
    };

    const handlePopupClose = () => {
        if (showConfirmation) {
            setPopupOpen(false);
            setShowConfirmation(false);
        } else {
            setShowConfirmation(true);
        }
    };

    const handleConfirmClose = () => {
        setPopupOpen(false);
        setShowConfirmation(false);
    };

    const handleDateTimeSelect = (event) => {
        const selectedDateTime = event.target.value;
        setSelectedDateTime(selectedDateTime);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      
        return currentDateTime;
      };
      
      const formatCurrentTime = (dateTime) => {
        const [datePart, timePart] = dateTime.split('T');
        const [hours, minutes] = timePart.split(':');
      
        const formattedTime = `${hours}:${minutes}`;
      
        return `${datePart}T${formattedTime}`;
      };
      
      const minDateTime = formatCurrentTime(getCurrentDateTime());
    const handleSave = () => {
        if (selectedDateTime.trim() === "") return;

        agregarAlarma(selectedDateTime);

        setPopupOpen(false);
        setSelectedDateTime(null);
    };

    const agregarAlarma = (hora) => {
        const fecha = new Date(hora);
        const fechaString = fecha.toLocaleDateString();
        const horaString = fecha.toLocaleTimeString();
      
        const nuevaAlarma = (
          <div>
            <div className="nueva-alarma">
              <h2>Fecha: {fechaString}</h2>
              <h2>Hora: {horaString}</h2>
            </div>
          </div>
        );
      
        setAlarmas([...alarmas, nuevaAlarma]);
      };
      
    return (
        <div className="alarmas">
            <Nav />
            <main className="alarmas">
                <section className="alarmas">
                    <h1 className="alarmas">Alarmas</h1>
                    <div className="container-alarma">
                        <h2>Alarma</h2>
                        <button className="agregar-alarma" onClick={handleAddAlarm}>
                            <img
                                src="/images/plus-sign.png"
                                className="dialogo"
                                alt="Signo de más"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                    {alarmas.map((alarma, index) => (
                        <div key={index}>{alarma}</div>
                    ))}
                </section>
            </main>
            {popupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        {showConfirmation ? (
                            <div className="confirmar-cierre">
                                <h2>Confirmar cierre</h2>
                                <button onClick={handleConfirmClose} className="boton-confirmar">Confirmar</button>
                                <button onClick={() => setShowConfirmation(false)} className="boton-cancelar">Cancelar</button>
                            </div>
                        ) : (
                            <>
                                <button className="close-button" onClick={handlePopupClose}>
                                <Image src= "/images/cancel-button.png" width={20} height={20} />
                                </button>
                                <h3>Seleccionar fecha y hora</h3>
                                <div className="seleccionar-hora">
                                <input type="datetime-local" onChange={handleDateTimeSelect} min={minDateTime} />
                                </div>
                                <button onClick={handleSave} className='boton-guardar'>Guardar</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Alarmas;
