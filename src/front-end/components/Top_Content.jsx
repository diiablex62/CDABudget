import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Top_header({ isLoggedIn }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("past");
  const syncButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSyncClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const syncButton = syncButtonRef.current;
    if (syncButton) {
      syncButton.classList.add("syncing");

      setTimeout(() => {
        syncButton.classList.remove("syncing");
      }, 800);
    }
  };

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  return (
    <>
      <section className='en-tete'>
        <div id='year-selector'>
          <button id='prev-year' onClick={handleButtonClick}>
            {t("previous")}
          </button>
          <span id='year'>2025</span>
          <button id='next-year' onClick={handleButtonClick}>
            {t("next")}
          </button>
        </div>
        <div id='month-selector'>
          <button id='prev-month' onClick={handleButtonClick}>
            {t("previous")}
          </button>
          <span id='month'>{t("month")}</span>
          <button id='next-month' onClick={handleButtonClick}>
            {t("next")}
          </button>
        </div>

        <div className='boutons'>
          <button id='add-item-btn' onClick={handleButtonClick}>
            {t("addItem")}
          </button>
          <button id='paiement-xfois-btn' onClick={handleButtonClick}>
            {t("paymentXTimes")}
          </button>
          <button id='recurrent-item-btn' onClick={handleButtonClick}>
            {t("recurring")}
          </button>
          <button
            id='sync-btn'
            aria-label={t("update")}
            onClick={handleSyncClick}
            ref={syncButtonRef}>
            {t("update")}
            <svg
              id='sync-icon'
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              role='img'
              aria-label='Sync icon'>
              <path
                d='m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z'
                fillRule='nonzero'></path>
            </svg>
          </button>
        </div>

        <div id='form-container' style={{ display: "none" }}>
          <button id='close-modal-btn' onClick={handleButtonClick}>
            ✖
          </button>
          <h2 id='modal-title'>Titre de la modal</h2>

          <table className='modal-table'>
            <thead>
              <tr>
                <th className='category-color'>Catégorie</th>
                <th className='category-color'>Libellé</th>
                <th className='category-color'>Somme</th>
                <th className='category-color'>Pour quand ?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    id='category-select'
                    className='modal-select'
                    value={category}
                    onChange={handleCategoryChange}>
                    <option value='' disabled>
                      Choisir une catégorie
                    </option>
                    <option value='revenue'>Revenus</option>
                    <option value='expense'>Dépenses</option>
                  </select>
                </td>
                <td>
                  <input type='text' id='label-input' className='modal-input' />
                </td>
                <td>
                  <input
                    type='number'
                    id='amount-input'
                    className='modal-input'
                  />
                </td>
                <td>
                  <select
                    id='status-select'
                    className='modal-select'
                    value={status}
                    onChange={handleStatusChange}>
                    <option value='past'>C'est déjà passé</option>
                    <option value='future'>Ce n'est pas encore passé</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            id='submit-btn'
            className='category-color'
            onClick={handleButtonClick}>
            Ajouter
          </button>
        </div>
      </section>
    </>
  );
}
