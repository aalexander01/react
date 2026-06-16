// Importación de estilos globales
import './App.css';

// Importación de componentes y hooks de React
import { Suspense } from 'react';
import { useState, useEffect, useRef } from "react";

// Importación de navegación entre rutas
import { useNavigate } from "react-router-dom";

// Importación de componentes de páginas
import LibraryThree from "./pages/LibraryThree.jsx";
import LibrarySearch from "./pages/LibrarySearch.jsx";
import Historial from "./pages/Historial.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import Reservas from "./pages/Reservas.jsx";
import ListLectura from "./pages/ListLectura.jsx";

// Componentes auxiliares
import Foot from "./Foot.jsx";

// Recursos gráficos
import logo from "./assets/logo.ico";

// Importación de iconos
import { FiMenu } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";

// Función para guardar búsquedas en el historial local
import { saveHistory } from "./localStorage/LSHistory.jsx";

function App() {

  // Texto que se utilizará para realizar búsquedas
  const [search, setSearch] = useState("");

  // Controla la apertura y cierre del menú lateral
  const [menuOpen, setMenuOpen] = useState(false);

  // Controla la visualización del panel de filtros
  const [filtros, setFiltros] = useState(false);

  // Referencia al menú para detectar clics fuera de él
  const menuRef = useRef(null);

  // Estado para activar o desactivar el modo oscuro
  const [darkMode, setDarkMode] = useState(false);

  // Determina qué sección se muestra actualmente
  const [section, setSection] = useState('home');

  // Rango de años aplicado a la búsqueda
  const [fromYear, setFromYear] = useState(1700);
  const [toYear, setToYear] = useState(new Date().getFullYear());

  // Valores temporales utilizados antes de aplicar filtros
  const [fromYearTwo, setFromYearTwo] = useState(1700);
  const [toYearTwo, setToYearTwo] = useState(new Date().getFullYear());

  // Valor ingresado por el usuario en el campo de búsqueda
  const [inputValue, setInputValue] = useState("");

  // Tipo de búsqueda: por título o por autor
  const [typesSearch, setTypesSearch] = useState("title");

  // Hook para navegación entre rutas
  const navigate = useNavigate();

  /**
   * Detecta cuando el usuario llega al final del contenedor
   * para cargar más contenido.
   */
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 50;

    if (bottom) {
      loadMore();
    }
  };

  /**
   * Cierra el menú cuando el usuario hace clic
   * fuera de su área visible.
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      {/* Contenedor principal con soporte para modo oscuro */}
      <div className={darkMode ? "app dark" : "app"}>

        {/* =========================
             CABECERA DE LA APLICACIÓN
        ========================== */}
        <header className="header">

          {/* Logo y nombre del sistema */}
          <div className="logo">
            <img
              onClick={() => setSection('home')}
              src={logo}
              alt="logo"
              style={{
                width: "32px",
                borderRadius: "50%",
                objectFit: "contain"
              }}
            />
            <span onClick={() => setSection('home')}>
              CAMPUS LIBRARY
            </span>
          </div>

          {/* Selector de tipo de búsqueda */}
          <div>
            <select
              name="filtro"
              id="filtro"
              onChange={(e) =>
                setTypesSearch(e.target.value)
              }
            >
              <option value="title">
                titulo de libro
              </option>
              <option value="author">
                autor de libro
              </option>
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div className="search-container">

            <input
              type="text"
              className="search"
              placeholder="Buscar libros..."
              value={inputValue}
              onChange={(e) =>
                setInputValue(e.target.value)
              }
            />

            {/* Botón para ejecutar búsqueda */}
            <button
              className="search-btn"
              onClick={() => {

                // Guarda el término buscado
                setSearch(inputValue);

                // Registra la búsqueda en historial local
                saveHistory({
                  nombre: inputValue
                });

                // Redirecciona a la vista de resultados
                setSection('librarySearch');
              }}
            >
              <IoSearch />
            </button>

          </div>

          {/* Botón para mostrar u ocultar menú lateral */}
          <div
            className="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu />
          </div>

        </header>

        {/* =========================
             MENÚ LATERAL
        ========================== */}
        {menuOpen && (
          <div ref={menuRef} className="menuPanel">

            {/* Cambio entre modo claro y oscuro */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode
                ? <MdDarkMode />
                : <IoSunnySharp />}
            </button>

            {/* Mostrar u ocultar filtros */}
            <button
              onClick={() =>
                setFiltros(!filtros)
              }
            >
              <FaFilter /> Filtro
            </button>

            {/* Panel de filtros */}
            {filtros && (
              <div
                className={`filtros ${
                  filtros ? "open" : ""
                }`}
              >
                <ul>

                  {/* Rango de años */}
                  <li>
                    <span>Año</span>

                    <input
                      type="number"
                      min="1700"
                      max="2026"
                      placeholder="Año"
                      value={fromYearTwo}
                      onChange={(e) =>
                        setFromYearTwo(
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="number"
                      min={fromYearTwo}
                      max="2026"
                      placeholder="Año"
                      value={toYearTwo}
                      onChange={(e) =>
                        setToYearTwo(
                          Number(e.target.value)
                        )
                      }
                    />
                  </li>

                  {/* Aplicar filtros */}
                  <li>
                    <button
                      onClick={() => {
                        setToYear(toYearTwo);
                        setFromYear(fromYearTwo);
                      }}
                    >
                      Aplicar filtro <FaFilter />
                    </button>
                  </li>

                </ul>
              </div>
            )}

            {/* Navegación entre secciones */}
            <button
              onClick={() =>
                setSection('favoritos')
              }
            >
              <MdFavorite /> | Favoritos
            </button>

            <button
              onClick={() =>
                setSection('list_lectura')
              }
            >
              <FaBookReader />
              {" "}Lista de lectura
            </button>

            <button
              onClick={() =>
                setSection('historial')
              }
            >
              <FaHistory />
              {" "}Historial
            </button>

            <button
              onClick={() =>
                setSection('home')
              }
            >
              <IoHome /> Home
            </button>

            {/* Cerrar sesión */}
            <button
              onClick={() => navigate("/")}
            >
              <FaPowerOff />
              {" "}Cerrar Sesion
            </button>

          </div>
        )}

        {/* =========================
             CONTENIDO PRINCIPAL
        ========================== */}
        <div
          className="gridContainer"
          onScroll={handleScroll}
        >

          {/* Página principal */}
          {section === 'home' && (
            <LibraryThree
              fromYear={fromYear}
              toYear={toYear}
            />
          )}

          {/* Resultados de búsqueda */}
          {section === 'librarySearch' && (
            <LibrarySearch
              typess={typesSearch}
              searchp={search}
            />
          )}

          {/* Favoritos */}
          {section === 'favoritos' && (
            <Favoritos />
          )}

          {/* Reservas */}
          {section === 'reservas' && (
            <Reservas />
          )}

          {/* Lista de lectura */}
          {section === 'list_lectura' && (
            <ListLectura />
          )}

          {/* Historial */}
          {section === 'historial' && (
            <Historial />
          )}

          <hr />

          {/* Pie de página */}
          <div className="foot">
            <Foot />
          </div>

        </div>

      </div>
    </>
  );
}

export default App;