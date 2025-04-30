import React from 'react';
import ColorsFilter from './Colors/Colors';
import SizesFilter from './Sizes/Sizes';
import PriceRangeFilter from './PriceRange/PriceRange';
import './Filters.scss';

interface FiltersProps {
  onColorsChange?: (selectedColors: string[]) => void;
  onSizesChange?: (selectedSizes: string[]) => void;
  onPriceRangeChange?: (selectedRanges: string[]) => void;
  selectedColors?: string[];
  selectedSizes?: string[];
  selectedPriceRanges?: string[];
}

const Filters: React.FC<FiltersProps> = ({ 
  onColorsChange, 
  onSizesChange, 
  onPriceRangeChange,
  selectedColors = [],
  selectedSizes = [],
  selectedPriceRanges = []
}) => {
  return (
    <div className="filters-container">
      <ColorsFilter onChange={onColorsChange} selectedColors={selectedColors} />
      <SizesFilter onChange={onSizesChange} selectedSizes={selectedSizes} />
      <PriceRangeFilter onChange={onPriceRangeChange} selectedRanges={selectedPriceRanges} />
    </div>
  );
};

export default Filters;
