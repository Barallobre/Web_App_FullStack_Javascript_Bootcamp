import React, { useEffect, useState } from "react";
import "./MasInfo.css";
import { v4 as uuidv4 } from "uuid";
function MasInfo({ match }) {
  const [equipamiento, setEquipamiento] = useState([]);

  useEffect(() => {
    Equipamiento();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Equipamiento = async () => {
    const idEspacio = match.params.id;
    let IdEspacio = idEspacio.toString();

    const res = await fetch(`http://localhost:8081/equipamiento/${IdEspacio}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await res.json();
    const respuesta = await json;

    setEquipamiento(respuesta);
  };

  return equipamiento.map((equipo, index) => (
    <div className="lista-equipamiento">
      <ul key={index}>
        <li>{equipo.TipoEquipamiento}</li>
        <li>{equipo.Cantidad}</li>
      </ul>
      <hr />
    </div>
  ));
}
export default MasInfo;
