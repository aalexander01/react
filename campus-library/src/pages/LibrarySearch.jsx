// Hook para manejar estado local del componente
import { useState } from "react";

// Importaciones de APIs (algunas no se usan en este componente)
import { getLibraryByTypeSearch } from "../api/AllDataLibrary.jsx";
// Componente que muestra el detalle de un libro seleccionado
import DetailBook from "../components/card/DetailBook.jsx";
// Estilos del módulo de búsqueda de biblioteca
import "./library.css";

/**
 * Componente LibrarySearch
 *
 * Permite buscar libros por tipo y texto de búsqueda.
 * Muestra resultados paginados, con detalle del libro seleccionado.
 */
export default function LibrarySearch(props) {

  // Página actual para paginación (empieza en 0)
  const [page, setPage] = useState(0);

  /**
   * Función para desplazar suavemente la vista hacia arriba
   * cuando el usuario cambia de página.
   */
  function subirArriba() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }

  /**
   * Obtiene datos de la API según tipo y búsqueda.
   * Devuelve:
   * - books: resultados paginados (array de páginas)
   * - loading: estado de carga
   * - contPage: total de páginas disponibles
   * - error: posible error de la consulta
   */
  const {
    books,
    loading,
    contPage,
    error
  } = getLibraryByTypeSearch(props.typess, props.searchp);


  // Estado para almacenar el libro seleccionado y mostrar su detalle
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      {/* ================= ESTADO DE CARGA ================= */}
      {loading && (
        <p className="msg">Cargando...</p>
      )}

      {/* ================= GRID DE LIBROS ================= */}
      <div className="grid">
        {/* Se asegura fallback en caso de que no exista la página */}
        {(books[page] || []).map((book, index) => {

          // Normalización para OpenLibrary y Gutendex
          // Normalización de título (fallback si no existe)
          const title = book.title || "Sin título";

          // Normalización de autor (soporta distintas APIs)
          const author =
            book.authors_name?.[0]?.name ||
            book.authors_name?.[0]?.author_name?.name ||
            "Desconocido";

          /**
           * Manejo de imagen:
           * - OpenLibrary cover_id
           * - fallback a placeholder
           */
          const image = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : book.formats?.["image/jpeg"] || "https://via.placeholder.com/150";

          // Descripción con fallback en caso de datos faltantes
          const description =
            book.description ||
            book.first_sentence ||
            "Sin descripción disponible.";

          return (
            <div
              className="card"
              key={book.key || book.id || index}
              // Al hacer click en la tarjeta se guarda el libro seleccionado
              onClick={() =>
                setSelectedBook({
                  nombre: title,
                  autor: book.author_name?.[0] || "Desconocido",
                  edicion: book.first_publish_year || "N/A",
                  imagen: image,
                  descripcion: description,
                })
              }
            >
              {/* Imagen del libro */}
              <img
                style={{ objectFit: "contain" }}
                src={image}
                alt={title}
              />

              {/* Información básica del libro */}
              <div className="info">
                <p className="label">NOMBRE</p>

                {/* Trunca el título si es demasiado largo */}
                <p className="title">
                  {title.length >= 50
                    ? title.slice(0, 50) + "..."
                    : title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DETALLE DEL LIBRO ================= */}
      {selectedBook && (
        <div className="contentDetail">
          <DetailBook
            selectedBook={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        </div>
      )}

      {/* ================= PAGINACIÓN ================= */}
      <div className="pagination">
        {/* Botón para ir a la página anterior */}
        <button
          onClick={() => { setPage((prev) => Math.max(prev - 1, 0)); subirArriba(); }}
          disabled={page === 0}
        >
          ← Anterior
        </button>

        {/* Indicador de página actual */}
        <span>
          Página {page+1} de {contPage}
        </span>

        {/* Botón para avanzar página */}
        <button
          onClick={() => {setPage((prev) => prev + 1, contPage-1); subirArriba();}}
          disabled = {page === -1}
        >
          Siguiente →
        </button>
      </div>
    </>
  );
}