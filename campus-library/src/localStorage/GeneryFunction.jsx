
function guardarLista(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista));
}

function obtenerLista(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}