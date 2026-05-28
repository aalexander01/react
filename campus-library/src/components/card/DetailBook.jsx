import { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import "./DetailBook.css";

export default function DetailBook(props) {

  const menuRef = useRef(null);

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
              src={props.imagen}
              alt={props.nombre}
              className="bookImage"
            />

            <h2>{props.nombre}</h2>

            <p className="author">
              {props.autor}
            </p>

          </div>

          <div className="bookInfo">

            <div className="infoRow">
              <span>AÑO DE EDICIÓN</span>
              <p>{props.edicion}</p>
            </div>

            <div className="infoRow">
              <span>DESCRIPCIÓN</span>
              <p>{props.descripcion}</p>
            </div>

          </div>

        </div>

        <button className="reserveBtn">
          RESERVAR
        </button>

      </div>

    </div>
  );
}