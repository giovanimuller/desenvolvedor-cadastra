import React, { useState, useEffect } from 'react';
import PageTitle from '../PageTitle/PageTitle';
import OrderBy from '../OrderBy/OrderBy';
import Filters from '../Filters/Filters';
import FilterButtons from '../FilterButtons/FilterButtons';
import ProductCard from '../ProductCard/ProductCard';
import { productService } from '../../services/ProductService';
import { Product } from '../../ts/Product';
import './ProductList.scss';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    
    applyFilters();
  }, [selectedColors, selectedSizes, selectedPriceRanges, sortOrder, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        selectedColors.includes(product.color.toLowerCase())
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.size.some(size => selectedSizes.includes(size.toLowerCase()))
      );
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return selectedPriceRanges.some(range => {
          if (range === 'range_0_50') return product.price <= 50;
          if (range === 'range_51_150') return product.price > 50 && product.price <= 150;
          if (range === 'range_151_300') return product.price > 150 && product.price <= 300;
          if (range === 'range_301_500') return product.price > 300 && product.price <= 500;
          if (range === 'range_500_plus') return product.price > 500;
          return false;
        });
      });
    }

    if (sortOrder) {
      if (sortOrder === 'recent') {
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (sortOrder === 'price_high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortOrder === 'price_low') {
        filtered.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredProducts(filtered);
  };

  const handleOrderChange = (value: string) => {
    setSortOrder(value);
  };

  const handleColorsChange = (colors: string[]) => {
    setSelectedColors(colors);
  };

  const handleSizesChange = (sizes: string[]) => {
    setSelectedSizes(sizes);
  };

  const handlePriceRangeChange = (ranges: string[]) => {
    setSelectedPriceRanges(ranges);
  };
  return (
    <div className="product-list">
      <div className="product-list-header">
        <PageTitle title="Blusas" />
        <OrderBy onChange={handleOrderChange} />
      </div>
      <FilterButtons 
        onColorsChange={handleColorsChange}
        onSizesChange={handleSizesChange}
        onPriceRangeChange={handlePriceRangeChange}
        onOrderChange={handleOrderChange}
      />
      <div className="product-list-content">
        <div className="product-list-grid">
          <div className="filters-column">
            <Filters 
              onColorsChange={handleColorsChange}
              onSizesChange={handleSizesChange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
          <div className="products-column">
            {loading && <div className="loading">Carregando produtos...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
              <>
                <div className="products-grid">
                  {filteredProducts.length === 0 ? (
                    <div className="no-products">Nenhum produto encontrado com os filtros aplicados.</div>
                  ) : (
                    filteredProducts.slice(0, visibleCount).map((product, index) => (
                      <ProductCard key={`${product.id}-${index}`} product={product} />
                    ))
                  )}
                </div>
                {filteredProducts.length > visibleCount && (
                  <div className="load-more-container">
                    <button 
                      className="load-more-button"
                      onClick={() => setVisibleCount(prev => prev + 6)}
                    >
                      Carregar mais
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

 