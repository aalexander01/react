import './App.css';
import { Suspense } from 'react';
import { FetchData } from './components/api/FetchData.jsx';


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
