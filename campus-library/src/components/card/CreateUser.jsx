import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveUsers } from "../../localStorage/LSUsers";

/**
 * Componente modal para la creación de nuevos usuarios.
 * Permite capturar información básica y almacenarla
 * en localStorage mediante la función saveUsers.
 */
export default function CreateUser(props) {
  // Controla la visualización de la contraseña.
  const [showPassword, setShowPassword] = useState(false);
  // Estados para los campos del formulario.
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  // Objeto usuario que será almacenado.
  const [user, setUser] = useState("");
  // Estado que almacena la respuesta de la operación de guardado.
  const [response, setResponse] = useState(false);

  /**
   * Se ejecuta cada vez que cambia el objeto user.
   * Si existe información válida, intenta guardar
   * el usuario y almacena el resultado de la operación.
   */
  useEffect(() => {
    if (user) {
      const ok = saveUsers(user);
      setResponse(ok);
      
    }
  }, [user]);

  /**
   * Monitorea el resultado del proceso de guardado.
   * Si la operación fue exitosa, cierra el modal.
   */
  useEffect(() => {
    console.log(response)
               if(response){
                  props.onClose();
                }
  }, [response]);

  return (
    <div className="reservationOverlay">
          <div className="reservationModal">
    
            <button
              className="closeBtn"
              onClick={props.onClose}
            >
              ✕
            </button>
    
            <form className="reservationForm">
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
              {/* Botón que construye el objeto usuario y dispara el proceso de guardado */}
              <button
                type="submit"
                className="reserveButton"
                type="button"
                onClick={() => {
                setUser({
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    clave: password
                });
                       
                }}
              >
                Crear Usuario
              </button>
            </form>
    
          </div>
        </div>
  );
}