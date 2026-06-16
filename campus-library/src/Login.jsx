import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { loginUsers } from "./localStorage/LSUsers";
import { useNavigate } from "react-router-dom";

/**
 * Componente Login
 *
 * Permite al usuario autenticarse mediante correo electrónico
 * y contraseña. Dependiendo del rol obtenido tras la validación,
 * redirige a diferentes secciones de la aplicación.
 */
export default function Login() {
  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estado para almacenar el correo ingresado
  const [correo, setCorreo] = useState("");
  // Estado para almacenar la contraseña ingresada
  const [clave, setClave] = useState("");
  // Estado para almacenar datos de sesión 
  const [sesion, setSesion] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Iniciar Sesión</h2>

        <form className="loginForm">
          {/* ================= CORREO ELECTRÓNICO ================= */}
          <div className="inputGroup">
            <label>Correo electrónico</label>

            <div className="inputWrapper">
              <FaEnvelope className="inputIcon" />

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>

          {/* ================= CONTRASEÑA ================= */}
          <div className="inputGroup">
            <label>Contraseña</label>

            <div className="inputWrapper">
              <FaLock className="inputIcon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />

              <button
                type="button"
                className="eyeButton"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* ================= BOTÓN DE ACCESO ================= */}
          <button
              type="button"
              className="loginButton"
              onClick={() => {
                const sesion = {
                  usuario: correo,
                  password: clave
                };

                // Validación de credenciales
                const rol = loginUsers(sesion);
                
                // Redirección según el rol del usuario
                if (rol === "admin") {
                  navigate("/dashboard");
                }

                if (rol === "usuario") {
                  navigate("/home_library");
                }
              }}
            >
              Entrar
            </button>
            
            {/* ================= ENLACE DE REGISTRO ================= */}
            <div className="loginFooter">
                <span>¿No tienes una cuenta?</span>
                <a href="/register" className="registerLink">
                    Regístrate aquí
                </a>
            </div>
        </form>
      </div>
      
    </div>
  );
}