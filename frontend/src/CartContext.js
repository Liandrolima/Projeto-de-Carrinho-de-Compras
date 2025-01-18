import React, { createContext, useState, useEffect } from "react";

// Criação do contexto
export const CartContext = createContext();

// Componente Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Salvar o carrinho no localStorage sempre que o estado "cart" mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Recuperar o carrinho do localStorage ao carregar o componente
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
