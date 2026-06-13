import { useState } from "react";
import {getHistory} from "../localStorage/LSHistory.jsx"
import "./Historial.css";
export default function Historial(props) {
  const [order, setOrder] = useState("asc");
 
  const historys = getHistory().sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);

    return order === "asc"
      ? fechaA - fechaB
      : fechaB - fechaA;
  });
  return (

  
      <>
        
        <div className="historyContainer">
        <h1>Historial</h1>
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
      {historys.length === 0 ? (
        <p>Historial de navegacion vacio.</p>
      ) : (
        <table className="historyTable">
          <thead>
            <tr>
              <th>Nombre del libro</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {historys.map((history, index) => (
              <tr key={index}>
                <td>{history.nombreLibro}</td>
                <td>{history.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      </>
  );
}