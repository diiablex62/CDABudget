import React, { useEffect } from "react";

const ModalSettings = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); 
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className='modal-settings-overlay' onClick={onClose}>
      <div
        className='modal-settings'
        onClick={(e) => e.stopPropagation()} 
      >
        <div className='modal-settings-sidebar'>
          <input
            type='text'
            placeholder='Rechercher'
            className='sidebar-search'
          />
          <ul>
            <li className='active'>Mon compte</li>
            <li>Profils</li>
            <li>Contenu et social</li>
            <li>Données et confidentialité</li>
            <li>Appareils</li>
          </ul>
        </div>
        <div className='modal-settings-content'>
          <div className='modal-settings-header'>
            <h2>Mon compte</h2>
            <button className='close-btn' onClick={onClose}>
              ✕
            </button>
          </div>
          <div className='modal-settings-body'>
            <p>Contenu des paramètres ici...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSettings;
