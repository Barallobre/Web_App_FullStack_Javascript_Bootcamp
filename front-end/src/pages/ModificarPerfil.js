import React, { useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../components/providers/AuthProvider";
import "./ModificarPerfil.css";
import { useHistory } from "react-router-dom";
function ModificarPerfil() {
  const [auth] = useContext(AuthContext);

  const [picture, setPicture] = useState(" ");
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [newPassword, setNewPassword] = useState(" ");
  const [repeatNewPassword, setRepeatNewPassword] = useState(" ");
  const [lastName, setLastName] = useState(" ");

  const token = auth;
  let decoded = jwtDecode(token);

  const id = decoded.id;
  const history = useHistory();

  useEffect(() => {
    infoUsuario();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const infoUsuario = async () => {
    const res = await fetch(`http://localhost:8081/user/perfil/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await res.json();
    const respuesta = await json;

    setEmail(respuesta.Email);
    setLastName(respuesta.Apellidos);
    setBio(respuesta.Bio);
    setPicture(respuesta.Foto);
    setName(respuesta.Nombre);
  };

  const update = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("picture", picture);
    data.append("name", name);
    data.append("email", email);
    data.append("bio", bio);
    data.append("password", password);
    data.append("newPassword", newPassword);
    data.append("repeatNewPassword", repeatNewPassword);
    data.append("lastName", lastName);

    await fetch(`http://localhost:8081/user/perfil/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    history.push("/");
  };

  const onFileChange = (event) => {
    const f = event.target.files[0];
    setPicture(f);
  };

  return (
    <div onSubmit={update} className="formulario-modificar-perfil">
      <form autoComplete="off">
        <input
          id="picture"
          type="file"
          placeholder="Imagen"
          onChange={onFileChange}
        />
        <input
          id="name"
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          id="bio"
          placeholder="bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          id="newpassword"
          type="password"
          placeholder="contraseña nueva"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          id="repeatnewpassword"
          type="password"
          placeholder="repita la contraseña nueva"
          onChange={(e) => setRepeatNewPassword(e.target.value)}
        />
        <input
          id="lastname"
          type="text"
          placeholder="Apellidos"
          onChange={(e) => setLastName(e.target.value)}
        />
        <button>Enviar</button>
      </form>
      <div className="foto">
        <img src="/files/formulario.png" alt="formulario" />
      </div>
    </div>
  );
}
export default ModificarPerfil;
