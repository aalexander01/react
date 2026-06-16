// Hook para manejar estado local en el componente
import { useState } from "react";

// Importación de servicios / APIs de libros
import { AllDataLibrary } from "../api/AllDataLibrary.jsx";

// Componente encargado de mostrar el detalle de un libro seleccionado
import DetailBook from "../components/card/DetailBook.jsx";

// Estilos del módulo de librería
import "./library.css";

/**
 * Componente LibraryThree
 *
 * Muestra una lista de libros filtrados por rango de años de publicación.
 * Permite paginación, ordenamiento y visualización de detalles de un libro.
 */
export default function LibraryThree(props) {

  // Página actual para paginación
  const [page, setPage] = useState(1);
  // Estado que controla el orden de los libros por año de publicación
  const [order, setOrder] = useState("asc");
   /**
   * Función auxiliar para subir suavemente al inicio de la página
   * cuando se cambia de página en la paginación.
   */
  function subirArriba() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }

  /**
   * Obtiene los libros de la API según la página actual,
   * luego los filtra por rango de años recibido por props
   * y finalmente los ordena ascendente o descendentemente.
   */
  const books = AllDataLibrary(page).books.filter((libro) => {
    const anio = libro.first_publish_year;

    // Filtra libros dentro del rango de años definido por el usuario
    return anio >= props.fromYear && anio <= props.toYear;
  })
  .sort((a, b) => {
    return order === "asc"
      ? a.first_publish_year - b.first_publish_year
      : b.first_publish_year - a.first_publish_year;
  });


  // Estado que guarda el libro seleccionado para ver su detalle
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      {/* 
        Contenedor principal de la grilla de libros
        Se asegura fallback en caso de datos undefined
      */}
      {/* {loading && (
        <p className="msg">Cargando...</p>
      )} */}

      <div className="grid">
        
        {(books || []).map((book, index) => {

          // Normalización para OpenLibrary y Gutendex
          const title = book.title || "Sin título";
          
          const author =
            book.authors_name?.[0]?.name ||
            book.authors_name?.[0]?.author_name?.name ||
            "Desconocido";

          // Manejo de imagen (OpenLibrary o fallback)
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
            // Cierra el modal limpiando el estado
            onClose={() => setSelectedBook(null)}
          />
        </div>
      )}

      {/* ================= PAGINACIÓN ================= */}
      <div className="pagination">
        {/* Botón para ir a la página anterior */}
        <button
          onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); subirArriba(); }}
          disabled={page === 1}
        >
          ← Anterior
        </button>

        {/* Indicador de página actual */}
        <span>
          Página {page}
        </span>

        {/* Botón para avanzar página */}
        <button
          onClick={() => {setPage((prev) => prev + 1); subirArriba();}}
        >
          Siguiente →
        </button>
      </div>
    </>
  );
}