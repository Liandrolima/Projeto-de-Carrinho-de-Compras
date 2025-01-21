import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    const newProduct = {
      ...product,
      uniqueKey: `${product.id}-${Date.now()}`, // Garantindo que o uniqueKey seja único
    };
    console.log('Adicionando ao carrinho:', newProduct);
    setCartItems((prevItems) => [...prevItems, newProduct]);
  };

  // Função para remover um produto do carrinho
  const removeFromCart = (uniqueKey) => {
    console.log('Removendo item com uniqueKey:', uniqueKey);
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.uniqueKey !== uniqueKey);
      console.log('Itens no carrinho após remoção:', newItems);
      return newItems;
    });
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Função para calcular o total dos itens no carrinho
  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    return total;
  };

  // Cálculo do total (diretamente no CartContext, sem useEffect)
  const total = calculateTotal();

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, calculateTotal, total }}>
      {children}
    </CartContext.Provider>
  );
};
