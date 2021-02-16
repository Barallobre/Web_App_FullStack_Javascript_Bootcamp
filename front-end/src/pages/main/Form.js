import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Form.css";
const Form = () => {
  const [tipoEspacio, setTipoEspacio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8081/busqueda", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        localidad,
        tipoEspacio,
        fechaInicio,
        fechaFin,
      }),
    });
    const json = await res.json();
    const respuesta = await json;

    history.push("/busqueda", {
      resultadoBusqueda: respuesta,
      fecha1: fechaInicio,
      fecha2: fechaFin,
    });
  };
  let fecha = new Date();
  let dia = fecha.getDate();
  let year = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;

  const diaActual = `"${year}-0${mes}-${dia}"`;
  console.log(typeof diaActual);
  return (
    <>
      <section className="main-formulario">
        <p style={{ width: "85%" }}>
          Rellena nuestro formulario y te indicaremos el espacio más acorde a
          tus necesidades. Disponemos de diversos tipos de espacio a lo largo de
          toda Galicia.
        </p>
        <div className="form" onSubmit={submitForm}>
          <form>
            <select onChange={(e) => setTipoEspacio(e.target.value)}>
              <option value=""></option>
              <option value="1">Diáfano</option>
              <option value="2">Pet-friendly</option>
              <option value="3">Sala de juntas</option>
              <option value="4">Eco-friendly</option>
            </select>
            <select onChange={(e) => setLocalidad(e.target.value)}>
              <option value=""></option>
              <option value="A Coruña">A Coruña</option>
              <option value="Lugo">Lugo</option>
              <option value="Ourense">Ourense</option>
              <option value="Pontevedra">Pontevedra</option>
            </select>
            <input
              id="fecha-inicio"
              type="date"
              placeholder="fecha inicio"
              min={diaActual}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
            <input
              id="fecha-fin"
              type="date"
              // min="2021-02-01"
              placeholder="fecha fin"
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
            <button>Buscar</button>
          </form>
        </div>
      </section>
      <hr />
    </>
  );
};

export default Form;
