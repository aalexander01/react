import { getReserve } from "../localStorage/LSReserve.jsx";
import "./Reservas.css";

export default function Reservas() {
  const reservas = getReserve();

  return (
    <div className="reservasContainer">
      <h1>Mis Reservas</h1>

      {reservas.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        <table className="reservasTable">
          <thead>
            <tr>
              <th>Nombre del libro</th>
              <th>Estado</th>
              <th>Fecha de inicio</th>
              <th>Fecha de entrega</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.nombreLibro}</td>
                <td>{reserva.estado}</td>
                <td>{reserva.fechaInicio}</td>
                <td>{reserva.fechaEntrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}