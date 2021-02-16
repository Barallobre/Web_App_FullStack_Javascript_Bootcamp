import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import "./Reservas.css";

const Reservas = () => {
  const [respuesta, setRespuesta] = useState([]);
  const [auth] = useContext(AuthContext);
  // const[volver,setVolver] = useState(false)
  const history = useHistory();

  const token = auth;
  let decoded = jwtDecode(token);
  const id = decoded.id;

  useEffect(() => {
    reservas(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function reservas(id) {
    const res = await fetch(`http://localhost:8081/user/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const json = await res.json();
    const respuesta = await json;

    setRespuesta(respuesta);
  }

  function handleClick(reserva) {
    let id = reserva.IdReserva;
    removeReserva(reserva);
    borrar(id);
  }

  async function borrar(id) {
    await fetch(`http://localhost:8081/user/cancelar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
  }

  function removeReserva(reserva) {
    setRespuesta(
      respuesta.filter((res) => res.IdReserva !== reserva.IdReserva)
    );
  }

  function reportar(e, idEspacio) {
    e.preventDefault();
    history.push(`/incidencias`, {
      id: idEspacio,
    });
  }

  if (respuesta.length !== 0) {
    return respuesta.map((reserva) => (
      <ul className="lista-reservas" key={reserva.IdReserva}>
        <div className="lista">
          <li>{reserva.Nombre}</li>
          <li>{reserva.FechaInicio}</li>
          <li>{reserva.FechaFin}</li>
        </div>
        <div className="botones-lista">
          <button onClick={(e) => handleClick(reserva)}>Cancelar</button>
          <button onClick={(e) => reportar(e, reserva.IdEspacio)}>
            Reportar
          </button>
        </div>
      </ul>
    ));
  } else if (respuesta.length === 0) {
    return (
      <h1
        style={{ marginTop: "10rem", textAlign: "center", fontSize: "1.5rem" }}
      >
        No tiene reservas en estos momentos.
      </h1>
    );
  }
};
export default Reservas;
