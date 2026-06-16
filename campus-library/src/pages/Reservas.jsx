// Importa la función encargada de obtener las reservas almacenadas
// en el Local Storage de la aplicación.
import { getReserve } from "../localStorage/LSReserve.jsx";

// Importa los estilos específicos del componente.
import "./Reservas.css";

/**
 * Componente Reservas
 *
 * Muestra el listado de reservas realizadas por el usuario.
 * Si no existen reservas registradas, se muestra un mensaje informativo.
 * En caso contrario, se renderiza una tabla con los detalles de cada reserva.
 */
export default function Reservas() {
  // Obtiene todas las reservas almacenadas.
  const reservas = getReserve();

  return (
    <div className="reservasContainer">
      {/* Título principal de la sección */}
      <h1>Mis Reservas</h1>

      {/* 
        Validación para verificar si existen reservas.
        Si el arreglo está vacío, se muestra un mensaje.
        De lo contrario, se renderiza la tabla de reservas.
      */}
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
            {/*
              Recorre el arreglo de reservas y genera una fila
              por cada elemento encontrado.
            */}
            {reservas.map((reserva, index) => (
              <tr key={index}>
                {/* Nombre del libro reservado */}
                <td>{reserva.nombreLibro}</td>

                {/*
                  Estado actual de la reserva.
                  Nota: El evento onChange no es aplicable a un elemento <td>.
                  Si se desea ejecutar lógica cuando cambie el estado,
                  esta debería implementarse en un componente interactivo
                  como un input, select o mediante una actualización de estado.
                */}
                <td
                  onChange={() => {
                    // Validación del estado de la reserva.
                    // Actualmente esta condición no realiza ninguna acción.
                    // Además, debería utilizarse:
                    // reserva.estado.toLowerCase()
                    // ya que toLowerCase es un método.
                    if (reserva.estado.toLowerCase() === "aprobado") {
                      // Lógica futura para reservas aprobadas.
                    }
                  }}
                >
                  {reserva.estado}
                </td>

                {/* Fecha en la que inició la reserva */}
                <td>{reserva.fechaInicio}</td>

                {/* Fecha programada para la devolución del libro */}
                <td>{reserva.fechaEntrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}