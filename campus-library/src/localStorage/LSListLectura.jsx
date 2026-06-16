
export function saveListLecture(lecture) {

    const existe = validateLecture(
        lecture.nombreLibro,
        lecture.estado
    );

    if (!existe) {

        const nuevaLectura = {
            nombreLibro: lecture.nombreLibro,
            estado: lecture.estado,
            pagina: null,
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
 * @typedef {Object} History
 * @property {string} nombreLibro
 * @property {string} estado
 * @property {string} fechaInicio
 * @property {string} fechaFin
 */

/**
 * @returns {History[]}
 */
export function getListLecture(){
  const listLectura =
    JSON.parse(localStorage.getItem("lecturas")) || [];

  return listLectura;
}

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


