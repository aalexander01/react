import { useState } from "react";
import { AllDataLibraryThree } from "../api/AllDataLibraryThree.jsx";
import { getLibraryByTypeSearch } from "../api/AllDataLibrary.jsx";
import DetailBook from "../components/card/DetailBook.jsx";
import "./library.css";

export default function LibrarySearch(props) {

  const [page, setPage] = useState(0);

  function subirArriba() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }

  
  const {
    books,
    loading,
    contPage,
    error
  } = getLibraryByTypeSearch(props.typess, props.searchp);


  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      {loading && (
        <p className="msg">Cargando...</p>
      )}

      <div className="grid">
        {(books[page] || []).map((book, index) => {

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
              : `https://via.placeholder.com/150`;

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
            selectedBook={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        </div>
      )}

      {/* PAGINACIÓN */}
      <div className="pagination">
        <button
          onClick={() => { setPage((prev) => Math.max(prev - 1, 0)); subirArriba(); }}
          disabled={page === 0}
        >
          ← Anterior
        </button>

        <span>
          Página {page+1} de {contPage}
        </span>

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