// src/components/ProductCard.js

import React from 'react';
import './ProductCard.css';

// Função para aplicar a tradução
const translateText = (text) => {
  const translations = {
    "Your perfect pack for everyday use and walks in the forest.": "Sua mochila perfeita para o uso diário e caminhadas na floresta.",
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Mochila Fjallraven - Foldsack No. 1, cabe até 15 laptops",
    "This is an awesome product that you must have!": "Este é um produto incrível que você deve ter!",
    "Get this item now and enjoy its unique features.": "Adquira este item agora e aproveite suas características exclusivas.",
    "The perfect laptop for work or school.": "O laptop perfeito para o trabalho ou escola.",
    "Comfortable and stylish shoes for everyday use.": "Sapatos confortáveis e estilosos para o uso diário.",
    "Classic design with excellent durability.": "Design clássico com excelente durabilidade.",
    "A beautiful and functional watch for any occasion.": "Um relógio bonito e funcional para qualquer ocasião.",
    "High-quality headphones with noise cancellation.": "Fones de ouvido de alta qualidade com cancelamento de ruído.",
    "Elegant dress perfect for a night out.": "Vestido elegante, perfeito para uma noite fora.",
    // Adicione mais traduções conforme necessário
  };

  // Retorna a tradução ou o texto original, caso não exista tradução
  return translations[text] || text; 
};

const ProductCard = ({ product, onAddToCart }) => {
  const { title, description, price, image } = product;

  // Tradução dos textos
  const translatedTitle = translateText(title);
  const translatedDescription = translateText(description);

  const handleAddToCart = () => {
    // Chama a função de adicionar ao carrinho
    onAddToCart(product);
    console.log(`Produto ${translatedTitle} adicionado ao carrinho!`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={translatedTitle} />
      <h3>{translatedTitle}</h3>
      <p>{translatedDescription}</p>
      <p>R${price}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>  
    </div>
  );
};

export default ProductCard;
