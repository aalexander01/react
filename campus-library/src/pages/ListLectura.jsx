// Importa el hook useState para manejar el estado local del componente
import { useState } from "react";

// Importa la función que obtiene la lista de lecturas desde Local Storage
import { getListLecture } from "../localStorage/LSListLectura";

/**
 * Componente ListLectura
 *
 * Muestra un listado de lecturas almacenadas en Local Storage.
 * Permite ordenar las lecturas por fecha de inicio en orden ascendente o descendente.
 */
export default function ListLectura() {
  // Estado que controla el tipo de ordenamiento: ascendente o descendente
  const [order, setOrder] = useState("asc");

  /**
   * Obtiene las lecturas almacenadas y las ordena según la fecha de inicio.
   * Se realiza una conversión a objeto Date para poder comparar correctamente.
   */
  const lectures = getListLecture().sort((a, b) => {
    const fechaA = new Date(a.fechaInicio);
    const fechaB = new Date(b.fechaInicio);

    // Ordenamiento dinámico según el estado "order"
    return order === "asc" ? fechaA - fechaB : fechaB - fechaA;
  });

  return (
    <>
      <div className="historyContainer">
        <div className="tableActions">
          {/* Botón que alterna el orden de las lecturas */}
          <button
            className="sortButton"
            onClick={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {/* Texto dinámico del botón según el orden actual */}
            {order === "asc" ? "↑ Ascendente" : "↓ Descendente"}
          </button>
        </div>

        {/* Validación: si no hay lecturas, se muestra un mensaje */}
        {lectures.length === 0 ? (
          <p>Listado de lecturas vacío.</p>
        ) : (
          <table className="historyTable">
            <thead>
              <tr>
                <th>Nombre del libro</th>
                <th>Estado</th>
                <th>Página</th>
                <th>Fecha inicio</th>
                <th>Fecha entrega</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {/* Recorre la lista de lecturas y genera una fila por cada una */}
              {lectures.map((lecture, index) => (
                <tr key={index}>
                  {/* Nombre del libro asociado a la lectura */}
                  <td>{lecture.nombreLibro}</td>

                  {/* Estado actual de la lectura */}
                  <td>{lecture.estado}</td>

                  {/* Página en la que se encuentra la lectura */}
                  <td>{lecture.pagina}</td>

                  {/* Fecha en la que inició la lectura */}
                  <td>{lecture.fechaInicio}</td>

                  {/* Fecha estimada o final de entrega */}
                  <td>{lecture.fechaFin}</td>

                  {/* Botón de acción para ver detalles del libro */}
                  <td>
                    <button>Ver Libro</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}