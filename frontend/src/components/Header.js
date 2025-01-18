import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import './Header.css';


const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <header>
      <h1>Meu Carrinho de Compras</h1>
      <button>🛒 Carrinho ({cart.length})</button>
    </header>
  );
};

export default Header;

