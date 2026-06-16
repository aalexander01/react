/**
 * Guarda una lectura en localStorage si no existe previamente.
 * Solo persiste la lectura cuando el estado es "aprobado".
 *
 * @param {Object} lecture - Objeto con la información de la lectura.
 * @param {string} lecture.nombreLibro - Nombre del libro.
 * @param {string} lecture.estado - Estado actual de la lectura.
 * @param {string} lecture.fechaInicio - Fecha de inicio.
 * @param {string} lecture.fechaFin - Fecha de finalización.
 */
export function saveListLecture(lecture) {

    const existe = validateLecture(
        lecture.nombreLibro,
        lecture.estado
    );

    if (!existe) {

        const nuevaLectura = {
            nombreLibro: lecture.nombreLibro,
            estado: lecture.estado,
            pagina: 1,
            fechaInicio: lecture.fechaInicio,
            fechaFin: lecture.fechaFin
        };

        if(lecture.estado === "aprobado"){
          const lecturas =
              JSON.parse(
                  localStorage.getItem("lecturas")
              ) || [];

          lecturas.push(nuevaLectura);

          localStorage.setItem(
              "lecturas",
              JSON.stringify(lecturas)
          );

          console.log(
              "Guardado OK:",
              nuevaLectura
          );
        }
    }
}

/**
 * Obtiene la lista completa de lecturas almacenadas.
 *
 * @returns {History[]} Lista de lecturas o arreglo vacío si no existen registros.
 */
export function getListLecture(){
  const listLectura =
    JSON.parse(localStorage.getItem("lecturas")) || [];

  return listLectura;
}

/**
 * Valida si una lectura ya existe en el almacenamiento y,
 * en caso afirmativo, puede actualizar o eliminar su estado.
 *
 *Esta función no solo valida, también modifica el estado interno.
 *
 * @param {string} nombreLibro - Nombre del libro a validar.
 * @param {string} estado - Nuevo estado a evaluar.
 * @returns {boolean} true si la lectura ya existe, false si no existe.
 */
export function validateLecture(
    nombreLibro,
    estado
) {

    const lecturas = getListLecture();

    let response = false;

    lecturas.forEach(lectura => {

        if (
            lectura.nombreLibro === nombreLibro
        ) {

            response = true;

            if (
                lectura.estado !== estado
            ) {

                if(estado === "denegado"){
                  const nuevasLecturas = lecturas.filter(
                      lectura => lectura.nombreLibro !== nombreLibro
                  );
                  localStorage.setItem(
                      "lecturas",
                      JSON.stringify(nuevasLecturas)
                  );
                }else{
                  lectura.estado = estado;

                  localStorage.setItem(
                      "lecturas",
                      JSON.stringify(lecturas)
                  );
                }
            }
        }
    });

    return response;
}


