import React, { useState, useEffect } from 'react';
import '../common/FilterStyles.scss';
import './Colors.scss';

interface ColorsFilterProps {
  onChange?: (selectedColors: string[]) => void;
  selectedColors?: string[];
}

const ColorsFilter: React.FC<ColorsFilterProps> = ({ onChange, selectedColors: initialSelectedColors = [] }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>(initialSelectedColors);
  
  // Atualizar o estado local quando as props mudarem
  useEffect(() => {
    setSelectedColors(initialSelectedColors);
  }, [initialSelectedColors]);
  const [showAllColors, setShowAllColors] = useState(false);
  
  const initialColors = [
    { id: 'amarelo', name: 'Amarelo' },
    { id: 'azul', name: 'Azul' },
    { id: 'branco', name: 'Branco' },
    { id: 'cinza', name: 'Cinza' },
    { id: 'laranja', name: 'Laranja' }
  ];
  
  const additionalColors = [
    { id: 'verde', name: 'Verde' },
    { id: 'vermelho', name: 'Vermelho' },
    { id: 'preto', name: 'Preto' },
    { id: 'rosa', name: 'Rosa' },
    { id: 'vinho', name: 'Vinho' }
  ];
  
  const displayColors = showAllColors ? [...initialColors, ...additionalColors] : initialColors;
  
  const handleColorChange = (colorId: string) => {
    let newSelectedColors: string[];
    
    if (selectedColors.includes(colorId)) {
      newSelectedColors = selectedColors.filter(id => id !== colorId);
    } else {
      newSelectedColors = [...selectedColors, colorId];
    }
    
    setSelectedColors(newSelectedColors);
    if (onChange) onChange(newSelectedColors);
  };
  
  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };
  
  return (
    <div className="colors-filter">
      <h3>CORES</h3>
      <div className="filter-options">
        {displayColors.map(color => (
          <div key={color.id} className="filter-option">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id={`color-${color.id}`}
                checked={selectedColors.includes(color.id)}
                onChange={() => handleColorChange(color.id)}
              />
              {color.name}
            </label>
          </div>
        ))}
      </div>
      <button className="show-more-btn" onClick={toggleShowAllColors}>
        {showAllColors ? 'Mostrar menos cores' : 'Ver todas as cores'}
      </button>
    </div>
  );
};

export default ColorsFilter;
