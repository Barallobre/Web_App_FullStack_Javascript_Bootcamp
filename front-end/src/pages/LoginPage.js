import { LoginForm } from "../components/auth/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { Redirect } from "react-router-dom";

export const LoginPage = () => {
  const [auth] = useContext(AuthContext);
  if (auth !== "") return <Redirect to="/" />;
  return (
    <div>
      <LoginForm />
    </div>
  );
};
