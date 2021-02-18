import React, { useEffect, useState, useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";
import swal from "sweetalert";
import "./ConfirmacionReserva.css";
const Confirmar = () => {
  const [auth] = useContext(AuthContext);
  const location = useLocation();

  const [idEspacio, setIdEspacio] = useState("");
  const [nombreEspacio, setNombreEspacio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [costeDiario, setCosteDiario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const token = auth;

  const confirmar = async (e) => {
    e.preventDefault();
    if (token !== "") {
      await fetch(`http://localhost:8081/busqueda/${idEspacio}/reservar`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          fechaInicio,
          fechaFin,
        }),
      });
      setRedirect(true);
      swal("Reserva realizada con éxito", "", "success");
    } else {
      swal("Debe estar registrado para realizar una reserva", "", "warning");
      history.push("/");
    }
  };

  let fecha1 = new Date(fechaInicio);
  let fecha2 = new Date(fechaFin);

  let resta = fecha2.getTime() - fecha1.getTime();
  const dias = Math.round(resta / (1000 * 60 * 60 * 24)) + 1;

  useEffect(() => {
    setIdEspacio(location.state["id"]);
    setNombreEspacio(location.state["nombre"]);
    setLocalidad(location.state["localidad"]);
    setCosteDiario(location.state["coste"]);
    setFechaInicio(location.state["fecha1"]);
    setFechaFin(location.state["fecha2"]);
    return () => {
      setIdEspacio("");
      setNombreEspacio("");
      setLocalidad("");
      setCosteDiario("");
      setFechaInicio("");
      setFechaFin("");
    };
  }, [location.state]);

  if (!redirect) {
    return (
      <>
        <div className="datos-confirmacion">
          <ul className="confirmar">
            <li>{nombreEspacio}</li>
            <li>{localidad}</li>
            <li>Fecha inicio reserva:</li>
            <li>{fechaInicio}</li>
            <li>Fecha fin reserva:</li>
            <li>{fechaFin}</li>
            <li>Coste Total:</li>
            <li>{dias * costeDiario}€</li>
            <hr style={{ width: "50vw" }} />
            <li>Escoja la forma de pago</li>
            <div className="radioButtons">
              <input type="radio" name="pago" value="tarjeta" /> Tarjeta de
              crédigo
              <br />
              <input type="radio" name="pago" value="paypal" /> Paypal
              <br />
              <input type="radio" name="pago" value="presencial" /> Pago
              presencial
              <br />
            </div>
            <button onClick={(e) => confirmar(e)}>Confirmar</button>
          </ul>
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};
export default Confirmar;
