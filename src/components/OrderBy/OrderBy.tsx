import React, { useState } from 'react';
import './OrderBy.scss';

interface OrderByProps {
  onChange?: (value: string) => void;
}

const OrderBy: React.FC<OrderByProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'price_high', label: 'Maior preço' },
    { value: 'price_low', label: 'Menor preço' }
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedOption(label);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="order-by">
      <div className="dropdown">
        <button 
          className="dropdown-toggle" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || 'Ordenar Por:'}
          <span className="arrow"></span>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <div 
                key={option.value} 
                className="dropdown-item"
                onClick={() => handleSelect(option.value, option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBy;
