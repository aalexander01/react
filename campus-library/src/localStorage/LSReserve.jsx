/**
 * Crea y guarda una nueva reserva en localStorage.
 * La reserva se inicializa con estado "reservado".
 *
 * @param {Object} props - Datos de la reserva.
 * @param {string} props.nombreLibro - Nombre del libro a reservar.
 * @param {string} props.fechaInicio - Fecha de inicio de la reserva.
 * @param {string} [props.fechaEntrega] - Fecha de entrega (opcional).
 * @param {Function} props.onClose - Función para cerrar el modal.
 */
export function saveReserve(props) {
    const nuevaReserva = {
      nombreLibro: props.nombreLibro,
      estado: "reservado",
      fechaInicio: props.fechaInicio,
      fechaEntrega: props.fechaEntrega || props.fechaInicio
    };

    // obtener existentes
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    // agregar nueva
    reservas.push(nuevaReserva);

    // guardar
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // cerrar modal
    props.onClose;
  }


/**
 * Representa una reserva almacenada en el sistema.
 *
 * @typedef {Object} Reserva
 * @property {string} nombreLibro - Nombre del libro reservado.
 * @property {string} estado - Estado actual de la reserva.
 * @property {string} fechaInicio - Fecha en que inicia la reserva.
 * @property {string} fechaFin - Fecha de entrega o finalización.
 */

/**
 * Obtiene todas las reservas almacenadas en localStorage.
 *
 * @returns {Reserva[]} Lista de reservas o arreglo vacío si no existen registros.
 */
export function getReserve(){
  const reserve =
    JSON.parse(localStorage.getItem("reservas")) || [];

  return reserve;

} 

/**
 * Actualiza el estado de una reserva existente.
 *
 * @param {Object} solicitud - Datos de actualización.
 * @param {string} solicitud.nombre - Nombre del libro a actualizar.
 * @param {string} solicitud.estado - Nuevo estado a asignar.
 * @returns {boolean} true si la reserva fue encontrada y actualizada.
 */
export function updateReserve(solicitud = {}) {

    const nombre = solicitud.nombre || "";
    const estado = solicitud.estado || "";

    const reservas = getReserve();

    let response = false;

    reservas.forEach(reserva => {

        if (reserva.nombreLibro === nombre) {

            reserva.estado = estado;
            response = true;
        }
    });

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );

    return response;
}
