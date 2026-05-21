import './App.css';
import { Suspense } from 'react';
import { FetchData } from './components/api/FetchData.jsx';

const ApiData = FetchData("https://openlibrary.org/search.json?q=test");
//const ApiData = FetchData("https://gutendex.com/books/?search=pride");
function App() {
  const data = ApiData.read()?.docs;
  return (
    
    <>
    <h1>Libros</h1>
    <div>
      {/* <Suspense fallback={<div>Loading...</div>} >
        <ul className='card'>
          {data?.map((libros, index) => {
            return <li key={index}>{libros.cover_i}</li>
          })}
        </ul> 
      </ Suspense> */}
    </div>
      
    </>
  )
}


export default App
