// src/components/ProductCard.js
import React, { useContext } from "react";
import { CartContext } from "../CartContext"; // Contexto do carrinho

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // Verifica se 'product' está carregado antes de exibir o conteúdo
  if (!product) {
    return <div>Carregando produto...</div>; // Mensagem enquanto carrega
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Preço: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;

