import { useEffect, useRef, useState, useCallback } from "react";

const url = "https://gutendex.com/books/?search=pride";

export function useApiLibrary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();

    controllerRef.current = abortController;

    setLoading(true);
    setError(null);

    fetch(url, {
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching books");
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
          return;
        }

        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const handleAbortRequest = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  return {
    libros: data?.docs || [],
    loading,
    error,
    handleAbortRequest,
  };
}