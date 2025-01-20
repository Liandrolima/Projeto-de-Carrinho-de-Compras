import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>R${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;
