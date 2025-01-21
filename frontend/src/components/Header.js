import React, { useState } from 'react';
import { useCart } from '../CartContext';
import './Header.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

const Header = () => {
  const { cartItems, calculateTotal, removeFromCart } = useCart(); // Acessa o cálculo do total e a função de remover item
  const [showCart, setShowCart] = useState(false); // Estado para controlar a visibilidade do carrinho

  // Função para alternar a visibilidade do carrinho
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <header>
      <h1>VivaModa</h1>
      <div>
        <span className="fas fa-shopping-cart" id="cart-icon" onClick={toggleCart}> 🛒 </span>
        <span>: {cartItems.length} item(s)</span> {/* Exibe o número de itens */}
      </div>
      <div>
        <span>Total: R$ {calculateTotal()}</span> {/* Exibe o total calculado */}
      </div>

      {/* Exibe o conteúdo do carrinho quando showCart for true */}
      {showCart && (
        <div className="cart-modal">
          <h2>Itens no Carrinho</h2>
          {cartItems.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={item.uniqueKey}>
                  <span>{item.title}</span>
                  <button onClick={() => removeFromCart(item.uniqueKey)}>Remover</button>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-actions">
            <span>Total: R$ {calculateTotal()}</span>
            <button onClick={() => setShowCart(false)}>Fechar</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
