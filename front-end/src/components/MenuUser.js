import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ImagenUser from "./ImagenUser";
import NombreUser from "./NombreUser";
import ApellidosUser from "./ApellidosUser";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
function Menu1({ id }) {
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();
  function cerrarSesion(e) {
    history.push("/");
    setAuth("");
  }

  return (
    <ul className="menu-user">
      <NombreUser id={id} />
      <ApellidosUser id={id} />
      <ImagenUser id={id} />

      <Link
        to="/reservas"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <li>Resevas</li>
      </Link>
      <Link
        to="/perfil"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <li>Perfil</li>
      </Link>

      <button className="boton-cierre" onClick={(e) => cerrarSesion(e)}>
        <li> Cerrar sesión </li>
      </button>
    </ul>
  );
}

export default Menu1;
