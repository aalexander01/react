import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { loginUsers } from "./localStorage/LSUsers";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
const [clave, setClave] = useState("");
const [sesion, setSesion] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Iniciar Sesión</h2>

        <form className="loginForm">
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

          <button
              type="button"
              className="loginButton"
              onClick={() => {
                const sesion = {
                  usuario: correo,
                  password: clave
                };

                const rol = loginUsers(sesion);
                console.log("lofin:: "+rol)
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