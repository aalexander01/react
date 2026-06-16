import { useState, useEffect, useMemo } from "react";

/**
 * Hook personalizado para obtener libros paginados desde OpenLibrary.
 *
 * @param {number} pagina - Número de página a consultar.
 * @returns {Object} Estado del hook con libros y loading.
 */
export function AllDataLibrary(pagina) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(
            `https://openlibrary.org/search.json?q=test&page=${pagina}&limit=20`
        )
            .then((response) => response.json())
            .then((data) => setBooks(data.docs || []))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [pagina]);

    return { books, loading };
}

/**
 * Hook personalizado para búsqueda de libros filtrados por tipo y texto.
 *
 * @param {string} types - Campo de búsqueda (ej: author, title, subject).
 * @param {string} search - Texto a buscar.
 * @returns {Object} Estado del hook con libros agrupados, loading, error y conteo de páginas.
 */
export function getLibraryByTypeSearch(types, search) {
    const query = search || "";
    const type = types || "";

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(
            `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}`
        )
            .then((response) => response.json())
            .then((data) => setBooks(data.docs || []))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [query, type]);

    const groupedBooks = useMemo(() => {
        const result = [];

        for (let i = 0; i < books.length; i += 20) {
            result.push(books.slice(i, i + 20));
        }

        return result;
    }, [books]);
    const contPage = groupedBooks.length;
    return {
        books: groupedBooks,
        loading,
        contPage,
        error
    };
}

