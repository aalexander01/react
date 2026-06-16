import { useState } from "react";
import "./dashboard.css";
import { IoHome, IoSunnySharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";
import { Solicitudes, Usuarios } from "./UtilityDashboard";
import { getUsersActive, getUsersLength } from "../localStorage/LSUsers";
import CreateUser from "../components/card/CreateUser.jsx";

/**
 * Componente Dashboard
 * Panel administrativo con navegación lateral, modo oscuro y secciones dinámicas
 */
export default function DashBoard() {
  // Controla qué sección está activa (inicio, usuarios)
  const [active, setActive] = useState("inicio");
  // Controla el modo oscuro/claro del dashboard
  const [darkMode, setDarkMode] = useState(true);
  // Controla apertura/cierre del menú lateral (responsive)
  const [menuOpen, setMenuOpen] = useState(false);
  // Controla la visibilidad del modal de creación de usuario
  const [openCreateUser, setOpenCreateUser] = useState(false);
  
  /**
   * Renderiza el contenido dinámico según la sección activa
   */
  const renderContent = () => {
    switch (active) {
      /**
       * SECCIÓN: USUARIOS
       * Muestra estadísticas y listado de usuarios
       */
      case "usuarios":
        return (
          <>
            {/* Tarjetas de resumen */}
            {/* <div className="cards">
              <div className="card">
                <h3>Usuarios Registrados</h3>
                <span> {getUsersLength()} </span><br />
      
                <span><button onClick={() =>  setOpenCreateUser(true)}>Crear Usuario</button> </span>
              </div>
              
              <div className="card">
                <h3>Activos</h3>
                <span>{getUsersActive()}</span>
              </div>
            </div> */}

            <div>
              {/* Listado de usuarios */}
              <Usuarios/>
            </div>
          </>
        );
      default:
        return (
            /**
             * SECCIÓN POR DEFECTO (INICIO)
             * Muestra solicitudes u otra vista principal
             */
            <div>
              
              <Solicitudes/>
             </div>
        );
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>

      {/* SIDEBAR: navegación lateral */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="logo">
          <h2>ADMIN</h2>
        </div>
        {/* Navegación principal */}
        <nav>
          <button onClick={() => setActive("inicio")}>
            <IoHome/> Home
          </button>

          <button onClick={() => setActive("usuarios")}>
            <ImUsers /> Usuarios
          </button>
        </nav>
      </aside>

      {/* MAIN */}
       {/* CONTENIDO PRINCIPAL */}
      <div className="main">
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h1>Dashboard Administrativo</h1>

          {/* Modal de creación de usuario */}
          {openCreateUser && <CreateUser onClose = {() => setOpenCreateUser(false)}/>}

          {/* Botón para alternar tema oscuro/claro */}
          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdDarkMode/>  : <IoSunnySharp />}
          </button>
        </header>

        {/* Render dinámico de contenido */}
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
}