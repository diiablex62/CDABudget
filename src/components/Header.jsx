import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { isLoggedIn, handleLogout, handleLogin } = useContext(AppContext);

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Déconnexion</button>
      ) : (
        <button onClick={() => handleLogin({ username: "Utilisateur" })}>
          Connexion
        </button>
      )}
    </div>
  );
};

export default Header;
