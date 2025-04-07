import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Content() {
  const { t } = useTranslation();
  const [revenues, setRevenues] = useState([
    { id: 1, name: t("salary"), past: 1000, upcoming: 500 },
  ]);

  const handleRevenueChange = (id, field, value) => {
    setRevenues((prevRevenues) =>
      prevRevenues.map((revenue) =>
        revenue.id === id ? { ...revenue, [field]: value } : revenue
      )
    );
  };

  const handleRevenueDelete = (id) => {
    setRevenues((prevRevenues) =>
      prevRevenues.filter((revenue) => revenue.id !== id)
    );
  };

  const handleAddRevenue = () => {
    setRevenues((prevRevenues) => [
      ...prevRevenues,
      { id: Date.now(), name: "", past: 0, upcoming: 0 },
    ]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);
    if (draggedIndex === index) return;

    setRevenues((prevRevenues) => {
      const updatedRevenues = [...prevRevenues];
      const [draggedItem] = updatedRevenues.splice(draggedIndex, 1);
      updatedRevenues.splice(index, 0, draggedItem);
      return updatedRevenues;
    });
  };

  const totalPast = revenues.reduce(
    (sum, revenue) => sum + Number(revenue.past),
    0
  );
  const totalUpcoming = revenues.reduce(
    (sum, revenue) => sum + Number(revenue.upcoming),
    0
  );

  return (
    <main>
      <div className='revenues-container'>
        <h2>{t("revenues")}</h2>
        <div className='revenue-lines'>
          <div className='revenue-header'>
            <label htmlFor='label-input'>{t("label")}</label>
            <label htmlFor='past-input'>
              {t("past")} ({totalPast})
            </label>
            <label htmlFor='upcoming-input'>
              {t("upcoming")} ({totalUpcoming})
            </label>
            <span></span>
          </div>
          {revenues.map((revenue, index) => (
            <div
              key={revenue.id}
              className='revenue-line'
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}>
              <span className='drag-indicator'>⋮⋮</span>
              <input
                id='label-input'
                type='text'
                value={revenue.name}
                onChange={(e) =>
                  handleRevenueChange(revenue.id, "name", e.target.value)
                }
                placeholder={t("label")}
              />
              <input
                id='past-input'
                type='number'
                value={revenue.past}
                onChange={(e) =>
                  handleRevenueChange(revenue.id, "past", e.target.value)
                }
                placeholder={t("past")}
              />
              <input
                id='upcoming-input'
                type='number'
                value={revenue.upcoming}
                onChange={(e) =>
                  handleRevenueChange(revenue.id, "upcoming", e.target.value)
                }
                placeholder={t("upcoming")}
              />
              <button
                className='delete-btn'
                onClick={() => handleRevenueDelete(revenue.id)}>
                ✖
              </button>
            </div>
          ))}
        </div>
        <button className='add-revenue-btn' onClick={handleAddRevenue}>
          {t("Addrevenu")}
        </button>
      </div>
    </main>
  );
}
