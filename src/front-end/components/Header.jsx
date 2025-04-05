import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Google from "../icons/Google";
import Lock from "../icons/Lock";
import SettingsIcon from "../icons/Settings";
import LogoutIcon from "../icons/Logout";
import ModalSettings from "./ModalSettings";

export default function Header({ onLogout, isLoggedIn, username, authType }) {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifie si le mode sombre est activé dans le localStorage ou sur le body
    return (
      localStorage.getItem("isDarkMode") === "true" ||
      document.body.classList.contains("dark-theme")
    );
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    // Synchronise l'état initial avec le mode sombre actuel
    const savedDarkMode = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-theme", savedDarkMode);

    const syncDarkMode = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener("darkModeToggle", syncDarkMode);
    return () => {
      window.removeEventListener("darkModeToggle", syncDarkMode);
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

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

  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle("dark-theme", newDarkMode);
    localStorage.setItem("isDarkMode", newDarkMode);

    // Émet un événement global pour synchroniser les boutons
    window.dispatchEvent(
      new CustomEvent("darkModeToggle", { detail: { isDarkMode: newDarkMode } })
    );
  };

  return (
    <>
      <nav className='navbar'>
        <div className='site-title'>Gestion de budget</div>
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
                    {authType === "google" && <Google className='auth-icon' />}
                    {authType === "password" && <Lock className='auth-icon' />}
                  </div>
                  <hr />
                  <div className='account-option' onClick={openSettingsModal}>
                    <SettingsIcon className='option-icon' />
                    <span>Mes paramètres</span>
                  </div>
                  <hr />
                  <div
                    className='account-option'
                    onClick={handleDarkModeToggle}>
                    <span className='option-icon'>🌓</span>
                    <span>
                      {!isDarkMode ? "Mode sombre" : "Mode clair"}
                    </span>{" "}
                    {/* Texte dynamique */}
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
            !isLoginPage && (
              <button className='login-btn' onClick={handleLoginClick}>
                Se connecter
              </button>
            )
          )}
        </div>
      </nav>
      <ModalSettings isOpen={showSettingsModal} onClose={closeSettingsModal} />
    </>
  );
}
