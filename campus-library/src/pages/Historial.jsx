import { useState } from "react";
import {getHistory} from "../localStorage/LSHistory.jsx"
import "./Historial.css";

/**
 * Componente Historial
 * Muestra el historial de navegación (libros) almacenado localmente
 * y permite ordenarlo por fecha en orden ascendente o descendente.
 */
export default function Historial(props) {
  // Estado que controla el orden de la lista (ascendente o descendente)
  const [order, setOrder] = useState("asc");
 
  /**
   * Obtiene el historial desde localStorage y lo ordena por fecha
   * dependiendo del estado actual (order).
   */
  const historys = getHistory().sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);

    // Si el orden es ascendente, se ordena de más antiguo a más reciente
    // Si es descendente, se invierte el orden
    return order === "asc"
      ? fechaA - fechaB
      : fechaB - fechaA;
  });
  return (

  
      <>
        
        <div className="historyContainer">
        {/* Título de la sección */}
        <h1>Historial</h1>
        {/* Acciones de la tabla (botón de ordenamiento) */}
        <div className="tableActions">
        <button
        className="sortButton"
        onClick={() =>
          // Alterna entre orden ascendente y descendente
          setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      >
        {/* Texto dinámico según el estado del orden */}
        {order === "asc" ? "↑ Ascendente" : "↓ Descendente"}
      </button>
      </div>
      {/* Renderizado condicional:
            - Si no hay historial, muestra mensaje informativo
            - Si hay datos, muestra la tabla */}
      {historys.length === 0 ? (
        <p>Historial de navegacion vacio.</p>
      ) : (
        <table className="historyTable">
          {/* Encabezados de la tabla */}
          <thead>
            <tr>
              <th>Nombre del libro</th>
              <th>Fecha</th>
            </tr>
          </thead>
          {/* Cuerpo de la tabla con los registros del historial */}
          <tbody>
            {historys.map((history, index) => (
              <tr key={index}>
                <td>{history.nombreLibro}</td>
                <td>{history.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      </>
  );
}