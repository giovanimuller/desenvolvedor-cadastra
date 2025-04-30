import React, { useState } from 'react';
import '../common/FilterStyles.scss';
import './PriceRange.scss';

interface PriceRangeFilterProps {
  onChange?: (selectedRanges: string[]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ onChange }) => {
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  
  const priceRanges = [
    { id: 'range_0_50', label: 'de R$0 até R$50' },
    { id: 'range_51_150', label: 'de R$51 até R$150' },
    { id: 'range_151_300', label: 'de R$151 até R$300' },
    { id: 'range_301_500', label: 'de R$301 até R$500' },
    { id: 'range_500_plus', label: 'a partir de R$ 500' },
  ];
  
  const handleRangeChange = (rangeId: string) => {
    let newSelectedRanges: string[];
    
    if (selectedRanges.includes(rangeId)) {
      newSelectedRanges = selectedRanges.filter(id => id !== rangeId);
    } else {
      newSelectedRanges = [...selectedRanges, rangeId];
    }
    
    setSelectedRanges(newSelectedRanges);
    if (onChange) onChange(newSelectedRanges);
  };
  
  return (
    <div className="price-range-filter">
      <h3>FAIXA DE PREÇO</h3>
      <div className="filter-options">
        {priceRanges.map(range => (
          <div key={range.id} className="filter-option">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id={`price-${range.id}`}
                checked={selectedRanges.includes(range.id)}
                onChange={() => handleRangeChange(range.id)}
              />
              {range.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
