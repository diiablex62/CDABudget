import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user.username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route
          path='/'
          element={
            <>
              <Header
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
                username={username}
              />
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
