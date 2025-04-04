import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from "./front-end/components/Content";
import Header from "./front-end/components/Header";
import Top_header from "./front-end/components/Top_Content";
import Footer from "./front-end/components/Footer";
import Login from "./front-end/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (storedLoginStatus === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    document.title = isLoggedIn
      ? `Gestion de budget - ${username}`
      : "Gestion de budget";
  }, [isLoggedIn, username]);

  const handleLogin = (user) => {
    console.log("Utilisateur connecté :", user);
    setIsLoggedIn(true);
    setUsername(user?.username || "Utilisateur");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user?.username || "Utilisateur");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return (
    <BrowserRouter>
      <Header
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        username={username}
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
