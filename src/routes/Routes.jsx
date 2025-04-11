import React from "react";
import { Routes, Route } from "react-router-dom";
import Content from "../front-end/components/Content";
import Top_header from "../front-end/components/Top_Content";
import Footer from "../front-end/components/Footer";
import Login from "../front-end/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />{" "}
      {/* Route pour la page de connexion */}
      <Route
        path='/'
        element={
          <>
            <Top_header />
            <Content />
            <Footer />
          </>
        }
      />{" "}
      {/* Route pour la page principale */}
      <Route path='*' element={<div>404 Not Found</div>} />{" "}
      {/* Route pour les pages non trouvées */}
    </Routes>
  );
};

export default AppRoutes;
