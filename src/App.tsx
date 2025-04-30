import React from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="container">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default App;
