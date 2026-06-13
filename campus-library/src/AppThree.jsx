import './App.css';
import { Suspense } from 'react';
import { useState, useEffect, useRef } from "react";
import  LibraryThree  from "./pages/LibraryThree.jsx";
import  LibrarySearch  from "./pages/LibrarySearch.jsx";
import  Historial  from "./pages/Historial.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import Foot from "./Foot.jsx";
import logo from "./assets/logo.ico";
import { FiMenu } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { BsClipboard2MinusFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import Reservas from "./pages/Reservas.jsx";
import ListLectura from "./pages/ListLectura.jsx";
import { saveHistory } from "./localStorage/LSHistory.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtros, setFiltros] = useState(false);
  const menuRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [section, setSection] = useState('home');
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [typesSearch, setTypesSearch] = useState("title");

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 50;

    if (bottom) {
      loadMore();
    }
  };

  useEffect(() => {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  return <>
    <div className="app">
  
        {/* HEADER  */}
        <header className="header">
          <div className="logo">
              <img  onClick={() => setSection('home')} src={logo} alt="logo" style={{ width: "32px", borderRadius: "50%", objectFit: "contain" }}/>
              <span onClick={() => setSection('home')} >CAMPUS LIBRARY</span>
          </div>
  
          <div>
            <select
              name="filtro" 
              id="filtro"
              onChange={(e) => setTypesSearch(e.target.value)} 
            >
              <option  value="title">titulo de libro</option>
              <option value="author">autor de libro</option>
              <option value="isbn">id de libro</option>
            </select>
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search"
              placeholder="Buscar libros..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              className="search-btn"
              onClick={() => {
                setSearch(inputValue);
                saveHistory({
                  nombre: inputValue
                });
                setSection('librarySearch');
              }}
            >
              <IoSearch />
            </button>
          </div>
  
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu />
          </div>
          
        </header>
        {menuOpen && (
            <div ref={menuRef} className="menuPanel">
              <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <IoSunnySharp /> : <MdDarkMode />}
              </button>
              <button onClick={() => setFiltros(!filtros)}><FaFilter /> Filtro</button>
                {
                  filtros && (
                  // <div className="filtros">
                  <div className={`filtros ${filtros ? "open" : ""}`}>
                    <ul>
                      <li>
                        <span>Año</span>
                        <input type="number" min={"1700"} max={"2026"}  placeholder='Año'
                          defaultValue={1700}
                          onChange={(e) => setFromYear(e.target.value)}
                        />
                        <input type="number" min={fromYear} max={"2026"} defaultValue={fromYear}  placeholder='Año'
                        />
                      </li>
                      <li><button>Aplicar litro <FaFilter /></button></li>
                    </ul>
                  </div>
               
                  )
                }
              
              <button onClick={() => setSection('favoritos')}><MdFavorite/> | Favoritos</button>
              <button onClick={() => setSection('reservas')}><BsClipboard2MinusFill /> Reservas</button>
              <button onClick={() => setSection('list_lectura')}><FaBookReader /> Lista de lectura</button>
              <button onClick={() => setSection('historial')}><FaHistory /> Historial</button>
              <button onClick={() => setSection('home')}><IoHome/> Home</button>
            </div>
          )}
  
        {/* GRID */}
        <div className="gridContainer" onScroll={handleScroll}>
           {section === 'home' && <LibraryThree />}
           {section === 'librarySearch' && <LibrarySearch typess = {typesSearch}  searchp = {search}/>}
           {section === 'favoritos' && <Favoritos/>}
           {section === 'reservas' && <Reservas/>}
           {section === 'list_lectura' && <ListLectura/>}
           {section === 'historial' && <Historial/>}
           <hr />
           {/* FOOT */}
          <div className="foot">
            <Foot/>
          </div>
          
        
        </div>
        
        
      </div>
  </>;
}


export default App
