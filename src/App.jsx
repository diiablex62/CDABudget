import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./front-end/components/Header";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes /> 
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
