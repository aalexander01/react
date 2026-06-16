

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
 * @typedef {Object} Reserva
 * @property {string} nombreLibro
 * @property {string} estado
 * @property {string} fechaInicio
 * @property {string} fechaFin
 */

/**
 * @returns {Reserva[]}
 */
export function getReserve(){
  const reserve =
    JSON.parse(localStorage.getItem("reservas")) || [];

  return reserve;

} 

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

function validationUser(usuario, password) {
  const reservas = getReserve();

  const userFound = users.find(
    user =>
      user.user === usuario &&
      user.password === password
  );

  if (!userFound) {
    return null;
  }

  return userFound.rol;
}
