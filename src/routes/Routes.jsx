import React from "react";
import { Routes, Route } from "react-router-dom";
import Content from "../front-end/components/Content";
import Top_header from "../front-end/components/Top_Content";
import Footer from "../front-end/components/Footer";
import Login from "../front-end/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={
          <>
            <Top_header />{" "}
            {/* Assurez-vous que ce composant est rendu une seule fois */}
            <Content />
            <Footer />
          </>
        }
      />
      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
