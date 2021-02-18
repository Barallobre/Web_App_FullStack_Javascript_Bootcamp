import { useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "./AdministrarEspacios.css";
import { AuthContext } from "../components/providers/AuthProvider";

function AdministrarEspacios() {
  const [respuesta, setRespuesta] = useState([]);
  const [auth] = useContext(AuthContext);

  const history = useHistory();

  const token = auth;
  console.log(respuesta);
  useEffect(() => {
    espacios();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function modificar(id) {
    history.push(`/admin/${id}/update`);
  }

  function handleClickEliminar(espacio) {
    console.log(espacio);

    removeEspacio(espacio);
    eliminar(espacio);
  }

  function removeEspacio(espacio) {
    setRespuesta(respuesta.filter((res) => res.IdEspacio !== espacio));
  }
  async function eliminar(id) {
    await fetch(`http://localhost:8081/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
  }
  async function consultar(id) {
    const res = await fetch(`http://localhost:8081/admin/${id}/incidencias`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const json = await res.json();
    const respuesta = await json;

    if (respuesta.length !== 0) {
      history.push(`/admin/${id}/incidencias`);
    }
  }
  async function espacios() {
    const res = await fetch(`http://localhost:8081/admin`, {
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

  return respuesta.map((espacio) => (
    <ul className="lista-espacios-admin" key={espacio.IdEspacio}>
      <div className="lista">
        <li>{espacio.Nombre}</li>
        <li>{espacio.TipoEspacio}</li>
      </div>
      <div className="botones-espacios">
        <button onClick={(e) => modificar(espacio.IdEspacio)}>Modificar</button>
        <button onClick={(e) => consultar(espacio.IdEspacio)}>
          Incidencias
        </button>
        <button onClick={(e) => handleClickEliminar(espacio.IdEspacio)}>
          Eliminar
        </button>
      </div>
    </ul>
  ));
}

export default AdministrarEspacios;
