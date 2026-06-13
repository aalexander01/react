
import { useState, useEffect, useRef } from "react";
import { getFavorite } from "../localStorage/LSFavoritos";
import DetailBook from "../components/card/DetailBook.jsx";
import logo from "../assets/logo.png";
import './Favoritos.css';


export default function Favoritos(){
    const books = getFavorite();

    const [selectedBook, setSelectedBook] = useState(null);
    return(
        <>
            <h1>Mis Libros Favoritos</h1>
              <div className="grid">
                {(books || []).map((book, index) => {
        
                  const title = book.title;
                  const author = book.author;
                  const  edicions = book.edicion;
                  const image = book.imagen;
                  const descriptions = book.descripcion;
                  return (
                    <div
                      className="card"
                      key={book.key || book.id || index}
                      
                    >
                      <img
                        style={{ objectFit: "contain" }}
                        src={image}
                        alt={title}
                      />
        
                      <div className="info">
                        <p className="label">NOMBRE</p>
        
                        <p className="title">
                          {title.length >= 50
                            ? title.slice(0, 50) + "..."
                            : title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
        
        
              {/* PAGINACIÓN */}
              {/* <div className="pagination">
                <button
                  onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); subirArriba(); }}
                  disabled={page === 1}
                >
                  ← Anterior
                </button>
        
                <span>
                  Página {page}
                </span>
        
                <button
                  onClick={() => {setPage((prev) => prev + 1); subirArriba();}}
                >
                  Siguiente →
                </button>
              </div> */}
        </>
    );
}