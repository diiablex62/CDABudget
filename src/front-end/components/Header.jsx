import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ onLogout, isLoggedIn }) {
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
          Gestion de budget <span className='reduce'> by Alex</span>
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
