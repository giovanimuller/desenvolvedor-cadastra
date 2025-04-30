import React, { useState, useEffect } from 'react';
import './FilterButtons.scss';
import Filters from '../Filters/Filters';
import OrderBy from '../OrderBy/OrderBy';

interface FilterButtonsProps {
  onColorsChange?: (selectedColors: string[]) => void;
  onSizesChange?: (selectedSizes: string[]) => void;
  onPriceRangeChange?: (selectedRanges: string[]) => void;
  onOrderChange?: (value: string) => void;
  selectedColors?: string[];
  selectedSizes?: string[];
  selectedPriceRanges?: string[];
  sortOrder?: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  onColorsChange, 
  onSizesChange, 
  onPriceRangeChange,
  onOrderChange,
  selectedColors = [],
  selectedSizes = [],
  selectedPriceRanges = [],
  sortOrder = ''
}) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [currentColors, setCurrentColors] = useState<string[]>(selectedColors);
  const [currentSizes, setCurrentSizes] = useState<string[]>(selectedSizes);
  const [currentPriceRanges, setCurrentPriceRanges] = useState<string[]>(selectedPriceRanges);
  
  // Atualizar os estados internos quando as props mudarem
  useEffect(() => {
    setCurrentColors(selectedColors);
    setCurrentSizes(selectedSizes);
    setCurrentPriceRanges(selectedPriceRanges);
  }, [selectedColors, selectedSizes, selectedPriceRanges]);

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
  
  const handleColorsChange = (colors: string[]) => {
    setCurrentColors(colors);
  };
  
  const handleSizesChange = (sizes: string[]) => {
    setCurrentSizes(sizes);
  };
  
  const handlePriceRangeChange = (ranges: string[]) => {
    setCurrentPriceRanges(ranges);
  };
  
  const applyFilters = () => {
    if (onColorsChange) onColorsChange(currentColors);
    if (onSizesChange) onSizesChange(currentSizes);
    if (onPriceRangeChange) onPriceRangeChange(currentPriceRanges);
    closeFilterModal();
  };
  
  const clearFilters = () => {
    setCurrentColors([]);
    setCurrentSizes([]);
    setCurrentPriceRanges([]);
    
    if (onColorsChange) onColorsChange([]);
    if (onSizesChange) onSizesChange([]);
    if (onPriceRangeChange) onPriceRangeChange([]);
    closeFilterModal();
  };

  // Calcula quantos filtros estão aplicados no total
  const activeFiltersCount = currentColors.length + currentSizes.length + currentPriceRanges.length;
  
  return (
    <div className="filter-buttons">
      <button className={`filter-button ${activeFiltersCount > 0 ? 'has-filters' : ''}`} onClick={openFilterModal}>
        Filtrar
        {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount}</span>}
      </button>
      <button className={`filter-button ${sortOrder ? 'has-order' : ''}`} onClick={openOrderModal}>
        Ordenar
        {sortOrder && <span className="order-active">✓</span>}
      </button>

      {/* Filter Modal */}
      {filterModalOpen && (
        <>
          <button 
            type="button"
            className="modal-backdrop" 
            onClick={closeFilterModal}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                closeFilterModal();
              }
            }}
            aria-label="Fechar modal"
          ></button>
          <div className="filter-modal">
            <div className="modal-header">
              <div className="header-content">
                <h2>Filtros</h2>
                
              </div>
              <button className="close-button" onClick={closeFilterModal}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              <Filters
                onColorsChange={handleColorsChange}
                onSizesChange={handleSizesChange}
                onPriceRangeChange={handlePriceRangeChange}
                selectedColors={currentColors}
                selectedSizes={currentSizes}
                selectedPriceRanges={currentPriceRanges}
              />
            </div>
            <div className="modal-footer">
              <button className="apply-button" onClick={applyFilters}>
                Aplicar
              </button>
              <button className="clear-button" onClick={clearFilters}>
                Limpar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Order Modal */}
      {orderModalOpen && (
        <>
          <button 
            type="button"
            className="modal-backdrop" 
            onClick={closeOrderModal}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                closeOrderModal();
              }
            }}
            aria-label="Fechar modal"
          ></button>
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
