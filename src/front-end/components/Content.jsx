import React, { useState, useCallback, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Composant pour une ligne de revenu
const RevenueLine = memo(({ revenue, onUpdate, onDelete }) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (field, value) => {
      console.log(
        `Changement dans RevenueLine : field=${field}, value=${value}`
      ); // Log des changements
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

const saveFinanceData = async (data) => {
  console.log("Envoi des données au backend :", data); // Log des données envoyées
  try {
    const response = await fetch("http://localhost:3000/finance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Réponse brute du backend :", response); // Log de la réponse brute

    if (!response.ok) {
      const error = await response.json();
      console.error("Erreur reçue du backend :", error); // Log des erreurs reçues
      throw new Error(error.error || "Erreur lors de l'enregistrement.");
    }

    const result = await response.json();
    console.log("Donnée enregistrée avec succès :", result); // Log des données enregistrées
  } catch (err) {
    console.error("Erreur lors de l'enregistrement :", err.message); // Log des erreurs
  }
};

// Composant principal Content
export default function Content() {
  const { t } = useTranslation();

  // État pour l'année et le mois
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Les mois commencent à 0 en JS

  // Gestionnaires pour changer l'année et le mois
  const handleYearChange = (direction) => {
    setYear((prevYear) => prevYear + direction);
  };

  const handleMonthChange = (direction) => {
    setMonth((prevMonth) => {
      const newMonth = prevMonth + direction;
      if (newMonth < 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      } else if (newMonth > 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      }
      return newMonth;
    });
  };

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
    console.log(
      `Mise à jour du revenu : id=${id}, field=${field}, value=${value}`
    ); // Log des données mises à jour
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
    console.log(
      `Mise à jour de la dépense : category=${category}, id=${id}, field=${field}, value=${value}`
    ); // Log des données mises à jour
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

  const handleAddExpense = useCallback(
    (category) => {
      const newExpense = { id: Date.now(), name: "", past: 0, upcoming: 0 };
      console.log("Ajout d'une nouvelle dépense :", newExpense); // Log de la dépense ajoutée
      setExpenses((prevExpenses) => {
        const updatedExpenses = {
          ...prevExpenses,
          [category]: [...prevExpenses[category], newExpense],
        };
        saveFinanceData({
          userId: "64a7f2b8e4b0f5c3d2e1a123", // Remplacez par l'ID utilisateur réel
          type: "expense",
          category,
          name: newExpense.name,
          past: newExpense.past,
          upcoming: newExpense.upcoming,
          year,
          month,
        });
        return updatedExpenses;
      });
    },
    [year, month]
  );

  const handleAddRevenue = useCallback(() => {
    const newRevenue = { id: Date.now(), name: "", past: 0, upcoming: 0 };
    console.log("Ajout d'un nouveau revenu :", newRevenue); // Log du revenu ajouté
    setRevenues((prevRevenues) => {
      const updatedRevenues = [...prevRevenues, newRevenue];
      saveFinanceData({
        userId: "64a7f2b8e4b0f5c3d2e1a123", // Remplacez par l'ID utilisateur réel
        type: "revenue",
        category: "Revenus",
        name: newRevenue.name,
        past: newRevenue.past,
        upcoming: newRevenue.upcoming,
        year,
        month,
      });
      return updatedRevenues;
    });
  }, [year, month]);

  // Calculs mémorisés pour les totaux
  const calculateTotalByCategory = useCallback(
    (category, field) =>
      expenses[category]?.reduce((sum, item) => sum + Number(item[field]), 0) ||
      0,
    [expenses]
  );

  const totalExpenses = useMemo(
    () =>
      Object.keys(expenses).reduce(
        (sum, category) =>
          sum +
          expenses[category]?.reduce(
            (catSum, item) =>
              catSum + Number(item.past) + Number(item.upcoming),
            0
          ),
        0
      ),
    [expenses]
  );

  const totalRevenues = useMemo(
    () =>
      revenues.reduce(
        (sum, revenue) => sum + Number(revenue.past) + Number(revenue.upcoming),
        0
      ),
    [revenues]
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
