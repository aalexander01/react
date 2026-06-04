

export default function Historial(props) {
  
 
  const reservas = getHistory();
  return (

  
      <>
        
        <div className="reservasContainer">
        <h1>Historial</h1>
      {reservas.length === 0 ? (
        <p>Historial de navegacion vacio.</p>
      ) : (
        <table className="reservasTable">
          <thead>
            <tr>
              <th>Nombre del libro</th>
              <th>Estado</th>
              <th>Fecha de inicio</th>
              <th>Fecha de entrega</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.nombreLibro}</td>
                <td>{reserva.estado}</td>
                <td>{reserva.fechaInicio}</td>
                <td>{reserva.fechaEntrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      </>
  );
}