import { useState } from "react";
import { AllDataLibraryTwo } from "../api/allDataLibraryTwo.jsx";
import DetailBook from "../card/DetailBook";
import "./library.css";

export default function Library(props) {

  const {
    books,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = AllDataLibraryTwo(props.search);

  const [selectedBook, setSelectedBook] = useState(null);

   const [texto, setTexto] = useState("");

  return (
    <>
      {loading && (
        <p className="msg">
          Cargando...
        </p>
      )}

      {error && (
        <p className="msg error">
          {error}
        </p>
      )}

      <div className="grid">
        {books.map((book) => (
          <div
            className="card"
            key={book.id}
            onClick={() =>
              setSelectedBook({
                nombre: book.title,
                autor:
                  book.authors?.[0]?.name ||
                  "Desconocido",
                edicion:
                  "N/A",
                imagen:
                  book.formats?.["image/jpeg"] ||
                  "https://via.placeholder.com/150",
                descripcion:
                   book.summaries || "Sin descripción disponible.",
              })
            }
          >
            <img
              style={{ objectFit: "contain" }}
              src={
                book.formats?.["image/jpeg"] ||
                "https://via.placeholder.com/150"
              }
              alt={book.title}
            />

            <div className="info">
              <p className="label">
                NOMBRE
              </p>

              <p className="title" >
                {book.title?.length >= 50
                  ? book.title.slice(0, 50) + "..."
                  : book.title
                }
              </p>
            </div>
          </div>
        ))}
        {selectedBook && (
        <div className="contentDetail">
          <DetailBook
          nombre={selectedBook.nombre}
          autor={selectedBook.autor}
          edicion={selectedBook.edicion}
          imagen={selectedBook.imagen}
          descripcion={selectedBook.descripcion}
          onClose={() =>
            setSelectedBook(null)
          }
          />
        </div>
      )}
      </div>

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