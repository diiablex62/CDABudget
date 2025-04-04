import React, { useEffect, useState } from "react";
import AccountIcon from "../icons/Account";
import ProfileIcon from "../icons/Profile";
import ThemeIcon from "../icons/Theme";

const ModalSettings = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("Mon compte");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Appeler tous les hooks de manière inconditionnelle
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const darkModeEnabled = document.body.classList.contains("dark-theme");
    setIsDarkMode(darkModeEnabled);
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-theme");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal-settings-overlay' onClick={onClose}>
      <div className='modal-settings' onClick={(e) => e.stopPropagation()}>
        <div className='modal-settings-sidebar'>
          <input
            type='text'
            placeholder='Rechercher'
            className='sidebar-search'
          />
          <ul>
            <li
              className={activeSection === "Mon compte" ? "active" : ""}
              onClick={() => handleSectionClick("Mon compte")}>
              <AccountIcon className='sidebar-icon' />
              Mon compte
            </li>
            <li
              className={activeSection === "Apparences" ? "active" : ""}
              onClick={() => handleSectionClick("Apparences")}>
              <ThemeIcon className='sidebar-icon' />
              Apparences
            </li>
          </ul>
        </div>
        <div className='modal-settings-content'>
          <div className='modal-settings-header'>
            <h2>{activeSection}</h2>
            <button className='close-btn' onClick={onClose}>
              ✕
            </button>
          </div>
          <div className='modal-settings-body'>
            {activeSection === "Mon compte" && (
              <>
                <h3>Options de connexion</h3>
                <ul className='connection-options'>
                  <li>
                    <strong>Nom d'utilisateur :</strong> a recuper
                    <button className='edit-btn'>Modifier</button>
                  </li>
                  <li>
                    <strong>E-Mail :</strong> A recuper
                    <button className='edit-btn'>Modifier</button>
                  </li>
                </ul>
                <h3 className='section-spacing'>Sécurité</h3>
                <ul className='security-options'>
                  <li>
                    <strong>Changer le mot de passe</strong>
                    <button className='edit-btn'>Modifier</button>
                  </li>
                  <li>
                    <strong>Activer la double authentification</strong>
                    <button className='edit-btn'>Activer</button>
                  </li>
                </ul>
              </>
            )}
            {activeSection === "Apparences" && (
              <>
                <h3>Dark Mode</h3>
                <ul className='theme-options'>
                  <li>
                    <strong>Activer le dark mode :</strong>
                    <label className='switch'>
                      <input
                        type='checkbox'
                        checked={isDarkMode}
                        onChange={handleDarkModeToggle}
                      />
                      <span className='slider'></span>
                    </label>
                  </li>
                </ul>
                <h3 className='theme-title'>Thème</h3>
                <div className='theme-circles'>
                  <div className='circle color1'></div>
                  <div className='circle color2'></div>
                  <div className='circle color3'></div>
                  <div className='circle color4'></div>
                  <div className='circle color5'></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSettings;
