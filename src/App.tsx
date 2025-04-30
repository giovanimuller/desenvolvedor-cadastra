import React from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import './App.scss';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <div className="main-content">
          <div className="container">
            <ProductList />
          </div>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
