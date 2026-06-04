import { useEffect, useState, useCallback, useRef } from "react";

const memoryCache = new Map();

export function AllDataLibraryThree(search) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debounceRef = useRef(null);

  const LIMIT = 32;

  useEffect(() => {
    const controller = new AbortController();

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchBooks();
    }, 400);

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        const normalizedSearch = (search || "").trim().toLowerCase();

        // 👇 SIEMPRE tener query válida (esto arregla los "primeros libros")
        const query = normalizedSearch || "books";

        const offset = (currentPage - 1) * LIMIT;

        const cacheKey = `${query}-${currentPage}`;

        // cache memoria
        if (memoryCache.has(cacheKey)) {
          setBooks(memoryCache.get(cacheKey));
          setLoading(false);
          return;
        }

        // cache localStorage
        const localCache = localStorage.getItem(cacheKey);
        if (localCache) {
          const parsed = JSON.parse(localCache);
          setBooks(parsed);
          memoryCache.set(cacheKey, parsed);
          setLoading(false);
          return;
        }

        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=${LIMIT}&offset=${offset}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Error obteniendo libros");
        }

        const data = await response.json();

        const results = data.docs || [];

        memoryCache.set(cacheKey, results);
        localStorage.setItem(cacheKey, JSON.stringify(results));

        setBooks(results);

        const total = data.numFound || 0;
        setTotalPages(Math.ceil(total / LIMIT));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    return () => controller.abort();
  }, [search, currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
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