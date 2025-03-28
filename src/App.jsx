import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Content from "./Content";
import Header from "./Header";
import Top_header from "./Top_Content";
import Footer from "./Footer";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route
          path='/'
          element={
            <>
              <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
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
