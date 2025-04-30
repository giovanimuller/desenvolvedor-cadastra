import React, { useState, useEffect } from 'react';
import './OrderBy.scss';

interface OrderByProps {
  onChange?: (value: string) => void;
  isModal?: boolean;
}

const OrderBy: React.FC<OrderByProps> = ({ onChange, isModal }) => {
  const [isOpen, setIsOpen] = useState(isModal || false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (isModal) {
      setIsOpen(true);
    }
  }, [isModal]);

  const options = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'price_high', label: 'Maior preço' },
    { value: 'price_low', label: 'Menor preço' }
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedOption(label);
    setIsOpen(!isModal);
    if (onChange) onChange(value);
  };

  return (
    <div className="order-by">
      <div className="dropdown">
        {!isModal && (
          <button 
            className="dropdown-toggle" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption || 'Ordenar Por:'}
            <span className="arrow"></span>
          </button>
        )}
        {isOpen && (
          <div className={`dropdown-menu ${isModal ? 'modal-dropdown' : ''}`}>
            {options.map((option) => (
              <button 
                key={option.value} 
                className="dropdown-item"
                onClick={() => handleSelect(option.value, option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBy;
