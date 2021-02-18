import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import "./ResultadoBusqueda.css";

const ResultadoBusqueda = () => {
  const location = useLocation();

  const [datosBusqueda, setDatosBusqueda] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const history = useHistory();

  async function confirmar(e, id, nombre, localidad, coste) {
    e.preventDefault();

    history.push(`/confirmar`, {
      id: id,
      nombre: nombre,
      localidad: localidad,
      coste: coste,
      fecha1: fechaInicio,
      fecha2: fechaFin,
    });
  }

  useEffect(() => {
    setDatosBusqueda(location.state["resultadoBusqueda"]);
    setFechaInicio(location.state["fecha1"]);
    setFechaFin(location.state["fecha2"]);
    return () => {
      setFechaInicio("");
      setFechaFin("");
      setDatosBusqueda([]);
    };
  }, [location.state]);

  async function masInfo(idEspacio) {
    history.push(`/equipamiento/${idEspacio}`);
  }

  if (!datosBusqueda) {
    return null;
  }
  if (datosBusqueda.length !== 0) {
    return datosBusqueda.map((x) => (
      <ul className="lista-busqueda" key={x.IdEspacio}>
        <div className="lista-busqueda2">
          <li>{x.Nombre}</li>
          <li>{x.Localidad}</li>
          <li>{x.CosteDiario}€</li>
          <img
            src={`http://localhost:8081/files/espacios/fotoEspacio${x.Nombre.replaceAll(
              /\s/g,
              ""
            )}.png`}
            alt={`fotoEspacio${x.Nombre.replaceAll(/\s/g, "")}.png`}
          />
        </div>
        <div className="buttons">
          <button
            onClick={(e) =>
              confirmar(e, x.IdEspacio, x.Nombre, x.Localidad, x.CosteDiario)
            }
          >
            Reservar
          </button>

          <button className="masInfo" onClick={(e) => masInfo(x.IdEspacio)}>
            Equipo disponible
          </button>
        </div>
      </ul>
    ));
  } else if (datosBusqueda.length === 0) {
    return (
      <h1
        style={{ marginTop: "10rem", textAlign: "center", fontSize: "1.5rem" }}
      >
        No existen resultados con los parámetros indicados.
      </h1>
    );
  }
};
export default ResultadoBusqueda;
