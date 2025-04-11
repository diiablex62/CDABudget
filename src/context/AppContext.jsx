import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authType, setAuthType] = useState("");

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

  useEffect(() => {
    document.title = isLoggedIn
      ? `Gestion de budget - ${username}`
      : "Gestion de budget";
  }, [isLoggedIn, username]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user?.username || "Utilisateur");
    setAuthType(user?.authType || "password");
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", user?.username || "Utilisateur");
    sessionStorage.setItem("authType", user?.authType || "password");
  };

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
        isLoggedIn,
        username,
        authType,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AppContext.Provider>
  );
};
