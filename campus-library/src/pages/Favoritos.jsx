
import { useState, useEffect, useRef } from "react";
import { getFavorite } from "../localStorage/LSFavoritos";
import DetailBook from "../components/card/DetailBook.jsx";
import logo from "../assets/logo.png";
import './Favoritos.css';

/**
 * Componente Favoritos
 * Muestra la lista de libros guardados como favoritos por el usuario.
 * Los datos se obtienen desde localStorage.
 */
export default function Favoritos(){

    // Obtiene los libros favoritos almacenados localmente
    const books = getFavorite();

    return(
        <>
            {/* Título de la sección */}
            <h1>Mis Libros Favoritos</h1>
              {/* Contenedor de la cuadrícula de libros */}
              <div className="grid">
                {/* Se asegura que books sea un array antes de iterar */}
                {(books || []).map((book, index) => {
        
                  // Extracción de propiedades del libro
                  const title = book.title;
                  const author = book.author;
                  const  edicions = book.edicion;
                  const image = book.imagen;
                  const descriptions = book.descripcion;
                  return (
                    <div
                      className="card"
                      key={book.key || book.id || index} // clave única para React
                      
                    >
                      {/* Imagen del libro */}
                      <img
                        style={{ objectFit: "contain" }}
                        src={image}
                        alt={title}
                      />

                      {/* Información del libro */}
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
        
        </>
    );
}