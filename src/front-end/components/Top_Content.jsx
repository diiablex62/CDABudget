import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";

export default function Top_header() {
  const { isLoggedIn } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [_CATEGORY] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const syncButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDate(new Date());
  }, [isLoggedIn]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Mois actuel : ${
          currentDate.getMonth() + 1
        }, Année actuelle : ${currentDate.getFullYear()}`
      );
    }
  }, [currentDate]);

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

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(prevDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(prevDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  const handleNextYear = () => {
    setCurrentDate((prevDate) => {
      const nextYear = new Date(prevDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      console.log(`Année actuelle : ${nextYear.getFullYear()}`); // Log après mise à jour
      return nextYear;
    });
  };

  const handlePreviousYear = () => {
    setCurrentDate((prevDate) => {
      const prevYear = new Date(prevDate);
      prevYear.setFullYear(prevYear.getFullYear() - 1);
      console.log(`Année actuelle : ${prevYear.getFullYear()}`); // Log après mise à jour
      return prevYear;
    });
  };

  return (
    <>
      <section className='en-tete'>
        <div id='year-selector'>
          <button id='prev-year' onClick={handlePreviousYear}>
            {t("previous")}
          </button>
          <span id='year'>{currentDate.getFullYear()}</span>
          <button id='next-year' onClick={handleNextYear}>
            {t("next")}
          </button>
        </div>
        <div id='month-selector'>
          <button id='prev-month' onClick={handlePreviousMonth}>
            {t("previous")}
          </button>
          <span id='month'>
            {currentDate.toLocaleString(i18n.language, { month: "long" })}
          </span>
          <button id='next-month' onClick={handleNextMonth}>
            {t("next")}
          </button>
        </div>

        <div className='boutons'>
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
      </section>
    </>
  );
}
