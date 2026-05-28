
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import './Favoritos.css';


export default function Favoritos(){
    const [detailBook, setDetailBook] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDetailBook(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    return(
        <>
        <h1>Mis Libros Favoritos</h1>

      <div ref={menuRef}>
        <button
          className="menu"
          onClick={() => setDetailBook(!detailBook)}
        >
          Hazme click y verás
        </button>

        {detailBook && (
          <div className="descriptionBook">
            <div className="bookContent">
                
            <div className="bookHeader">
                <img
                onClick={() => setSection('home')}
                src={logo}
                alt="logo"
                className="bookImage"
                />

                <h2>EL REGATERO</h2>
                <p className="author">Por MAOOA</p>
            </div>

            <div className="bookInfo">
                <div className="infoRow">
                <span>AÑO DE EDICIÓN</span>
                <p>2029</p>
                </div>

                <div className="infoRow">
                <span>DESCRIPCIÓN</span>
                <p>
                    e nvssdd nnsv nsn nsdnvosn vsk svjsdl nnvnsdn
                    sdvsnv nddsn nsdd nnsn ndsnnns n nsd ndsl
                    snvksn sdjsv jbsvsk svsk svnsvkv s nnsd
                    nnds snn sdn kk dsnkd ndsnvksn skdkdbksk
                    kdvbskbksv
                </p>
                </div>
            </div>
            </div>

            <button className="reserveBtn">
                RESERVAR
            </button>

            </div>
        )}
      </div>
        </>
    );
}