import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Google from "../icons/Google"; // Import du composant Google
import Lock from "../icons/Lock"; // Import du composant Lock

export default function Header({ onLogout, isLoggedIn, username, authType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className='navbar'>
        <div className='site-title'>
          Gestion de budget{" "}
          {isLoggedIn && username && (
            <span className='reduce'>
              {username}
              <span className='auth-logo'>
                {authType === "google" && (
                  <div title='Connecté avec Google'>
                    <Google className='auth-icon' />
                  </div>
                )}
                {authType === "password" && (
                  <div title='Connecté avec un mot de passe'>
                    <Lock className='auth-icon' />
                  </div>
                )}
              </span>
            </span>
          )}
        </div>
        {!isLoginPage && (
          <div className='login-container'>
            {isLoggedIn ? (
              <button onClick={handleLogoutClick} className='login-btn'>
                Déconnexion
              </button>
            ) : (
              <button onClick={handleLoginClick} className='login-btn'>
                Connexion
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
