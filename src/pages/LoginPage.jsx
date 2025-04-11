import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LoginPage = () => {
  const { isLoggedIn } = useContext(AppContext);
  const history = useHistory();

  console.log("LoginPage: isLoggedIn =", isLoggedIn); // Log pour vérifier l'état

  useEffect(() => {
    if (isLoggedIn) {
      console.log("LoginPage: Redirection vers /dashboard"); // Log pour la redirection
      history.push("/dashboard");
    }
  }, [isLoggedIn, history]);

  return <div>Page de connexion</div>;
};

export default LoginPage;
