import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

const LIMIT = 40;

export function AllDataLibraryTwo(search) {
  const [allBooks, setAllBooks] = useState([]);

  const [visibleCount, setVisibleCount] =
    useState(LIMIT);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        const query = encodeURIComponent(search);

        const url = search
          ? `https://gutendex.com/books/?search=${query}`
          : `https://gutendex.com/books/`;

        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Error al consultar API");
        }

        const data = await res.json();

        setAllBooks(data.results || []);

        // RESETEA PAGINACIÓN
        setVisibleCount(LIMIT);

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

  // MEMOIZA LIBROS VISIBLES
  const visibleBooks = useMemo(() => {
    return allBooks.slice(0, visibleCount);
  }, [allBooks, visibleCount]);

  // MEMOIZA BOTÓN
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + LIMIT);
  }, []);

  const hasMore =
    visibleCount < allBooks.length;

  return {
    books: visibleBooks,
    loading,
    error,
    loadMore,
    hasMore,
  };
}