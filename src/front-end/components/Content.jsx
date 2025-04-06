import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Content() {
  const { t, i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [saintOfTheDay, setSaintOfTheDay] = useState("");

  useEffect(() => {
    // Met à jour l'heure toutes les secondes
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSaintOfTheDay = async () => {
      try {
        const today = currentTime.toISOString().split("T")[0];
        const response = await fetch(
          `https://data.gouv.fr/api/1/datasets/les-saints-et-fetes-du-calendrier/resources/1ade6931-5792-4088-a9c1-9f2ba5f0bf68/?date=${today}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la fête du jour");
        }
        const data = await response.json();
        const saints = data?.saints?.join(", ") || t("reviewApi");
        setSaintOfTheDay(saints);
      } catch (error) {
        console.error(error);
        setSaintOfTheDay(t("reviewApi"));
      }
    };

    fetchSaintOfTheDay();
  }, [currentTime, t]);

  return (
    <>
      <main>
        <div className='table-container'>
          <table id='revenue-table'>
            <caption>{t("revenues")}</caption>
            <thead className='revenu-thread'>
              <tr>
                <th className='label-column'>{t("label")}</th>
                <th className='amount-column'>{t("received")}</th>
                <th className='amount-column'>{t("upcoming")}</th>
                <th className='suppr-column'></th>
              </tr>
            </thead>
            <tbody>
              {/* Les lignes de données pour les revenus à mettre à partir d'ici */}
            </tbody>
          </table>

          <table id='depense-table'>
            <caption>{t("expenses")}</caption>
            <thead className='depense-thread'>
              <tr>
                <th className='label-column'>{t("label")}</th>
                <th className='amount-column'>{t("received")}</th>
                <th className='amount-column'>{t("upcoming")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Les lignes de données pour les dépenses à mettre à partir d'ici */}
            </tbody>
          </table>

          <table id='calcul-table'>
            <caption>{t("calculations")}</caption>
            <tbody>
              <tr className='revenue-section'>
                <td>{t("currentRevenues")}</td>
                <td id='revenue-current-value'></td>
              </tr>
              <tr className='revenue-section'>
                <td>{t("forecastRevenues")}</td>
                <td id='revenue-forecast-value'></td>
              </tr>
              <tr className='expenses-section'>
                <td>{t("currentExpenses")}</td>
                <td id='expenses-current-value'></td>
              </tr>
              <tr className='expenses-section'>
                <td>{t("forecastExpenses")}</td>
                <td id='expenses-forecast-value'></td>
              </tr>
              <tr>
                <td>{t("currentTotal")}</td>
                <td id='total-current-value'></td>
              </tr>
              <tr>
                <td>{t("forecastTotal")}</td>
                <td id='total-forecast-value'></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='memo-container'>
          <p>
            <strong>{t("currentDate")}:</strong>{" "}
            {
              currentTime
                .toLocaleDateString(i18n.language, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .replace(/^\w/, (c) =>
                  c.toUpperCase()
                ) /* Met la première lettre en majuscule */
            }
          </p>
          <p>
            <strong>{t("currentTime")}:</strong>{" "}
            {currentTime.toLocaleTimeString(i18n.language)}
          </p>
          <p>
            <strong>{t("saintOfTheDay")}:</strong> {saintOfTheDay}
          </p>
        </div>
      </main>
    </>
  );
}
