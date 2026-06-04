import { useEffect, useState, useCallback } from "react";

const booksCache = new Map();

export function AllDataLibraryTwo(search) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      const normalizedSearch = search.trim().toLowerCase();
      const cacheKey = `${normalizedSearch}-${currentPage}`;

      try {
        setLoading(true);
        setError(null);

        const cached = booksCache.get(cacheKey);

        if (cached) {
          setBooks(cached);
          setLoading(false);
          return;
        }

        const url = normalizedSearch
          ? `https://gutendex.com/books?search=${encodeURIComponent(
              normalizedSearch
            )}&page=${currentPage}`
          : `https://gutendex.com/books/?page=${currentPage}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Error obteniendo libros");
        }

        const data = await response.json();
        const results = data.results || [];

        booksCache.set(cacheKey, results);

        setBooks(results);

        let pages = 1;
        if (data.count) {
          pages = Math.ceil(data.count / 32);
        }

        setTotalPages(pages);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, [search, currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    books,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    resetPage,
  };
}