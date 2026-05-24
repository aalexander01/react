import { useState } from "react";
import { useBooks } from "../book/useBooks";

import { FiMenu } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { BsClipboard2MinusFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

import logo from "../../assets/logo.ico";
import "./library.css";

export default function Library() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { visibleBooks, loading, error, loadMore } = useBooks(search);
  const [darkMode, setDarkMode] = useState(false);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 50;

    if (bottom) {
      loadMore();
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
            <img src={logo} alt="logo" style={{ width: "32px", borderRadius: "50%", objectFit: "contain" }}/>
            <span>CAMPUS LIBRARY</span>
        </div>

        <input
          className="search"
          placeholder="Buscar libros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu />
        </div>
        
      </header>
      {menuOpen && (
          <div className="dropdownMenu">
            <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <IoSunnySharp /> : <MdDarkMode />}
            </button>
            <button><FaFilter /> Filtro</button>
            <button><MdFavorite/> | Favoritos</button>
            <button><BsClipboard2MinusFill /> Reservas</button>
            <button><FaBookReader /> Lista de lectura</button>
            <button><FaHistory /> Historial</button>
          </div>
        )}

      {/* GRID */}
      <div className="gridContainer" onScroll={handleScroll}>
        {loading && <p className="msg">Cargando...</p>}
        {error && <p className="msg error">{error}</p>}

        <div className="grid">
          {visibleBooks.map((book) => (
            <div className="card" key={book.key}>
              <img style={{objectFit: "contain"}}
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />

              <div className="info">
                <p className="label">NOMBRE</p>
                <p className="title">{book.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}