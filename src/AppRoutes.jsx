import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { AppContext } from "./context/AppContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AppContext);

  console.log("AppRoutes: isLoggedIn =", isLoggedIn); // Log pour vérifier l'état

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          {isLoggedIn ? <Redirect to='/dashboard' /> : <LoginPage />}
        </Route>
        <Route path='/dashboard'>
          {isLoggedIn ? <Dashboard /> : <Redirect to='/login' />}
        </Route>
        <Redirect to='/login' />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
