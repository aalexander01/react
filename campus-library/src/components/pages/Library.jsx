import { useEffect, useRef } from "react";

import { allDataLibrary } from "../api/allDataLibrary";

import "./library.css";

export default function Library(props) {

  const {
    visibleBooks,
    loading,
    error,
    loadMore,
    hasMore,
  } = allDataLibrary(props.search);

  // DIV FINAL
  const loaderRef = useRef(null);

  // OBSERVER
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
      {loading && <p className="msg">Cargando...</p>}

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

      {/* OBSERVER TARGET */}
      {hasMore && (
        <div
          ref={loaderRef}
          style={{
            height: "20px",
          }}
        />
      )}
    </>
  );
}