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
        <input
          id="nombre"
          type="text"
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <select onChange={(e) => setLocalidad(e.target.value)}>
          <option value="0"></option>
          <option value="A Coruña">A Coruña</option>
          <option value="Lugo">Lugo</option>
          <option value="Ourense">Ourense</option>
          <option value="Pontevedra">Pontevedra</option>
        </select>
        <select onChange={(e) => setTipoEspacio(e.target.value)}>
          <option value="0"></option>
          <option value="1">Diáfano</option>
          <option value="2">Pet-friendly</option>
          <option value="3">Sala de juntas</option>
          <option value="4">Eco-friendly</option>
        </select>
        <input
          id="fechaInicioDisp"
          type="date"
          placeholder="Fecha de inicio de disponibilidad"
          onChange={(e) => setFechaInicioDisp(e.target.value)}
          required
        />
        <input
          id="fechaFinDisp"
          type="date"
          placeholder="Fecha de fin de disponibilidad"
          onChange={(e) => setFechaFinDisp(e.target.value)}
          required
        />
        <input
          id="costeDia"
          type="text"
          placeholder="Coste Diario"
          onChange={(e) => setCosteDia(e.target.value)}
          required
        />
        <input
          id="picture"
          type="file"
          placeholder="Imagen"
          onChange={onFileChange}
          required
        />
        <input
          id="sillas"
          type="text"
          placeholder="Sillas"
          onChange={(e) => setSillas(e.target.value)}
          required
        />
        <input
          id="mesas"
          type="text"
          placeholder="Mesas"
          onChange={(e) => setMesas(e.target.value)}
          required
        />
        <input
          id="proyector"
          type="text"
          placeholder="Proyectores"
          onChange={(e) => setProyector(e.target.value)}
          required
        />
        <input
          id="pantallaProyector"
          type="text"
          placeholder="Pantallas para proyector"
          onChange={(e) => setPantalla(e.target.value)}
          required
        />
        <input
          id="monitores"
          type="text"
          placeholder="Monitores"
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
