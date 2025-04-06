import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  fr: {
    translation: {
      welcome: "Gestion de budget",
      login: "Se connecter",
      logout: "Se déconnecter",
      settings: "Paramètres",
      dark_mode: "Mode sombre",
      light_mode: "Mode clair",
      connectionOptions: "Options de connexion",
      security: "Sécurité",
      edit: "Modifier",
      activate: "Activer",
      searchSettings: "Rechercher un paramètre",
      theme: "Thème",
      disableDarkMode: "Désactiver le mode sombre",
      enableDarkMode: "Activer le mode sombre",
      language: "Français 🇫🇷",
    },
  },
  en: {
    translation: {
      welcome: "Budget Management",
      login: "Login",
      logout: "Logout",
      settings: "Settings",
      dark_mode: "Dark Mode",
      light_mode: "Light Mode",
      connectionOptions: "Connection Options",
      security: "Security",
      edit: "Edit",
      activate: "Activate",
      searchSettings: "Search a setting",
      theme: "Theme",
      disableDarkMode: "Disable Dark Mode",
      enableDarkMode: "Enable Dark Mode",
      language: "English 🇬🇧",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
