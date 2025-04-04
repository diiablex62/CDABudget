import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import googleLogo from "../../assets/img/logo-google.svg"; // Import correct de l'image

export default function Header({ onLogout, isLoggedIn, username }) {
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
              {username.startsWith("google_") && (
                <img
                  src={googleLogo} 
                  alt='Google Icon'
                  className='google-icon'
                />
              )}
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
