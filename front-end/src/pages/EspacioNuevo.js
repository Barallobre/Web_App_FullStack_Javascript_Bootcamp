import React, { useContext, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useHistory } from "react-router-dom";
import "./EspacioNuevo.css";
function EspacioNuevo() {
  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const [picture, setPicture] = useState(null);
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [tipoEspacio, setTipoEspacio] = useState("");
  const [fechaInicioDisp, setFechaInicioDisp] = useState("");
  const [fechaFinDisp, setFechaFinDisp] = useState("");
  const [costeDia, setCosteDia] = useState("");
  const [Sillas, setSillas] = useState("");
  const [Mesas, setMesas] = useState("");
  const [Proyector, setProyector] = useState("");
  const [Pantalla, setPantalla] = useState("");
  const [Monitores, setMonitores] = useState("");

  const token = auth;

  const update = async (e) => {
    let data = new FormData();
    data.append("picture", picture);
    data.append("nombre", nombre);
    data.append("localidad", localidad);
    data.append("tipoEspacio", tipoEspacio);
    data.append("fechaInicioDisp", fechaInicioDisp);
    data.append("fechaFinDisp", fechaFinDisp);
    data.append("costeDia", costeDia);
    data.append("Sillas", Sillas);
    data.append("Mesas", Mesas);
    data.append("Proyector", Proyector);
    data.append("Pantalla", Pantalla);
    data.append("Monitores", Monitores);

    e.preventDefault();
    await fetch(`http://localhost:8081/admin/nuevo`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  const onFileChange = (event) => {
    const f = event.target.files[0];
    setPicture(f);
  };

  return (
    <div onSubmit={update} className="espacio-nuevo">
      <form>
        <div>Nombre</div>
        <input
          id="nombre"
          type="text"
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <div>Localización</div>
        <select onChange={(e) => setLocalidad(e.target.value)}>
          <option value="0"></option>
          <option value="A Coruña">A Coruña</option>
          <option value="Lugo">Lugo</option>
          <option value="Ourense">Ourense</option>
          <option value="Pontevedra">Pontevedra</option>
          <option value="Vigo">Vigo</option>
          <option value="Ferrol">Ferrol</option>
        </select>
        <div>Tipo de espacio</div>
        <select onChange={(e) => setTipoEspacio(e.target.value)}>
          <option value="0"></option>
          <option value="1">Diáfano</option>
          <option value="2">Pet-friendly</option>
          <option value="3">Sala de juntas</option>
          <option value="4">Eco-friendly</option>
        </select>
        <div>Fecha inicio disponibilidad</div>
        <input
          id="fechaInicioDisp"
          type="date"
          onChange={(e) => setFechaInicioDisp(e.target.value)}
          required
        />
        <div>Fecha fin disponibilidad</div>
        <input
          id="fechaFinDisp"
          type="date"
          onChange={(e) => setFechaFinDisp(e.target.value)}
          required
        />
        <div>Coste diario</div>
        <input
          id="costeDia"
          type="text"
          onChange={(e) => setCosteDia(e.target.value)}
          required
        />
        <div>Imagen</div>
        <input id="picture" type="file" onChange={onFileChange} required />
        <div>Sillas</div>
        <input
          id="sillas"
          type="text"
          onChange={(e) => setSillas(e.target.value)}
          required
        />
        <div>Mesas</div>
        <input
          id="mesas"
          type="text"
          onChange={(e) => setMesas(e.target.value)}
          required
        />
        <div>Proyectores</div>
        <input
          id="proyector"
          type="text"
          onChange={(e) => setProyector(e.target.value)}
          required
        />
        <div>Pantalla de proyector</div>
        <input
          id="pantallaProyector"
          type="text"
          onChange={(e) => setPantalla(e.target.value)}
          required
        />
        <div>Monitores disponibles</div>
        <input
          id="monitores"
          type="text"
          onChange={(e) => setMonitores(e.target.value)}
          required
        />
        <button>Enviar</button>
      </form>
      <div className="foto">
        <img src="/files/formulario.png" alt="formulario" />
      </div>
    </div>
  );
}

export default EspacioNuevo;
