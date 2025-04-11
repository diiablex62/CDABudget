import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { isLoggedIn, username } = useContext(AppContext);

  return <div>Bienvenue, {isLoggedIn ? username : "visiteur"} !</div>;
};

export default Dashboard;
