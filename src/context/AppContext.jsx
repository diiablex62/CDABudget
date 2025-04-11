import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContextInstance";
export { AppContext };

// Fournit le contexte de l'application à ses enfants
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authType, setAuthType] = useState("");

  // Effet pour récupérer les données de session au chargement
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("isLoggedIn");
    const storedUsername = sessionStorage.getItem("username");
    const storedAuthType = sessionStorage.getItem("authType");

    if (storedLoginStatus === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setAuthType(storedAuthType || "password");
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setAuthType("");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        username,
        authType,
        handleLogin: (user) => {
          setIsLoggedIn(true);
          setUsername(user?.username || "Utilisateur");
          setAuthType(user?.authType || "password");
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("username", user?.username || "Utilisateur");
          sessionStorage.setItem("authType", user?.authType || "password");
        },
        handleLogout: () => {
          setIsLoggedIn(false);
          setUsername("");
          sessionStorage.clear();
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};
