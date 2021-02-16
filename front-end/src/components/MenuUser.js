import React from "react";
import { Link } from "react-router-dom";
import ImagenUser from "./ImagenUser";
import NombreUser from "./NombreUser";
import ApellidosUser from "./ApellidosUser";
function Menu1({ id }) {
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
      <Link
        to="/LogOut"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <li>Cerrar sesión</li>
      </Link>
    </ul>
  );
}

export default Menu1;
