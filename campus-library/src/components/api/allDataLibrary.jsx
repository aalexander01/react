

//  "https://openlibrary.org/search.json?q=test"
//  "https://gutendex.com/books/?search=pride"

import { useEffect, useState, useRef, useCallback } from "react";

export function allDataLibrary(search) {
  const [allBooks, setAllBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const LIMIT = 40;

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://openlibrary.org/search.json?q=${search || "test"}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Error al consultar API");
        }

        const data = await res.json();

        const books = data.docs || [];

        setAllBooks(books);

        // SOLO 40 INICIALES
        setVisibleBooks(books.slice(0, LIMIT));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [search]);

  // CARGAR MÁS
  const loadMore = useCallback(() => {
    setVisibleBooks((prev) => {

      // SI YA NO HAY MÁS
      if (prev.length >= allBooks.length) {
        return prev;
      }

      const nextBooks = allBooks.slice(
        prev.length,
        prev.length + LIMIT
      );

      return [...prev, ...nextBooks];
    });
  }, [allBooks]);

  const hasMore = visibleBooks.length < allBooks.length;

  return {
    visibleBooks,
    loading,
    error,
    loadMore,
    hasMore,
  };
}