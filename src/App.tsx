import React, { useEffect, useState } from 'react';
import { Product } from './ts/Product';

const serverUrl = "/api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${serverUrl}/products`);
        if (!response.ok) {
          throw new Error('Falha ao carregar produtos');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getImagePath = (imagePath: string) => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return cleanPath;
  };

  return (
    <div className="app">
      <h1>Desafio Cadastra</h1>
      {loading && <p>Carregando produtos...</p>}
      {error && <p className="error">Erro: {error}</p>}
      
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={getImagePath(product.image)} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <p>Cor: {product.color}</p>
            <p>Tamanhos: {product.size.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
