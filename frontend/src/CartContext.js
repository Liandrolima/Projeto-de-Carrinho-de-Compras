import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productToRemove) => {
    // Remove apenas o item específico
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productToRemove.id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    // Calcula o total somando o preço de todos os itens no carrinho
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
