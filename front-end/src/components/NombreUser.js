import React, { useContext, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";

function NombreUser({ id }) {
  const [auth] = useContext(AuthContext);

  const [nombreUser, setNombreUser] = useState("");
  const token = auth;

  async function NombreUser(id) {
    const res = await fetch(`http://localhost:8081/user/perfil/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const json = await res.json();
    const respuesta = await json;
    if (respuesta.Nombre !== null && respuesta.Nombre !== "null") {
      setNombreUser(respuesta.Nombre);
    } else {
      setNombreUser("");
    }
  }

  NombreUser(id);

  return (
    <>
      <h4 className="nombre-user">{nombreUser}</h4>
    </>
  );
}

export default NombreUser;
