import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

function LogOut() {
  const [, setAuth] = useContext(AuthContext);
  setAuth("");
  return (
    <>
      <Redirect to={"/"} />
    </>
  );
}
export default LogOut;
