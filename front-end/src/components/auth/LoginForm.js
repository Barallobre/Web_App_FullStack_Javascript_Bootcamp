import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserPasswordFormLogin } from "./UserPasswordFormLogin";

export const LoginForm = () => {
  const [, setAccessToken] = useLocalStorage("auth", "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setAuth] = useContext(AuthContext);
  const [existe, setExiste] = useState(true);
  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    const respuesta = await json;

    if (res.status === 500) {
      setExiste(false);
    }

    if (res.status !== 200) {
      setAuth("");
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(""), 2000);
    } else {
      setAccessToken(respuesta.token);
      setAuth(respuesta.token);
    }
  };
  return (
    <div>
      <h2 style={{ marginTop: "7rem", textAlign: "center" }}>Inicia sesión</h2>
      <UserPasswordFormLogin
        onSubmit={login}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
      <div>
        {!existe ? (
          <h3
            style={{
              marginTop: "3rem",
              textAlign: "center",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Usuario no registrado o contraseña incorrecta.
          </h3>
        ) : null}
      </div>
    </div>
  );
};
