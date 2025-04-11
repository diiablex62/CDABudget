import { createContext } from "react";

export const AppContext = createContext();

// Retourne le mois et l'année actuels
export const getCurrentMonthAndYear = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // Les mois commencent à 0
  const year = now.getFullYear();
  if (process.env.NODE_ENV === "development") {
    console.log(`Mois actuel : ${month}, Année actuelle : ${year}`); // Log uniquement en développement
  }
  return { month, year };
};
