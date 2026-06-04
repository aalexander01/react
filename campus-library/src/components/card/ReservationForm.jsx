import { useState, useEffect } from "react";
import { saveReserve } from "../localStorage/LSReserve.jsx";
import "./ReservationForm.css";

export default function ReservationForm(props) {
    const [fromDate, setFromDate] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
  useEffect(() => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    const fechaActual = `${yyyy}-${mm}-${dd}`;

    setFechaInicio(fechaActual);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservando libro:", props.nombreLibro);
    console.log("Fecha inicio:", fechaInicio);
    console.log("Fecha entrega:", fechaEntrega);
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
  };
  return (
    <div className="reservationOverlay">
      <div className="reservationModal">

        <button
          className="closeBtn"
          onClick={props.onClose}
        >
          ✕
        </button>

        <div className="modalHeader">
          <h2>Generar Reserva</h2>
          <p>Completa la información para reservar el libro.</p>
        </div>

        <div className="bookBox">
          <span>Libro seleccionado</span>
          <h3>{props.nombre}</h3>
        </div>

        <form className="reservationForm">
          <div className="inputGroup">
            <label>Fecha de inicio</label>
            <input type="date" defaultValue={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}/>
          </div>

          <div className="inputGroup">
            <label>Fecha de entrega</label>
            <input  type="date" defaultValue={fechaInicio} min={fechaInicio} onChange={(e) => setFechaEntrega(e.target.value)}/>
          </div>

          <button
            type="submit"
            className="reserveButton"
            onClick={() =>
                saveReserve({
                    nombreLibro: props.nombreLibro,
                    fechaInicio,
                    fechaEntrega,
                    onClose: props.onClose
                }
                
                )
            }
          >
            Generar Reserva
          </button>
        </form>

      </div>
    </div>
  );
}