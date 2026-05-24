import './App.css';
import { Suspense } from 'react';
import { useState } from "react";
import  Library  from './components/pages/Library.jsx';
import  Historial  from './components/pages/Historial.jsx';
import Favoritos from './components/pages/Favoritos.jsx';
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
import Reservas from './components/pages/Reservas.jsx';
import ListLectura from './components/pages/ListLectura.jsx';


function App() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [section, setSection] = useState('home');

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 50;

    if (bottom) {
      loadMore();
    }
  };

  return <div className="app">
  
        {/* HEADER  */}
        <header className="header">
          <div className="logo">
              <img  onClick={() => setSection('home')} src={logo} alt="logo" style={{ width: "32px", borderRadius: "50%", objectFit: "contain" }}/>
              <span onClick={() => setSection('home')} >CAMPUS LIBRARY</span>
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
              <button ><FaFilter /> Filtro</button>
              <button onClick={() => setSection('favoritos')}><MdFavorite/> | Favoritos</button>
              <button onClick={() => setSection('reservas')}><BsClipboard2MinusFill /> Reservas</button>
              <button onClick={() => setSection('list_lectura')}><FaBookReader /> Lista de lectura</button>
              <button onClick={() => setSection('historial')}><FaHistory /> Historial</button>
              <button onClick={() => setSection('home')}><IoHome/> Home</button>
            </div>
          )}
  
        {/* GRID */}
        <div className="gridContainer" onScroll={handleScroll}>
           {section === 'home' && <Library search = {search}/>}
           {section === 'favoritos' && <Favoritos/>}
           {section === 'reservas' && <Reservas/>}
           {section === 'list_lectura' && <ListLectura/>}
           {section === 'historial' && <Historial/>}
          
        </div>
      </div>
  ;
}


export default App
