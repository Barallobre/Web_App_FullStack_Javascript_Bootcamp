import React from "react";
import "./Info.css";
function Info() {
  return (
    <>
      <section className="more-info">
        <div className="foto-lista">
          <img src="./files/items-main.png" alt="imagenes-coworking" />

          <div className="lista">
            <p>
              Cada espacio de coworking dispone del equipamiento que necesitas
              para trabajar en las condiciones más óptimas.
            </p>
            <p>
              Tenemos todos los materiales que necesitas para el desempeño de tu
              trabajo.
            </p>
            <ul style={{ marginBottom: "1rem" }}>
              <li>Sillas</li>
              <li>Mesas</li>
              <li>Proyector</li>
              <li>Pantallas de proyección</li>
              <li>Monitores</li>
              <li>...</li>
            </ul>
          </div>
        </div>
        <hr />
        <p style={{ textAlign: "center", marginTop: "4rem" }}>
          *Todos los espacios disponen de wifi a alta velocidad
        </p>
        <img
          style={{ width: "12rem" }}
          src="/files/WiFi_Logo.png"
          alt="wifi-logo"
        />
      </section>
    </>
  );
}

export default Info;
