import React from 'react';
import { useCart } from '../../context/CartContext';
import './Header.scss';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/src/img/logo-header.svg" alt="Logo Cadastra" />
          </div>
          <div className="shopping-bag">
            {itemCount > 0 ? (
              <div className="cart-with-items">
                <img src="/src/img/ico-bag.svg" alt="Carrinho de compras com itens" />
                <span className="cart-count">{itemCount}</span>
              </div>
            ) : (
              <img src="/src/img/ico-bag.svg" alt="Carrinho de compras vazio" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
