import React from 'react';
import PageTitle from '../PageTitle/PageTitle';
import OrderBy from '../OrderBy/OrderBy';
import './ProductList.scss';

const ProductList: React.FC = () => {
  const handleOrderChange = (value: string) => {
    console.log('Order changed to:', value);
    // This will be implemented later when we add the product listing
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <PageTitle title="Blusas" />
        <OrderBy onChange={handleOrderChange} />
      </div>
      <div className="product-list-content">
        {/* Product items will be added here in the future */}
      </div>
    </div>
  );
};

export default ProductList;
