import React, { useState } from 'react';
import './FilterButtons.scss';
import Filters from '../Filters/Filters';
import OrderBy from '../OrderBy/OrderBy';

interface FilterButtonsProps {
  onColorsChange?: (selectedColors: string[]) => void;
  onSizesChange?: (selectedSizes: string[]) => void;
  onPriceRangeChange?: (selectedRanges: string[]) => void;
  onOrderChange?: (value: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  onColorsChange, 
  onSizesChange, 
  onPriceRangeChange,
  onOrderChange
}) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const openFilterModal = () => {
    setFilterModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
    document.body.style.overflow = '';
  };

  const openOrderModal = () => {
    setOrderModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="filter-buttons">
      <button className="filter-button" onClick={openFilterModal}>
        Filtrar
      </button>
      <button className="filter-button" onClick={openOrderModal}>
        Ordenar
      </button>

      {/* Filter Modal */}
      {filterModalOpen && (
        <>
          <div 
            className="modal-backdrop" 
            onClick={closeFilterModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                closeFilterModal();
              }
            }}
            aria-label="Fechar modal"
          ></div>
          <div className="filter-modal">
            <div className="modal-header">
              <h2>Filtros</h2>
              <button className="close-button" onClick={closeFilterModal}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              <Filters
                onColorsChange={onColorsChange}
                onSizesChange={onSizesChange}
                onPriceRangeChange={onPriceRangeChange}
              />
            </div>
            <div className="modal-footer">
              <button className="apply-button" onClick={closeFilterModal}>
                Aplicar Filtros
              </button>
            </div>
          </div>
        </>
      )}

      {/* Order Modal */}
      {orderModalOpen && (
        <>
          <div 
            className="modal-backdrop" 
            onClick={closeOrderModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                closeOrderModal();
              }
            }}
            aria-label="Fechar modal"
          ></div>
          <div className="order-modal">
            <div className="modal-header">
              <h2>Ordenar Por</h2>
              <button className="close-button" onClick={closeOrderModal}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              <OrderBy 
                isModal={true}
                onChange={(value) => {
                  if (onOrderChange) onOrderChange(value);
                  closeOrderModal();
                }} 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

};

export default FilterButtons;
