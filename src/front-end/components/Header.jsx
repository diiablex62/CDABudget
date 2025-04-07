import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Google from "../icons/Google";
import Lock from "../icons/Lock";
import SettingsIcon from "../icons/Settings";
import LogoutIcon from "../icons/Logout";
import ModalSettings from "./ModalSettings";
import FranceFlag from "../../assets/img/france.png";
import UKFlag from "../../assets/img/royaume-uni.png";
import SpainFlag from "../../assets/img/espagne.png";

export default function Header({ onLogout, isLoggedIn, username, authType }) {
  const { t, i18n } = useTranslation();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
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

    window.dispatchEvent(
      new CustomEvent("darkModeToggle", { detail: { isDarkMode: newDarkMode } })
    );
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const getFlag = () => {
    switch (i18n.language) {
      case "fr":
        return <img src={FranceFlag} alt='Français' width='24' height='24' />;
      case "en":
        return <img src={UKFlag} alt='English' width='24' height='24' />;
      case "es":
        return <img src={SpainFlag} alt='Español' width='24' height='24' />;
      default:
        return <img src={FranceFlag} alt='Français' width='24' height='24' />;
    }
  };

  const getNextLanguage = () => {
    switch (i18n.language) {
      case "fr":
        return { lang: "en", label: "English", flag: UKFlag };
      case "en":
        return { lang: "es", label: "Español", flag: SpainFlag };
      case "es":
        return { lang: "fr", label: "Français", flag: FranceFlag };
      default:
        return { lang: "fr", label: "Français", flag: FranceFlag };
    }
  };

  const nextLanguage = getNextLanguage();

  return (
    <>
      <nav className='navbar'>
        <div className='site-title'>{t("welcome")}</div>
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
                    <span>{t("settings")}</span>
                  </div>
                  <hr />
                  <div
                    className='account-option'
                    onClick={() => changeLanguage(nextLanguage.lang)}>
                    <span className='option-icon'>
                      <img
                        src={nextLanguage.flag}
                        alt={nextLanguage.label}
                        width='24'
                        height='24'
                      />
                    </span>
                    <span>{nextLanguage.label}</span>
                  </div>
                  <hr />
                  <div
                    className='account-option'
                    onClick={handleDarkModeToggle}>
                    <span className='option-icon'>🌓</span>
                    <span>
                      {isDarkMode ? t("light_mode") : t("darkMode")}{" "}
                      {/* Affiche le texte approprié */}
                    </span>
                  </div>
                  <hr />
                  <div
                    className='account-option logout-option'
                    onClick={handleLogoutClick}>
                    <LogoutIcon className='option-icon' />
                    <span>{t("logout")}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            !isLoginPage && (
              <button className='login-btn' onClick={handleLoginClick}>
                {t("login")}
              </button>
            )
          )}
        </div>
      </nav>
      <ModalSettings isOpen={showSettingsModal} onClose={closeSettingsModal} />
    </>
  );
}
