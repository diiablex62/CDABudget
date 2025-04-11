import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { isLoggedIn, username } = useContext(AppContext);

  console.log("Dashboard: isLoggedIn =", isLoggedIn, "username =", username); // Log pour vérifier l'état

  return <div>Bienvenue, {username} !</div>;
};

export default Dashboard;
