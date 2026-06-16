import { useState } from "react";
import { getReserve, updateReserve } from "../localStorage/LSReserve";
import { saveListLecture } from "../localStorage/LSListLectura";
import "./UtilityDashboard.css";
import { getUsers } from "../localStorage/LSUsers";

export function Solicitudes(){
    const [order, setOrder] = useState("asc");
    const [estados, setEstados] = useState({});
    const [mensaje, setMensaje] = useState("")
    const reservas = getReserve().sort((a, b) => {
        const fechaA = new Date(a.fechaInicio);
        const fechaB = new Date(b.fechaInicio);
    
        return order === "asc"
          ? fechaA - fechaB
          : fechaB - fechaA;
    });

    const handleEstadoChange = (nombreLibro, nuevoEstado) => {
        setEstados(prev => ({
            ...prev,
            [nombreLibro]: nuevoEstado
        }));
    };
    const [state, setState] = useState("");
      return (
    
          <>
            
            <div className="utilityContainer">
            <div className="tableActions">
            <button
            className="sortButton"
            onClick={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            
            {order === "asc" ? "↑ Ascendente" : "↓ Descendente"}
          </button>
          </div>
            {mensaje && (
                <div className="toast-success">
                    {mensaje}
                </div>
            )}
          {reservas.length === 0 ? (
            <p>Generacion de solicitudes vacio.</p>
          ) : (
            
            <table className="utilityTable">
              <thead>
                <tr>
                  <th>Nombre del libro</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Entrega</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => (
                  <tr key={index}>
                    <td>{reserva.nombreLibro}</td>
                    <td>{reserva.fechaInicio}</td>
                    <td>{reserva.fechaEntrega}</td>
                    <td>
                        <select
                            name="estado"
                            value={estados[reserva.nombreLibro] ?? reserva.estado}
                            onChange={(e) =>
                                handleEstadoChange(
                                    reserva.nombreLibro,
                                    e.target.value
                                )
                            }
                        >
                            <option value="reservado">
                                Reservado
                            </option>

                            <option value="aprobado">
                                Aprobado
                            </option>

                            <option value="denegado">
                                Denegado
                            </option>
                        </select>
                    </td>
                    <td>    
                        <button
                            className="btnSave"
                            onClick={() => {

                                const estadoSeleccionado =
                                    estados[reserva.nombreLibro] ??
                                    reserva.estado;

                                const solicitud = {
                                    nombre: reserva.nombreLibro,
                                    estado: estadoSeleccionado
                                };

                                const ok = updateReserve(solicitud);

                                if (ok) {

                                    saveListLecture({
                                        nombreLibro: reserva.nombreLibro,
                                        estado: estadoSeleccionado,
                                        fechaInicio: reserva.fechaInicio,
                                        fechaFin: reserva.fechaEntrega
                                    });

                                    setMensaje("Estado actualizado correctamente");
                                    setTimeout(() => {
                                        setMensaje("");
                                    }, 3000);
                                }
                            }}
                        >
                            Actualizar
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
          </>
      );
    
}

export function Usuarios(){
    const [order, setOrder] = useState("asc");
     
      const users = getUsers().sort((a, b) => {
        const fechaA = new Date(a.fechaCreacion);
        const fechaB = new Date(b.fechaCreacion);
    
        return order === "asc"
          ? fechaA - fechaB
          : fechaB - fechaA;
      });
      return (
    
      
          <>
            
            <div className="utilityContainer">
            <div className="tableActions">
            <button
            className="sortButton"
            onClick={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            
            {order === "asc" ? "↑ Ascendente" : "↓ Descendente"}
          </button>
          </div>
          {users.length === 0 ? (
            <p>Generacion de solicitudes vacio.</p>
          ) : (
            <table className="utilityTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Usuario</th>
                  <th>Clave</th>
                  <th>Rol</th>
                  <th >Estado</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((users, index) => (
                  <tr key={index}>
                    <td>{users.nombre}</td>
                    <td>{users.apellido}</td>
                    <td>{users.user}</td>
                    <td>{users.password}</td>
                    <td>{users.rol}</td>
                    <td>
                        <select name="estado" id="estado">
                            <option value={users.estado}>{users.estado}</option>
                            <option value="inactivo">inactivo</option>
                            <option value="reportado">reportado</option>

                        </select>
                    </td>
                    <td>{users.fechaCreacion}</td>
                    <td><button className="btnSave">actualizar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
          </>
      );
    
}