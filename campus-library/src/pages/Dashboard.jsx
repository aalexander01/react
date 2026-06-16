import { useState } from "react";
import "./dashboard.css";
import { IoHome, IoSunnySharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";
import { Solicitudes, Usuarios } from "./UtilityDashboard";

export default function DashBoard() {
  const [active, setActive] = useState("inicio");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "usuarios":
        return (
          <>
            <div className="cards">
              <div className="card">
                <h3>Usuarios Registrados</h3>
                <span>2</span>
              </div>
              <div className="card">
                <h3>Activos</h3>
                <span>2</span>
              </div>
            </div>

            <div>
              <Usuarios/>
            </div>
          </>
        );

      // case "productos":
      //   return (
      //     <div className="cards">
      //       <div className="card">
      //         <h3>Productos</h3>
      //         <span>542</span>
      //       </div>
      //     </div>
      //   );

      // case "reportes":
      //   return (
      //     <div className="card">
      //       <h2>Reportes</h2>
      //       <p>Aquí irán las gráficas y estadísticas.</p>
      //     </div>
      //   );

      default:
        return (
            
            <div>
              
              <Solicitudes/>
             </div>
          
          // <div className="cards">
          //   <div className="card">
          //     <h3>Ventas</h3>
          //     <span>$15,200</span>
          //   </div>

          //   <div className="card">
          //     <h3>Clientes</h3>
          //     <span>328</span>
          //   </div>

          //   <div className="card">
          //     <h3>Pedidos</h3>
          //     <span>98</span>
          //   </div>
          // </div>
        );
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* SIDEBAR */}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="logo">
          <h2>ADMIN</h2>
        </div>

        <nav>
          <button onClick={() => setActive("inicio")}>
            <IoHome/> Home
          </button>

          <button onClick={() => setActive("usuarios")}>
            <ImUsers /> Usuarios
          </button>
{/* 
          <button onClick={() => setActive("productos")}>
             Productos
          </button>

          <button onClick={() => setActive("reportes")}>
             Reportes
          </button> */}
        </nav>
      </aside>

      {/* MAIN */}

      <div className="main">
        <header className="header">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h1>Dashboard Administrativo</h1>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdDarkMode/>  : <IoSunnySharp />}
          </button>
        </header>

        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
}