import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import "./DetailBook.css";
import ReservationForm from "./ReservationForm.jsx"
import {SaveFavorite} from "../../localStorage/LSFavoritos.jsx"
import { CiStar } from "react-icons/ci";

export default function DetailBook(props) {

  const menuRef = useRef(null);
  const [openReserve, setOpenReserve] = useState(false);
  const [selected, setSelected] = useState(false);
  const selectedBook = props.selectedBook;
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
        <button
          className="reserveBtn"
          onClick={() => setOpenReserve(true)}
        >
          RESERVAR
        </button>

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