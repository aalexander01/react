import { useState } from "react";
import { getListLecture } from "../localStorage/LSListLectura";

export default  function ListLectura(){
    const [order, setOrder] = useState("asc");
     
      const lectures = getListLecture().sort((a, b) => {
        const fechaA = new Date(a.fechaInicio);
        const fechaB = new Date(b.fechaInicio);
    
        return order === "asc"
          ? fechaA - fechaB
          : fechaB - fechaA;
      });
    return(
        <>
            <div className="historyContainer">
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
        {lectures.length === 0 ? (
            <p>Listado de lecturas vacio.</p>
        ) : (
            <table className="historyTable">
            <thead>
                <tr>
                <th>Nombre del libro</th>
                <th>estado</th>
                <th>pagina</th>
                <th>fecha Inicio</th>
                <th>fecha Entrega</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {lectures.map((lecture, index) => (
                <tr key={index}>
                    <td>{lecture.nombreLibro}</td>
                    <td>{lecture.estado}</td>
                    <td>{lecture.pagina}</td>
                    <td>{lecture.fechaInicio}</td>
                    <td>{lecture.fechaFin}</td>
                    <td><button>Ver Libro</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
        </>
    );
}