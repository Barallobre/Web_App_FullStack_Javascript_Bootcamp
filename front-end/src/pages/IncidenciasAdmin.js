import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";

const IncidenciasAdmin = ({ match }) => {
  const [auth] = useContext(AuthContext);
  const [datosBusqueda, setDatosBusqueda] = useState([]);

  const token = auth;

  useEffect(() => {
    consultar();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function consultar() {
    const idEspacio = match.params.id;
    let IdEspacio = idEspacio.toString();
    const res = await fetch(
      `http://localhost:8081/admin/${IdEspacio}/incidencias`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );

    if (res.status === 200) {
      const json = await res.json();

      setDatosBusqueda(json);
    } else {
      console.error("Ha habido un error", res.statusText);
    }
  }

  async function bajaIncidencia(id) {
    await fetch(`http://localhost:8081/incidencias/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
  }
  function removeIncidencia(incidencia) {
    setDatosBusqueda(
      datosBusqueda.filter(
        (res) => res.IdIncidencia !== incidencia.IdIncidencia
      )
    );
  }
  function handleClick(incidencia) {
    let id = incidencia.IdIncidencia;
    removeIncidencia(incidencia);
    bajaIncidencia(id);
  }

  return datosBusqueda.map((incidencia) => (
    <ul className="lista-busqueda" key={incidencia.IdIncidencia}>
      <li>{incidencia.NombreTipo}</li>
      <li>{incidencia.FechaAlta}</li>
      <li>{incidencia.Descripcion}</li>
      <button onClick={(e) => handleClick(incidencia)}>Baja incidencia</button>
    </ul>
  ));
};
export default IncidenciasAdmin;
