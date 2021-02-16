import React, { useContext } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import MenuUser from "./MenuUser";
import MenuAdmin from "./MenuAdmin";
import { AuthContext } from "../components/providers/AuthProvider";
function MenuUsuario() {
  const [auth] = useContext(AuthContext);

  let decoded = jwtDecode(auth);
  const idLogeado = decoded.id;

  let administrador = decoded.admin;

  return (
    <>
      <div className="navbar">
        <div className="navbar-container container">
          <div className="name-logo">
            <Link to="/" className="navbar-logo">
              <img
                src="./files/logo.png"
                alt="logo"
                width="40px"
                height="30px"
              />
            </Link>
            <h1>Coworking-Browser</h1>
          </div>
        </div>
        <div className="menu-icon2">
          {administrador === 1 ? <MenuAdmin /> : <MenuUser id={idLogeado} />}
        </div>
      </div>
    </>
  );
}

export default MenuUsuario;
