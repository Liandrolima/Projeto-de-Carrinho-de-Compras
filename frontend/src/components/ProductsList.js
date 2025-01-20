import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import ProductCard from './ProductCard';
import './ProductsList.css';

const ProductsList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
