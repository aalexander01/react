import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import "./DetailBook.css";
import ReservationForm from "./ReservationForm.jsx"
import {SaveFavorite} from "../../localStorage/LSFavoritos.jsx"
import { CiStar } from "react-icons/ci";

/**
 * Componente que muestra la información detallada de un libro
 * dentro de una ventana modal.
 *
 * Funcionalidades:
 * - Visualización de información completa del libro.
 * - Cierre automático al hacer clic fuera del modal.
 * - Gestión de libros favoritos.
 * - Apertura del formulario de reserva.
 */
export default function DetailBook(props) {

  const menuRef = useRef(null);
  // Controla la visualización del formulario de reserva.
  const [openReserve, setOpenReserve] = useState(false);
  // Controla el estado visual del icono de favorito.
  const [selected, setSelected] = useState(false);
  // Libro seleccionado recibido desde el componente padre.
  const selectedBook = props.selectedBook;

  /**
   * Efecto encargado de detectar clics fuera del modal.
   * Si el usuario hace clic fuera del contenedor principal,
   * se ejecuta la función de cierre recibida por props.
   */
  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        props.onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    // Limpieza del evento al desmontar el componente.
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  return (

    <div className="overlay">

      <div
        className="descriptionBook"
        ref={menuRef}
      >

        <div className="bookContent">
          {/* Encabezado con imagen, título y autor */}
          <div className="bookHeader">
            
            <img
              style={{ objectFit: "contain" }}
              src={selectedBook.imagen}
              alt={selectedBook.nombre}
              className="bookImage"
            />

            <h2>{selectedBook.nombre}</h2>

            <p className="author">
              {selectedBook.autor}
            </p>

          </div>

          <div className="bookInfo">

            <div className="infoRow">
              <span>AÑO DE EDICIÓN</span>
              <p>{selectedBook.edicion}</p>
            </div>

            <div className="infoRow">
              <span>DESCRIPCIÓN</span>
              <p>{selectedBook.descripcion}</p>
            </div>

          </div>

        </div>

        {/* Botón para agregar el libro a favoritos */}
        <span>
          <CiStar 
            className={selected ? "icon-container active" : "icon-container"}
            onClick={() => {
              setSelected(!selected);
                console.log("se selecciono"+ selectedBook.nombre);
                SaveFavorite(selectedBook);
            }}
          />
        </span>

        {/* Botón para abrir el formulario de reserva */}
        <button
          className="reserveBtn"
          onClick={() => setOpenReserve(true)}
        >
          RESERVAR
        </button>

        {/* Renderizado condicional del formulario de reserva */}
        {openReserve && (
          <ReservationForm
            nombreLibro={selectedBook.nombre}
            onClose={() => setOpenReserve(false)}
          />
        )}

      </div>

    </div>
  );
}