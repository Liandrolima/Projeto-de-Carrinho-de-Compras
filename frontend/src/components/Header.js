import React from 'react';
import { useCart } from '../CartContext';
import './Header.css';

const Header = () => {
  const { cartItems, calculateTotal } = useCart(); // Acessa o cálculo do total

  return (
    <header>
      <h1>Loja Virtual</h1>
      <div>
        <span>Carrinho: </span>
        <span>{cartItems.length} item(s)</span> {/* Exibe o número de itens */}
      </div>
      <div>
        <span>Total: R$ {calculateTotal()}</span> {/* Exibe o total calculado */}
      </div>
    </header>
  );
};

export default Header;
