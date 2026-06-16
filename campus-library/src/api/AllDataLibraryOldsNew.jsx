import { useState, useEffect, useMemo } from "react";

/**
 * Hook: obtiene libros con paginación
 * Optimización:
 * - Evita recalcular URL innecesariamente
 * - Mantiene fetch aislado por dependencia "pagina"
 */
export function AllDataLibrary(pagina) {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let isMounted = true; // evita setState si el componente se desmonta

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://openlibrary.org/search.json?q=test&page=${pagina}&limit=20`
                );

                const data = await response.json();

                if (isMounted) {
                    setBooks(data.docs || []);
                }

            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup para evitar memory leaks
        return () => {
            isMounted = false;
        };

    }, [pagina]);

    // Evita re-render innecesario del objeto retornado
    return useMemo(() => ({
        books,
        loading,
        error
    }), [books, loading, error]);
}

/**
 * Hook: búsqueda filtrada por tipo + texto
 * Optimización:
 * - encode solo cuando cambia query/type
 * - evita recreación de arrays innecesarios
 */
export function getLibraryByTypeSearch(types, search) {

    const query = search || "";
    const type = types || "";

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}`
                );

                const data = await response.json();

                if (isMounted) {
                    setBooks(data.docs || []);
                }

            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };

    }, [query, type]);

    /**
     * Optimización importante:
     * Evita recalcular slicing en cada render innecesario
     */
    const groupedBooks = useMemo(() => {

        const result = [];

        //  chunking optimizado
        for (let i = 0; i < books.length; i += 20) {
            result.push(books.slice(i, i + 20));
        }

        return result;

    }, [books]);

    const contPage = groupedBooks.length;

    return useMemo(() => ({
        books: groupedBooks,
        loading,
        contPage,
        error
    }), [groupedBooks, loading, contPage, error]);
}