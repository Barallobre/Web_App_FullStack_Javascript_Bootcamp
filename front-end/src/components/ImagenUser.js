import React, { useContext, useState } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
function ImagenUser({ id }) {
  const [auth] = useContext(AuthContext);
  const [rutaImagen, setRutaImagen] = useState("");
  const token = auth;

  async function infoUser(id) {
    const res = await fetch(`http://localhost:8081/user/perfil/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const json = await res.json();
    const respuesta = await json;
    if (respuesta.Foto === null || respuesta.Foto === "null") {
      setRutaImagen(`http://localhost:8081/files/users/fotoPerfilIdUser.png`);
    } else {
      setRutaImagen(
        `http://localhost:8081/files/users/fotoPerfilIdUser${id}.png`
      );
    }
  }

  infoUser(id);

  return (
    <>
      <img src={rutaImagen} alt="imagen-user" />
    </>
  );
}

export default ImagenUser;
