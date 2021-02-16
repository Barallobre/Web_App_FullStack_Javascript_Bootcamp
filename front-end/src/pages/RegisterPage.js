import { useContext } from "react";
import { RegisterForm } from "../components/auth/RegisterForm";

import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";

export const RegisterPage = () => {
  const [auth] = useContext(AuthContext);
  if (auth !== "") return <Redirect to="/" />;
  return (
    <div>
      <RegisterForm />
    </div>
  );
};
