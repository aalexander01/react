

export function SaveFavorite(book){

  console.log("Metodo SaveFavorite:: " +book.nombre);
  let response = validateFavorite(book.nombre);
  if(response){
    const new_book = {
      imagen: book.imagen,
      title: book.nombre,
      author: book.autor,
      edicion: book.edicion,
      descripcion: book.descripcion
    };

    // obtener existentes
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // agregar nuevo libro a favoritos
    favoritos.push(new_book);

    // guardar
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
  
}

/**
 * @typedef {Object} Reserva
 * @property {string} nombreLibro
 * @property {string} estado
 * @property {string} fechaInicio
 * @property {string} fechaFin
 */

/**
 * @returns {Favoritos[]}
 */
export function getFavorite(){
  const favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];

  return favoritos;

} 

function validateFavorite(nombreLibro){
  let response = true;
  const favoritos = getFavorite();

  favoritos.forEach(favorito => {
    if(favorito.title === nombreLibro){
      response = false;
    }
  });

  return response;
}