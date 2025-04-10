import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Content from "./front-end/components/Content";
import Header from "./front-end/components/Header";
import Top_header from "./front-end/components/Top_Content";
import Footer from "./front-end/components/Footer";
import Login from "./front-end/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authType, setAuthType] = useState("");
  const { i18n } = useTranslation();

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

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (!savedLanguage) {
      i18n.changeLanguage("fr"); 
      localStorage.setItem("language", "fr");
    } else {
      i18n.changeLanguage(savedLanguage); 
    }
  }, [i18n]);

  const handleLogin = (user) => {
    console.log("Utilisateur connecté :", user);
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
    i18n.changeLanguage("fr");
    localStorage.setItem("language", "fr"); 
  };

  return (
    <BrowserRouter>
      <Header
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        username={username}
        authType={authType}
      />
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route
          path='/'
          element={
            <>
              <Top_header isLoggedIn={isLoggedIn} />
              <Content />
              <Footer />
            </>
          }
        />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
