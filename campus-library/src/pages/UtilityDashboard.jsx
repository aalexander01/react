import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { getReserve, updateReserve } from "../localStorage/LSReserve";
import { saveListLecture } from "../localStorage/LSListLectura";
import "./UtilityDashboard.css";
import { deleteByUser, getUsers } from "../localStorage/LSUsers";

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
    
      
    const [users, setUsers] = useState(getUsers());
    const usersSort = users.sort((a, b) => {
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
            <div className="tableWrapper">
              <table className="utilityTable">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Usuario</th>
                    <th>Clave</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usersSort.map((user, index) => (
                    <tr key={index}>
                      <td>{user.nombre}</td>
                      <td>{user.apellido}</td>
                      <td>{user.user}</td>
                      <td>{user.password}</td>
                      <td>{user.rol}</td>
                      <td>
                        {user.estado}
                      </td>
                      <td>{user.fechaCreacion}</td>
                      <td>
                        <MdDelete size={32} className="btnDelete" onClick={() => setUsers(deleteByUser(user.user))}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
      );
    
}