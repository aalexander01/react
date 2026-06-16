
/**
 * Guarda un registro en el historial de acciones del usuario
 * en localStorage, incluyendo el nombre del libro y la fecha/hora actual.
 *
 * @param {Object} props - Objeto con la información del libro.
 * @param {string} props.nombre - Nombre del libro a registrar.
 */
export function saveHistory(props) {
  // Obtiene la fecha y hora actual del sistema
  const hoy = new Date();

   /**
   * Formatea la fecha en formato:
   * YYYY-MM-DD HH:mm:ss
   */
  const fechaActual = formatDate();

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
 * Obtiene todo el historial de acciones almacenado en localStorage.
 *
 * @returns {Array<Object>} Lista de registros del historial.
 */
export function getHistory(){
  const historial =
    JSON.parse(localStorage.getItem("historial")) || [];

  return historial;

} 

/**
   * Formatea la fecha en formato:
   * YYYY-MM-DD HH:mm:ss
*/
function formatDate() {
  const d = new Date();

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}