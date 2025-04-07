import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AccountIcon from "../icons/Account";
import ThemeIcon from "../icons/Theme";
import FranceFlag from "../../assets/img/france.png";
import UKFlag from "../../assets/img/royaume-uni.png";
import SpainFlag from "../../assets/img/espagne.png";

const ModalSettings = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("myAccount"); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#007bff");
  const [selectedCircle, setSelectedCircle] = useState("color2");

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

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); 
    localStorage.setItem("language", lang);
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
            {["myAccount", "appearances"].map((section, index) => (
              <li
                key={section}
                className={activeSection === section ? "active" : ""}
                onClick={() => setActiveSection(section)}>
                {index === 0 ? (
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
          <div className='modal-settings-header'>
            <h2>{t("settingsTitle")}</h2>
            <button className='close-btn' onClick={onClose}>
              ✖
            </button>
          </div>
          <div className='modal-settings-body'>
            {activeSection === "myAccount" && (
              <>
                <h3>{t("connectionOptions")}</h3>
                <ul className='connection-options'>
                  {[t("username"), t("email")].map((label) => (
                    <li key={label}>
                      <strong>{label} :</strong>
                      <button className='edit-btn'>{t("edit")}</button>
                    </li>
                  ))}
                </ul>
                <h3 className='section-spacing'>{t("security")}</h3>
                <ul className='security-options'>
                  {[t("changePassword"), t("enable2FA")].map(
                    (option, index) => (
                      <li key={option}>
                        <strong>{option}</strong> 
                        <button className='edit-btn'>
                          {index === 0 ? t("edit") : t("activate")}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
            {activeSection === "appearances" && (
              <>
                <h3>{t("darkMode")}</h3>{" "}
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
                    {
                      color: "#6bd9a5",
                      circle: "color1",
                      label: t("colorGreen"),
                    },
                    {
                      color: "#007bff",
                      circle: "color2",
                      label: t("colorBlue"),
                    },
                    {
                      color: "#ff6b6b",
                      circle: "color3",
                      label: t("colorRed"),
                    },
                  ].map(({ color, circle, label }) => (
                    <div key={circle} className='theme-circle-container'>
                      <div
                        className={`circle ${circle} ${
                          selectedCircle === circle ? "selected" : ""
                        }`}
                        onClick={() => handleColorSelect(color, circle)}></div>
                      <span className='circle-label'>{label}</span>
                    </div>
                  ))}
                </div>
                <h3 className='language-title'>{t("languageTitle")}</h3>
                <div className='language-circles'>
                  {[
                    { lang: "fr", flag: FranceFlag, label: "Français" },
                    { lang: "en", flag: UKFlag, label: "English" },
                    { lang: "es", flag: SpainFlag, label: "Español" },
                  ].map(({ lang, flag, label }) => (
                    <div key={lang} className='language-circle-container'>
                      <div
                        className={`circle ${
                          i18n.language === lang ? "selected" : ""
                        }`}
                        onClick={() => handleLanguageChange(lang)}>
                        <img src={flag} alt={label} />
                      </div>
                      <span className='circle-label'>{label}</span>
                    </div>
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
