import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Google from "../icons/Google";
import Lock from "../icons/Lock";
import SettingsIcon from "../icons/Settings";
import LogoutIcon from "../icons/Logout";

export default function Header({ onLogout, isLoggedIn, username, authType }) {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const closeTimeoutRef = useRef(null);

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowAccountModal(true);
  };

  const handleMouseLeaveBubble = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowAccountModal(false);
    }, 1000);
  };

  const handleMouseLeaveModal = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowAccountModal(false);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='site-title'>Gestion de budget</div>
        {!isLoginPage && (
          <div className='login-container'>
            {isLoggedIn ? (
              <div
                className='account-container'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeaveBubble}>
                <div className='account-bubble'>
                  <span className='account-initial'>
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                {showAccountModal && (
                  <div
                    className='account-modal'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeaveModal}>
                    <div className='account-info'>
                      <strong>{username}</strong>
                      {authType === "google" && (
                        <Google className='auth-icon' />
                      )}
                      {authType === "password" && (
                        <Lock className='auth-icon' />
                      )}
                    </div>
                    <hr />
                    <div className='account-option'>
                      <SettingsIcon className='option-icon' />
                      <span>Mes paramètres</span>
                    </div>
                    <hr />
                    <div
                      className='account-option logout-option'
                      onClick={handleLogoutClick}>
                      <LogoutIcon className='option-icon' />
                      <span>Déconnexion</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate("/login")} className='login-btn'>
                Connexion
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
