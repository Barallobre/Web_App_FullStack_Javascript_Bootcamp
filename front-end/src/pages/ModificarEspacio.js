import React, { useContext, useState, useEffect } from "react";
import "./EspacioNuevo.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";
import "./ModificarEspacio.css";

function ModificarEspacio({ match }) {
  const [auth] = useContext(AuthContext);

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
  const history = useHistory();
  const idEspacio = match.params.id;
  let IdEspacio = idEspacio.toString();

  useEffect(() => {
    infoEspacio();
    infoEquipamiento();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const infoEspacio = async () => {
    const res = await fetch(`http://localhost:8081/espacio/${IdEspacio}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await res.json();
    const respuesta = await json;

    setNombre(respuesta.Nombre);
    setLocalidad(respuesta.Localidad);
    setTipoEspacio(respuesta.idTipoEspacio);
    setPicture(respuesta.Foto);

    let fechaInicio1 = respuesta.FechaInicioDisponibilidad;
    let fechaInicio = fechaInicio1.split("T");
    setFechaInicioDisp(fechaInicio[0]);

    let fechaFin1 = respuesta.FechaFinDisponibilidad;
    let fechaFin = fechaFin1.split("T");
    setFechaFinDisp(fechaFin[0]);

    setCosteDia(respuesta.CosteDiario);
  };
  const infoEquipamiento = async () => {
    const res = await fetch(`http://localhost:8081/equipamiento/${IdEspacio}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await res.json();
    const respuesta = await json;

    setSillas(respuesta[0].Cantidad);
    setMesas(respuesta[1].Cantidad);
    setProyector(respuesta[2].Cantidad);
    setPantalla(respuesta[3].Cantidad);
    setMonitores(respuesta[4].Cantidad);
  };

  const update = async (e) => {
    e.preventDefault();
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

    await fetch(`http://localhost:8081/admin/${IdEspacio}/update`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    history.push("/");
  };

  const onFileChange = (event) => {
    const f = event.target.files[0];
    setPicture(f);
  };

  return (
    <div onSubmit={update} className="espacio-modificar">
      <form>
        <div>Nombre</div>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <div>Localización</div>
        <select onChange={(e) => setLocalidad(e.target.value)}>
          <option value=""></option>
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
          value={fechaInicioDisp}
          onChange={(e) => setFechaInicioDisp(e.target.value)}
        />
        <div>Fecha fin disponibilidad</div>
        <input
          id="fechaFinDisp"
          type="date"
          value={fechaFinDisp}
          onChange={(e) => setFechaFinDisp(e.target.value)}
        />
        <div>Coste diario</div>
        <input
          id="costeDia"
          type="text"
          value={costeDia}
          onChange={(e) => setCosteDia(e.target.value)}
        />
        <div>Imagen</div>
        <input id="picture" type="file" onChange={onFileChange} />
        <div>Sillas</div>
        <input
          id="sillas"
          type="text"
          value={Sillas}
          onChange={(e) => setSillas(e.target.value)}
        />
        <div>Mesas</div>
        <input
          id="mesas"
          type="text"
          value={Mesas}
          onChange={(e) => setMesas(e.target.value)}
        />
        <div>Proyectores</div>
        <input
          id="proyector"
          type="text"
          value={Proyector}
          onChange={(e) => setProyector(e.target.value)}
        />
        <div>Pantalla de proyector</div>
        <input
          id="pantallaProyector"
          type="text"
          value={Pantalla}
          onChange={(e) => setPantalla(e.target.value)}
        />
        <div>Monitores disponibles</div>
        <input
          id="monitores"
          type="text"
          value={Monitores}
          onChange={(e) => setMonitores(e.target.value)}
        />
        <button>Enviar</button>
      </form>
      <div className="foto">
        <img src="/files/formulario.png" alt="logo-formulario" />
      </div>
    </div>
  );
}
export default ModificarEspacio;
