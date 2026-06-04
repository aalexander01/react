import { useState } from "react";
import { AllDataLibraryThree } from "../api/AllDataLibraryThree.jsx";
import DetailBook from "../card/DetailBook";
import "./library.css";

export default function LibraryThree(props) {

  const {
    books,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = AllDataLibraryThree(props.search);

  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      {loading && (
        <p className="msg">Cargando...</p>
      )}

      {error && (
        <p className="msg error">{error}</p>
      )}

      <div className="grid">
        {(books || []).map((book, index) => {

          // Normalización para OpenLibrary y Gutendex
          const title = book.title || "Sin título";

          const author =
            book.authors_name?.[0]?.name ||
            book.authors_name?.[0]?.author_name?.name ||
            "Desconocido";

          const image =
            book.formats?.["image/jpeg"] ||
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://via.placeholder.com/150";

          const description =
            book.description ||
            book.first_sentence ||
            "Sin descripción disponible.";

          return (
            <div
              className="card"
              key={book.key || book.id || index}
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
              <img
                style={{ objectFit: "contain" }}
                src={image}
                alt={title}
              />

              <div className="info">
                <p className="label">NOMBRE</p>

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

      {/* DETALLE */}
      {selectedBook && (
        <div className="contentDetail">
          <DetailBook
            nombre={selectedBook.nombre}
            autor={selectedBook.autor}
            edicion={selectedBook.edicion}
            imagen={selectedBook.imagen}
            descripcion={selectedBook.descripcion}
            onClose={() => setSelectedBook(null)}
          />
        </div>
      )}

      {/* PAGINACIÓN */}
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          ← Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente →
        </button>
      </div>
    </>
  );
}