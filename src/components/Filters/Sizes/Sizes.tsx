import React, { useState, useEffect } from 'react';
import '../common/FilterStyles.scss';
import './Sizes.scss';

interface SizesFilterProps {
  onChange?: (selectedSizes: string[]) => void;
  selectedSizes?: string[];
}

const SizesFilter: React.FC<SizesFilterProps> = ({ onChange, selectedSizes: initialSelectedSizes = [] }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialSelectedSizes);
  
  // Atualizar o estado local quando as props mudarem
  useEffect(() => {
    setSelectedSizes(initialSelectedSizes);
  }, [initialSelectedSizes]);
  
  const sizes = [
    { id: 'p', label: 'P' },
    { id: 'm', label: 'M' },
    { id: 'g', label: 'G' },
    { id: 'gg', label: 'GG' },
    { id: 'u', label: 'U' },
    { id: '36', label: '36' },
    { id: '38', label: '38' },
    { id: '40', label: '40' },
  ];
  
  const handleSizeChange = (sizeId: string) => {
    let newSelectedSizes: string[];
    
    if (selectedSizes.includes(sizeId)) {
      newSelectedSizes = selectedSizes.filter(id => id !== sizeId);
    } else {
      newSelectedSizes = [...selectedSizes, sizeId];
    }
    
    setSelectedSizes(newSelectedSizes);
    if (onChange) onChange(newSelectedSizes);
  };
  
  return (
    <div className="sizes-filter">
      <h3>TAMANHOS</h3>
      <div className="size-grid">
        {sizes.map(size => (
          <button
            key={size.id}
            className={`size-button ${selectedSizes.includes(size.id) ? 'active' : ''}`}
            onClick={() => handleSizeChange(size.id)}
            type="button"
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizesFilter;
