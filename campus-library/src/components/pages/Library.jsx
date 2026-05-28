import { useEffect, useRef, useState } from "react";

import { allDataLibrary } from "../api/allDataLibrary";
import DetailBook from "../card/DetailBook";

import "./library.css";

export default function Library(props) {

  const {
    visibleBooks,
    loading,
    error,
    loadMore,
    hasMore,
  } = allDataLibrary(props.search);

  const loaderRef = useRef(null);

  const [selectedBook, setSelectedBook] = useState(null);

  // OBSERVER
 console.log(visibleBooks);
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        const target = entries[0];

        if (target.isIntersecting && hasMore) {
          loadMore();
        }
      },
      {
        threshold: 1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();

  }, [loadMore, hasMore]);

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

        {visibleBooks.map((book) => (

          <div
            className="card"
            key={book.key}

            onClick={() =>
              setSelectedBook({
                nombre: book.title,
                autor: book.author_name?.[0] || "Desconocido",
                edicion: book.first_publish_year || "N/A",
                imagen: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : "https://via.placeholder.com/150",
                descripcion:
                  "Sin descripción disponible."
              })
            }
          >

            <img
              style={{ objectFit: "contain" }}

              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/150"
              }

              alt={book.title}
            />

            <div className="info">

              <p className="label">
                NOMBRE
              </p>

              <p className="title">
                {book.title}
              </p>

            </div>

          </div>
        ))}

      </div>

      {selectedBook && (

        <DetailBook
          nombre={selectedBook.nombre}
          autor={selectedBook.autor}
          edicion={selectedBook.edicion}
          imagen = {selectedBook.imagen}
          descripcion={selectedBook.descripcion}
          onClose={() =>
            setSelectedBook(null)
          }
        />

      )}

      {hasMore && (
        <div
          ref={loaderRef}
          style={{ height: "20px" }}
        />
      )}

    </>
  );
}