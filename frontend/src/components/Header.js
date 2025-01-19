// src/components/Header.js

import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import './Header.css';

const Header = () => {
  const { cart } = useContext(CartContext); // Acessando o estado do carrinho

  return (
    <header className="header">
      <h1>Loja Virtual</h1>
      <div className="cart-info">
        <span>Carrinho: {cart.reduce((total, product) => total + product.quantity, 0)} itens</span>
      </div>
    </header>
  );
};

export default Header;
