
export function saveHistory(props) {
  const hoy = new Date();

  const fechaActual = `${hoy.getFullYear()}-${
  String(hoy.getMonth() + 1).padStart(2, "0")
  }-${
    String(hoy.getDate()).padStart(2, "0")
  } ${
    String(hoy.getHours()).padStart(2, "0")
  }:${
    String(hoy.getMinutes()).padStart(2, "0")
  }:${
    String(hoy.getSeconds()).padStart(2, "0")
  }`;

  const nuevoHistorial = {
    nombreLibro: props.nombre,
    fecha: fechaActual
  };

  const historiales =
    JSON.parse(localStorage.getItem("historial")) || [];

  historiales.push(nuevoHistorial);

  localStorage.setItem("historial", JSON.stringify(historiales));

  console.log("Guardado OK:", nuevoHistorial);
}

/**
 * @typedef {Object} History
 * @property {string} nombreLibro
 * @property {string} estado
 * @property {string} fechaInicio
 * @property {string} fechaFin
 */

/**
 * @returns {History[]}
 */
export function getHistory(){
  const historial =
    JSON.parse(localStorage.getItem("historial")) || [];

  return historial;

} 