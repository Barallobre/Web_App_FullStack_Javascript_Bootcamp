import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";

import "./Navbar.css";
import MenuUsuario from "./MenuUsuario";
function Navbar() {
  const [auth] = useContext(AuthContext);

  if (auth === "") {
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
          <div>
            <ul className="menu-icon">
              <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li>Registro</li>
              </Link>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li>Inicio sesión</li>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  } else if (auth !== "") {
    return <MenuUsuario />;
  }
}

export default Navbar;
