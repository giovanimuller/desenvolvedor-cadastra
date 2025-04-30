import React from 'react';
import ColorsFilter from './Colors/Colors';
import SizesFilter from './Sizes/Sizes';
import PriceRangeFilter from './PriceRange/PriceRange';
import './Filters.scss';

interface FiltersProps {
  onColorsChange?: (selectedColors: string[]) => void;
  onSizesChange?: (selectedSizes: string[]) => void;
  onPriceRangeChange?: (selectedRanges: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  onColorsChange, 
  onSizesChange, 
  onPriceRangeChange 
}) => {
  return (
    <div className="filters-container">
      <ColorsFilter onChange={onColorsChange} />
      <SizesFilter onChange={onSizesChange} />
      <PriceRangeFilter onChange={onPriceRangeChange} />
    </div>
  );
};

export default Filters;
