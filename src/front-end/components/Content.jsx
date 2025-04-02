import React from "react";

export default function Content() {
  return (
    <>
      <main>
        <div className='table-container'>
          <table id='revenue-table'>
            <caption>Revenus</caption>
            <thead className='revenu-thread'>
              <tr>
                <th className='label-column'>Libellé</th>
                <th className='amount-column'>Perçu</th>
                <th className='amount-column'>A venir</th>
                <th className='suppr-column'></th>
              </tr>
            </thead>
            <tbody>
              {/* Les lignes de données pour les revenus à mettre à partir d'ici */}
            </tbody>
          </table>

          <table id='depense-table'>
            <caption>Dépenses</caption>
            <thead className='depense-thread'>
              <tr>
                <th className='label-column'>Libellé</th>
                <th className='amount-column'>Perçu</th>
                <th className='amount-column'>A venir</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Les lignes de données pour les dépenses à mettre à partir d'ici */}
            </tbody>
          </table>

          <table id='calcul-table'>
            <caption>Calculs</caption>
            <tbody>
              <tr className='revenue-section'>
                <td>Revenus actuels</td>
                <td id='revenue-current-value'></td>
              </tr>
              <tr className='revenue-section'>
                <td>Revenus prévisionnels</td>
                <td id='revenue-forecast-value'></td>
              </tr>
              <tr className='expenses-section'>
                <td>Dépenses actuelles</td>
                <td id='expenses-current-value'></td>
              </tr>
              <tr className='expenses-section'>
                <td>Dépenses prévisionnelles</td>
                <td id='expenses-forecast-value'></td>
              </tr>
              <tr>
                <td>Total actuel</td>
                <td id='total-current-value'></td>
              </tr>
              <tr>
                <td>Total prévisionnel</td>
                <td id='total-forecast-value'></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
