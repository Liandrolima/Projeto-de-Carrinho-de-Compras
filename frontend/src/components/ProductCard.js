import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  // Função para traduzir as descrições de inglês para português
  const traduzirDescricao = (descricaoEmIngles) => {
    const traducoes = {
      'This is a description in English.': 'Esta é uma descrição em português.',
      'Another product description': 'Outra descrição de produto em português.',
      // Adicione mais traduções aqui
    };

    return traducoes[descricaoEmIngles] || descricaoEmIngles; // Caso não haja tradução, exibe o texto original
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{traduzirDescricao(product.description)}</p> {/* Exibe a descrição traduzida */}
      <p>R${product.price}</p> {/* Preço original do produto, sem alterações */}
      <button onClick={() => onAddToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;
