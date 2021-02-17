import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";
import { UserPasswordForm } from "./UserPasswordForm";
import { useHistory } from "react-router-dom";
export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errorMessage] = useState("");
  const [, setAuth] = useContext(AuthContext);
  const [registrado, setRegistrado] = useState(false);
  const [repetido, setRepetido] = useState(false);
  const history = useHistory();
  const register = async (e) => {
    e.preventDefault();
    if (password === repeatedPassword) {
      const res = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      const respuesta = await json;

      if (respuesta.registro === "éxito") {
        setRegistrado(true);
      }
      if (res.status !== 201) {
        setAuth("");
      }
      if (res.status === 500) {
        setRepetido(true);
      } else {
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    } else {
      swal("Las contraseñas no coinciden", "", "warning");
    }
  };

  return (
    <div className="formulario-ocultar">
      <h2 style={{ marginTop: "7rem", textAlign: "center" }}>Regístrate</h2>
      <UserPasswordForm
        onSubmit={register}
        email={email}
        setEmail={setEmail}
        password={password}
        repeatedPassword={repeatedPassword}
        setRepeatedPassword={setRepeatedPassword}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
      <div>
        {registrado ? (
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "3rem",
            }}
          >
            Te has registrado con éxito, ya puedes Iniciar sesión.
          </h3>
        ) : repetido ? (
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "3rem",
              color: "red",
            }}
          >
            Ese usuario ya existe, prueba con otro.
          </h3>
        ) : null}
      </div>
    </div>
  );
};
