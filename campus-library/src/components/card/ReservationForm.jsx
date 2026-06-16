import { useState, useEffect } from "react";
import { saveReserve } from "../../localStorage/LSReserve.jsx";
import "./ReservationForm.css";

/**
 * Componente modal para la creación de reservas de libros.
 *
 * Funcionalidades:
 * - Muestra el libro seleccionado.
 * - Establece automáticamente la fecha actual como fecha de inicio.
 * - Permite seleccionar una fecha de entrega.
 * - Guarda la reserva utilizando localStorage.
 */
export default function ReservationForm(props) {

    // Estado para almacenar la fecha seleccionada por el usuario.
    const [fromDate, setFromDate] = useState("");
    // Fecha de inicio de la reserva.
    const [fechaInicio, setFechaInicio] = useState("");
    // Fecha de inicio de la reserva.
    const [fechaEntrega, setFechaEntrega] = useState("");

  /**
   * Al montar el componente se obtiene la fecha actual
   * y se establece como fecha inicial por defecto.
   */
  useEffect(() => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    const fechaActual = `${yyyy}-${mm}-${dd}`;

    setFechaInicio(fechaActual);
  }, []);

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

          {/* Botón que genera y almacena la reserva */}
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