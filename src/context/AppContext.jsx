import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContextInstance";
export { AppContext };

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
      document.body.classList.remove("dark-theme");
    }
  }, []);

  // Effet pour mettre à jour le titre de la page en fonction de l'état de connexion
  useEffect(() => {
    document.title = isLoggedIn
      ? `Gestion de budget - ${username}`
      : "Gestion de budget";
  }, [isLoggedIn, username]);

  // Fonction pour gérer la connexion
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user?.username || "Utilisateur");
    setAuthType(user?.authType || "password");
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", user?.username || "Utilisateur");
    sessionStorage.setItem("authType", user?.authType || "password");
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("authType");
    document.body.classList.remove("dark-theme");
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn, // État de connexion
        username, // Nom d'utilisateur
        authType, // Type d'authentification
        handleLogin, // Fonction pour se connecter
        handleLogout, // Fonction pour se déconnecter
      }}>
      {children}
    </AppContext.Provider>
  );
};
