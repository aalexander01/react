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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [response, setResponse] = useState(false);
  useEffect(() => {
    if (user) {
      const ok = saveUsers(user);
      setResponse(ok);
      
    }
  }, [user]);

  useEffect(() => {
    console.log(response)
               if(response){
                  navigate("/")
                }
  }, [response]);

  return (
    <div className="registerContainer">
      
      <div className="registerCard">
        <form className="registerForm">

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

          <button
            type="button"
            className="registerButton"
            onClick={() => {
              setUser({
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                clave: password
              });
              console.log(nombre)
               console.log("HTML:: "+user);
               
            }}
            
          >
            Registrar
          </button>

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