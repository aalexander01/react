import { use, useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { saveUsers } from "./localStorage/LSUsers";

/**
 * Componente Register
 * Permite registrar nuevos usuarios y almacenarlos en localStorage.
 */
export default function Register() {
  // Controla si la contraseña se muestra u oculta
  const [showPassword, setShowPassword] = useState(false);
  // Estados para almacenar los datos ingresados en el formulario
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  // Estado que almacena temporalmente el usuario a registrar
  const [user, setUser] = useState("");
  // Hook para realizar navegación entre rutas
  const navigate = useNavigate();
  // Estado que almacena el resultado del registro
  const [response, setResponse] = useState(false);

  /**
   * Cuando el estado "user" cambia,
   * se intenta guardar el usuario en localStorage.
   */
  useEffect(() => {
    if (user) {
      const ok = saveUsers(user);
      setResponse(ok);
      
    }
  }, [user]);

  /**
   * Si el registro fue exitoso,
   * redirige al usuario a la página principal.
   */
  useEffect(() => {
    console.log(response)
               if(response){
                  navigate("/")
                }
  }, [response]);

  return (
    <div className="registerContainer">
      {/* Tarjeta principal del formulario */}
      <div className="registerCard">
        <form className="registerForm">

          {/* Campo Nombre */}
          <div className="inputGroup">
            <label>Nombre</label>

            <div className="inputWrapper">
              <FaUser className="inputIcon" />

              <input
                type="text"
                placeholder="ingrese nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campo Apellido */}
          <div className="inputGroup">
            <label>Apellido</label>

            <div className="inputWrapper">
              <FaUser className="inputIcon" />

              <input
                type="text"
                placeholder="ingrese apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campo Correo Electrónico */}
          <div className="inputGroup">
            <label>Correo electrónico</label>

            <div className="inputWrapper">
              <FaEnvelope className="inputIcon" />

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="inputGroup">
            <label>Contraseña</label>

            <div className="inputWrapper">
              <FaLock className="inputIcon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          {/* Botón para mostrar u ocultar la contraseña */}
          <button
            type="button"
            className="registerButton"
            onClick={() => {
              // Construcción del objeto usuario
              setUser({
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                clave: password
              });
               
            }}
            
          >
            Registrar
          </button>
          
          {/* Enlace para usuarios que ya poseen cuenta */}
          <div className="registerFooter">
            <span>¿Ya tienes una cuenta?</span>

            <a href="/" className="loginLink">
              Inicia sesión
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}