import React from "react";
import { useTranslation } from "react-i18next";

export default function Content() {
  const { t } = useTranslation();

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
      </main>
    </>
  );
}
