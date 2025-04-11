import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from "./front-end/components/Content";
import Header from "./front-end/components/Header";
import Top_header from "./front-end/components/Top_Content";
import Footer from "./front-end/components/Footer";
import Login from "./front-end/Login";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <>
                <Top_header />
                <Content />
                <Footer />
              </>
            }
          />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
