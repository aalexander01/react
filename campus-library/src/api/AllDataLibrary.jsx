import { useState, useEffect, useMemo } from "react";

export function DataLibrary(pagina, types, search){

    if(pagina === 0){
        getLibraryByTypeSearch(types, search);
    }else{
        AllDataLibrary(pagina);
    }
}

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

