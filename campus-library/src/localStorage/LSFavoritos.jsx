

/**
 * Guarda un libro en la lista de favoritos almacenada en localStorage.
 *
 * Antes de guardar, valida que el libro no exista previamente
 * para evitar registros duplicados.
 *
 * @param {Object} book - Información del libro seleccionado.
 * @param {string} book.nombre - Título del libro.
 * @param {string} book.autor - Autor del libro.
 * @param {string} book.imagen - URL de la portada.
 * @param {string} book.edicion - Año o edición del libro.
 * @param {string} book.descripcion - Descripción del libro.
 */
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
 * Obtiene la lista completa de libros favoritos
 * almacenados en localStorage.
 *
 * @returns {Array<Object>} Lista de favoritos.
 */
export function getFavorite(){
  const favoritos =
    JSON.parse(localStorage.getItem("favoritos")) || [];

  return favoritos;

} 

/**
 * Valida si un libro ya existe en la lista de favoritos.
 *
 * @param {string} nombreLibro - Nombre del libro a validar.
 * @returns {boolean}
 * true  -> El libro no existe y puede guardarse.
 * false -> El libro ya está registrado.
 */
function validateFavorite(nombreLibro){
  const favoritos = getFavorite();

  return !favoritos.some(
    (favorito) => favorito.title === nombreLibro
  );
}