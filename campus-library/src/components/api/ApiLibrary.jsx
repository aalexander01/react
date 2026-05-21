
import { useEffect, useState } from 'react';


export function ApiLibrary(url){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ controller, setController] = useState(null);
  useEffect(() =>{
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);

    fetch(url, {signal: AbortController.signal})
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch(
      
      (error) => {
        if(error.name =='AbortError'){
          console.log("Request Cancelled")
        }
        setError(error)})
    .finally(() => setLoading(false));
    return () => abortController.abort();
  }, []);

  const libros = data?.docs;
  const HandlerAborRequest = () =>{
    if(controller){
      controller.abort();
      setError("Request Cancel");
    }
  }
  return {libros, loading, error, HandlerAborRequest};
}

export default ApiLibrary


// const {libros, loading, error} = ApiLibrary("https://openlibrary.org/search.json?q=test");
//   return (
//     <>
//     <h1>Libros</h1>
//       <ul>
//         {loading && <li>Cargando...</li>}
//         {error && <li>{error}</li>}
//         {libros?.map((libro, index) =>(
          
//           <li key={index}>{libro.author_name}</li>
//         ))}
//       </ul>
//     </>
//   )