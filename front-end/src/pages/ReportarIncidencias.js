import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { useLocation, useHistory } from "react-router-dom";
import "./ReportarIncidencias.css";

function IncidenciasUser() {
  const [auth] = useContext(AuthContext);
  const [idEspacio, setIdEspacio] = useState("");
  const [idTipoIncidencia, setIdTipoIncidencia] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const token = auth;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setIdEspacio(location.state["id"]);
    return () => {
      setIdEspacio("");
    };
  }, [location.state]);

  const reportar = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8081/incidencias/${idEspacio}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        idTipoIncidencia,
        descripcion,
      }),
    });

    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  return (
    <>
      <section className="formulario-reporte">
        <div onSubmit={reportar}>
          <form>
            <select onChange={(e) => setIdTipoIncidencia(e.target.value)}>
              <option value="" style={{ fontSize: "10px" }}>
                Tipo de incidencia
              </option>
              <option value="1">Fallo eléctrico</option>
              <option value="2">Goteras</option>
              <option value="3">Equipo deteriorado</option>
              <option value="4">Suciedad</option>
              <option value="5">Otras quejas</option>
            </select>
            <textarea
              id="comentario"
              type="text"
              placeholder="comentario"
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <button>Enviar</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default IncidenciasUser;
