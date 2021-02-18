import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
function Menu2() {
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();
  function cerrarSesion(e) {
    history.push("/");
    setAuth("");
  }
  return (
    <ul>
      <div className="admin-navbar">Admin</div>
      <Link
        className="links-menu"
        to="/admin"
        style={{
          color: "inherit",
          textDecoration: "inherit",
          border: "1px solid black",
        }}
      >
        <li>Espacios</li>
      </Link>
      <Link
        className="links-menu"
        to="/admin/nuevo"
        style={{
          color: "inherit",
          textDecoration: "inherit",
          border: "1px solid black",
        }}
      >
        <li>Espacio nuevo</li>
      </Link>
      <button className="boton-cierre" onClick={(e) => cerrarSesion(e)}>
        <li>Cerrar sesión</li>
      </button>
    </ul>
  );
}

export default Menu2;
