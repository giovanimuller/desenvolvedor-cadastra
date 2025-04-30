import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/img/logo-header.svg" alt="Logo Cadastra" />
          </div>
          <div className="shopping-bag">
            <img src="/img/ico-bag.svg" alt="Carrinho de compras" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
