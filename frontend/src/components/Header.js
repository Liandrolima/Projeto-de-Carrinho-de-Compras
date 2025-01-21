import React from 'react';
import { useCart } from '../CartContext';
import './Header.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

const Header = () => {
  const { cartItems, calculateTotal } = useCart(); // Acessa o cálculo do total

  return (
    <header>
      <h1>VivaModa</h1>
      <div>
        
        <span className="fas fa-shopping-cart" id="cart-icon"> 🛒 </span>
        <span>: {cartItems.length} item(s)</span> {/* Exibe o número de itens */}
      </div>
      <div>
        <span>Total: R$ {calculateTotal()}</span> {/* Exibe o total calculado */}
      </div>
    </header>
  );
};

export default Header;