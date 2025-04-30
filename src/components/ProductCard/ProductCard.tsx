import React from 'react';
import './ProductCard.scss';
import { Product } from '../../ts/Product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  
  const productInCart = isInCart(product.id);
  
  const handleBuyClick = () => {
    if (!productInCart) {
      addToCart(product);
    }
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={`/img/${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name.toUpperCase()}</h3>
        <div className="product-price">R$ {product.price.toFixed(2)}</div>
        <div className="product-installment">
          {product.parcelamento && 
            `ou ${product.parcelamento[0]}x de R$ ${product.parcelamento[1].toFixed(2)}`
          }
        </div>
        <button 
          className="buy-button"
          onClick={handleBuyClick}
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
