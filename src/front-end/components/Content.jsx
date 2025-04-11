import React, { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import Category from "./Category"; // Mise à jour du chemin

// Composant pour une ligne de revenu
const RevenueLine = memo(({ revenue, onUpdate, onDelete }) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (field, value) => {
      onUpdate(revenue.id, field, value);
    },
    [revenue.id, onUpdate]
  );

  return (
    <div className='revenue-line'>
      <span className='drag-indicator'>⋮⋮</span>
      <input
        id='label-input'
        type='text'
        value={revenue.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder={t("label")}
      />
      <input
        id='past-input'
        type='number'
        value={revenue.past}
        onChange={(e) => handleChange("past", e.target.value)}
        placeholder={t("past")}
      />
      <input
        id='upcoming-input'
        type='number'
        value={revenue.upcoming}
        onChange={(e) => handleChange("upcoming", e.target.value)}
        placeholder={t("upcoming")}
      />
      <button className='table-delete-btn' onClick={() => onDelete(revenue.id)}>
        ✖
      </button>
    </div>
  );
});

// Composant pour une ligne de dépense
const ExpenseLine = memo(({ expense, category, onUpdate, onDelete }) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (field, value) => {
      onUpdate(category, expense.id, field, value);
    },
    [category, expense.id, onUpdate]
  );

  return (
    <div className='expense-line'>
      <span className='drag-indicator'>⋮⋮</span>
      <input
        id='label-input'
        type='text'
        value={expense.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder={t("label")}
      />
      <input
        id='past-input'
        type='number'
        value={expense.past}
        onChange={(e) => handleChange("past", e.target.value)}
        placeholder={t("past")}
      />
      <input
        id='upcoming-input'
        type='number'
        value={expense.upcoming}
        onChange={(e) => handleChange("upcoming", e.target.value)}
        placeholder={t("upcoming")}
      />
      <button
        className='table-delete-btn'
        onClick={() => onDelete(category, expense.id)}>
        ✖
      </button>
    </div>
  );
});

// Composant principal Content
export default function Content() {
  const { t } = useTranslation();

  // État initial
  const [revenues, setRevenues] = useState([
    { id: 1, name: t("salary"), past: 0, upcoming: 0 },
  ]);

  const [expenses, setExpenses] = useState({
    LOGEMENT: [{ id: 1, name: t("Loyer"), past: 0, upcoming: 0 }],
    "VIE QUOTIDIENNE": [{ id: 2, name: t("Courses"), past: 0, upcoming: 0 }],
    ABONNEMENTS: [{ id: 3, name: t("Netflix"), past: 0, upcoming: 0 }],
  });

  // Gestionnaires d'événements mémorisés
  const handleRevenueUpdate = useCallback((id, field, value) => {
    setRevenues((prevRevenues) =>
      prevRevenues.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }, []);

  const handleRevenueDelete = useCallback((id) => {
    setRevenues((prevRevenues) =>
      prevRevenues.filter((item) => item.id !== id)
    );
  }, []);

  const handleExpenseChange = useCallback((category, id, field, value) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: prevExpenses[category].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const handleExpenseDelete = useCallback((category, id) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: prevExpenses[category].filter((item) => item.id !== id),
    }));
  }, []);

  const handleAddExpense = useCallback((category) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: [
        ...prevExpenses[category],
        { id: Date.now(), name: "", past: 0, upcoming: 0 },
      ],
    }));
  }, []);

  const handleAddRevenue = useCallback(() => {
    setRevenues((prevRevenues) => [
      ...prevRevenues,
      { id: Date.now(), name: "", past: 0, upcoming: 0 },
    ]);
  }, []);

  // Calculs mémorisés pour les totaux
  const calculateTotalByCategory = useCallback(
    (category, field) =>
      expenses[category].reduce((sum, item) => sum + Number(item[field]), 0),
    [expenses]
  );

  const totalExpenses = Object.keys(expenses).reduce(
    (sum, category) =>
      sum +
      expenses[category].reduce(
        (catSum, item) => catSum + Number(item.past) + Number(item.upcoming),
        0
      ),
    0
  );

  const totalRevenues = revenues.reduce(
    (sum, revenue) => sum + Number(revenue.past) + Number(revenue.upcoming),
    0
  );

  return (
    <main>
      <div className='table-container'>
        <div className='revenues-container'>
          <h2>
            {t("revenues")} {totalRevenues > 0 ? `(${totalRevenues} €)` : ""}
          </h2>
          <div className='revenue-lines'>
            {/* Conserve l'espace visuel sans afficher le texte */}
            <div className='revenue-category-header'></div>
            <div className='revenue-header'>
              <label htmlFor='label-input'>{t("label")}</label>
              <label htmlFor='past-input'>{t("past")}</label>
              <label htmlFor='upcoming-input'>{t("upcoming")}</label>
              <span></span>
            </div>
            {revenues.map((revenue) => (
              <RevenueLine
                key={revenue.id}
                revenue={revenue}
                onUpdate={handleRevenueUpdate}
                onDelete={handleRevenueDelete}
              />
            ))}
          </div>
          <button className='add-revenue-btn' onClick={handleAddRevenue}>
            {t("Addrevenu")}
          </button>
        </div>

        <div className='expenses-container'>
          <h2>
            {t("expenses")} {totalExpenses > 0 ? `(${totalExpenses} €)` : ""}
          </h2>
          {Object.keys(expenses).map((category, index) => {
            const categoryTotal =
              calculateTotalByCategory(category, "past") +
              calculateTotalByCategory(category, "upcoming");

            return (
              <div key={category} className='expense-category'>
                <div className='expense-category-header'>
                  <h3>
                    {t(category)}
                    {categoryTotal > 0 ? ` (${categoryTotal} €)` : ""}
                  </h3>
                </div>
                <div className='expense-lines'>
                  {index === 0 && (
                    <div className='expense-header'>
                      <label htmlFor='label-input'>{t("label")}</label>
                      <label htmlFor='past-input'>{t("past")}</label>
                      <label htmlFor='upcoming-input'>{t("upcoming")}</label>
                      <span></span>
                    </div>
                  )}
                  {expenses[category].map((expense) => (
                    <ExpenseLine
                      key={expense.id}
                      expense={expense}
                      category={category}
                      onUpdate={handleExpenseChange}
                      onDelete={handleExpenseDelete}
                    />
                  ))}
                </div>
                <button
                  className='add-expense-btn'
                  onClick={() => handleAddExpense(category)}>
                  {t("Addexpense")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
