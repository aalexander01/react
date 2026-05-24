import { useEffect, useState, useRef } from "react";

export function useBooks(search) {
  const [allBooks, setAllBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);
  const limit = 40;

  // cuando cambia searh o inicio
  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://openlibrary.org/search.json?q=${search || 'test'}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Error API");

        const data = await res.json();

        const books = data.docs || [];

        setAllBooks(books);

        // SOLO PRIMEROS 40
        setVisibleBooks(books.slice(0, limit));
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

  // CARGAR MÁS (WINDOWING)
  const loadMore = () => {
    setVisibleBooks((prev) => {
      const next = allBooks.slice(prev.length, prev.length + limit);
      return [...prev, ...next];
    });
  };

  return {
    visibleBooks,
    loading,
    error,
    loadMore,
  };
}