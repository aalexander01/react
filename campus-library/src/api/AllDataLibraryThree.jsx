import { useEffect, useState, useCallback, useRef } from "react";

// Caché en memoria para evitar peticiones repetidas durante la sesión
const memoryCache = new Map();
export function AllDataLibraryThree(search) {
  // Estado de los libros obtenidos desde la API
  const [books, setBooks] = useState([]);

  // Estado de carga para mostrar indicadores visuales
  const [loading, setLoading] = useState(false);

  // Estado para almacenar errores de la petición
  const [error, setError] = useState(null);

  // Página actual de resultados
  const [currentPage, setCurrentPage] = useState(1);

  // Total de páginas disponibles según la respuesta de la API
  const [totalPages, setTotalPages] = useState(1);

  // Referencia para controlar el debounce de búsqueda
  const debounceRef = useRef(null);

  // Cantidad de resultados por página
  const LIMIT = 32;

  useEffect(() => {
    // Permite cancelar peticiones anteriores cuando cambia la búsqueda
    const controller = new AbortController();

    // Limpia el temporizador anterior
    clearTimeout(debounceRef.current);

    // Debounce para evitar demasiadas peticiones mientras el usuario escribe
    debounceRef.current = setTimeout(() => {
      fetchBooks();
    }, 400);

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        // Normaliza el texto de búsqueda
        const normalizedSearch = (search || "").trim().toLowerCase();

        // Si no existe búsqueda, se utiliza una consulta por defecto
        const query = normalizedSearch || "test";

        // Calcula el desplazamiento para la paginación
        const offset = (currentPage - 1) * LIMIT;

        // Clave única para identificar la búsqueda y página actual
        const cacheKey = `${query}-${currentPage}`;

        // Buscar primero en caché de memoria
        if (memoryCache.has(cacheKey)) {
          setBooks(memoryCache.get(cacheKey));
          setLoading(false);
          return;
        }

        // Buscar en caché persistente (localStorage)
        const localCache = localStorage.getItem(cacheKey);

        if (localCache) {
          const parsed = JSON.parse(localCache);

          setBooks(parsed);

          // Guarda también en memoria para futuras consultas
          memoryCache.set(cacheKey, parsed);

          setLoading(false);
          return;
        }

        // Consulta a la API de Open Library
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

        // Lista de libros encontrada
        const results = data.docs || [];

        // Guarda resultados en caché
        memoryCache.set(cacheKey, results);
        localStorage.setItem(cacheKey, JSON.stringify(results));

        setBooks(results);

        // Calcula el número total de páginas
        const total = data.numFound || 0;
        setTotalPages(Math.ceil(total / LIMIT));
      } catch (err) {
        // Ignora errores producidos por cancelación de la petición
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    // Limpieza al desmontar o actualizar el efecto
    return () => controller.abort();
  }, [search, currentPage]);

  // Avanza a la siguiente página
  const nextPage = useCallback(() => {
    setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  }, [totalPages]);

  // Regresa a la página anterior
  const prevPage = useCallback(() => {
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  // Reinicia la paginación a la primera página
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