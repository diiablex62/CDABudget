import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AccountIcon from "../icons/Account";
import ThemeIcon from "../icons/Theme";

const ModalSettings = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("Mon compte");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#007bff");
  const [selectedCircle, setSelectedCircle] = useState("color2");
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode") === "true";
    const savedColor = localStorage.getItem("selectedColor") || "#007bff";
    const savedCircle = localStorage.getItem("selectedCircle") || "color2";

    setIsDarkMode(
      document.body.classList.contains("dark-theme") || savedDarkMode
    );
    setSelectedColor(savedColor);
    setSelectedCircle(savedCircle);

    document.body.classList.toggle("dark-theme", savedDarkMode);
    document.documentElement.style.setProperty("--selected-color", savedColor);
  }, []);

  useEffect(() => {
    const syncDarkMode = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener("darkModeToggle", syncDarkMode);
    return () => {
      window.removeEventListener("darkModeToggle", syncDarkMode);
    };
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", newDarkMode);
    document.body.classList.toggle("dark-theme", newDarkMode);

    window.dispatchEvent(
      new CustomEvent("darkModeToggle", { detail: { isDarkMode: newDarkMode } })
    );
  };

  const handleColorSelect = (color, circle) => {
    setSelectedColor(color);
    setSelectedCircle(circle);
    localStorage.setItem("selectedColor", color);
    localStorage.setItem("selectedCircle", circle);
    document.documentElement.style.setProperty("--selected-color", color);
  };

  if (!isOpen) return null;

  return (
    <div className='modal-settings-overlay' onClick={onClose}>
      <div className='modal-settings' onClick={(e) => e.stopPropagation()}>
        <div className='modal-settings-sidebar'>
          <input
            type='text'
            placeholder={t("searchSettings")}
            className='sidebar-search'
          />
          <ul>
            {["Mon compte", "Apparences"].map((section) => (
              <li
                key={section}
                className={activeSection === section ? "active" : ""}
                onClick={() => setActiveSection(section)}>
                {section === "Mon compte" ? (
                  <AccountIcon className='sidebar-icon' />
                ) : (
                  <ThemeIcon className='sidebar-icon' />
                )}
                {t(section)}
              </li>
            ))}
          </ul>
        </div>
        <div className='modal-settings-content'>
          <div className='modal-settings-body'>
            {activeSection === "Mon compte" && (
              <>
                <h3>{t("connectionOptions")}</h3>
                <ul className='connection-options'>
                  {["Nom d'utilisateur", "E-Mail"].map((label) => (
                    <li key={label}>
                      <strong>{t(label)} :</strong> à récupérer
                      <button className='edit-btn'>{t("edit")}</button>
                    </li>
                  ))}
                </ul>
                <h3 className='section-spacing'>{t("security")}</h3>
                <ul className='security-options'>
                  {[
                    "Changer le mot de passe",
                    "Activer la double authentification",
                  ].map((option, index) => (
                    <li key={option}>
                      <strong>{t(option)}</strong>
                      <button className='edit-btn'>
                        {index === 0 ? t("edit") : t("activate")}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {activeSection === "Apparences" && (
              <>
                <h3>{t("darkMode")}</h3>
                <ul className='theme-options'>
                  <li>
                    <strong>
                      {isDarkMode ? t("disableDarkMode") : t("enableDarkMode")}{" "}
                      :
                    </strong>
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
                <h3 className='theme-title'>{t("theme")}</h3>
                <div className='theme-circles'>
                  {[
                    { color: "#6bd9a5", circle: "color1" },
                    { color: "#007bff", circle: "color2" },
                    { color: "#ff6b6b", circle: "color3" },
                  ].map(({ color, circle }) => (
                    <div
                      key={circle}
                      className={`circle ${circle} ${
                        selectedCircle === circle ? "selected" : ""
                      }`}
                      onClick={() => handleColorSelect(color, circle)}></div>
                  ))}
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
