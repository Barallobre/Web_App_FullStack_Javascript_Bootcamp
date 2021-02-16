import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <>
      <footer className="footer">
        {/* <div className="logo">
          <img src="/files/logo.png" alt="logo" width="100px" />
        </div> */}

        <p>Hecho con 🤍 por Cristian Barallobre Rúa | HACK A BOSS 2021</p>
        <div className="rrss">
          <a href="https://www.linkedin.com/in/cristianbarallobre/">
            <img src="/files/linkedin.svg" alt="facebook" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
