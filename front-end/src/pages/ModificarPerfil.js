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
        <div>Foto</div>

        <input id="picture" type="file" onChange={onFileChange} />
        <div>Nombre</div>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>Apellidos</div>

        <input
          id="lastname"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div>Email</div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>Bio</div>
        <textarea
          id="bio"
          value={bio === "null" ? "" : bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div>Contraseña</div>

        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>Nueva contraseña</div>

        <input
          id="newpassword"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div>Repetir nueva contraseña</div>

        <input
          id="repeatnewpassword"
          type="password"
          onChange={(e) => setRepeatNewPassword(e.target.value)}
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
