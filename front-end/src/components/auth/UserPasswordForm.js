import React from "react";
import "./UserPasswordForm.css";
export const UserPasswordForm = ({
  onSubmit,
  email,
  setEmail,
  password,
  repeatedPassword,
  setRepeatedPassword,
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
          type="email"
        ></InputElement>
        <InputElement
          id="pasword"
          value={password}
          setValue={setPassword}
          type="password"
        ></InputElement>
        <InputElement
          id="repeatedPasword"
          value={repeatedPassword}
          setValue={setRepeatedPassword}
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

const InputElement = ({ id, value, setValue, type, children }) => {
  return (
    <div>
      <input
        value={value}
        id={id}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
};
