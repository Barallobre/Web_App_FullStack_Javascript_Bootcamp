import React from "react";
import { Link } from "react-router-dom";
function Menu2() {
  return (
    <ul>
      <Link to="/admin" style={{ color: "inherit", textDecoration: "inherit" }}>
        <li>Espacios</li>
      </Link>
      <Link
        to="/admin/nuevo"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <li>Espacio nuevo</li>
      </Link>
      <Link
        to="/LogOut"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <li>Cerrar sesión</li>
      </Link>
    </ul>
  );
}

export default Menu2;
