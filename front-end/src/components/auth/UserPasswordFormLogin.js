import React from "react";
import "./UserPasswordForm.css";
export const UserPasswordFormLogin = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage = "",
}) => {
  return (
    <div className="formulario-registro-login">
      <img
        className="izquierda"
        src="/files/coworking1.jpg"
        alt="imagenCoworking1"
      />
      <form className="registro" onSubmit={onSubmit}>
        <InputElement
          id="email"
          value={email}
          setValue={setEmail}
          placeholder="email"
          type="email"
        ></InputElement>
        <InputElement
          id="pasword"
          value={password}
          setValue={setPassword}
          placeholder="contraseña"
          type="password"
        ></InputElement>
        <div> {errorMessage}</div>
        <button>Enviar</button>
      </form>
      <img
        className="derecha"
        src="/files/coworking2.jpg"
        alt="imagenCoworking1"
      />
    </div>
  );
};

const InputElement = ({ id, value, setValue, type, placeholder, children }) => {
  return (
    <div>
      <input
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
};
