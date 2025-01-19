// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importa apenas Routes e Route
import { CartProvider } from './CartContext';
import Header from './components/Header';
import Login from './pages/Login';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';

const App = () => {
  const token = localStorage.getItem('token'); // Verifique se o usuário está autenticado

  return (
    <CartProvider>
      <Header />
      <Routes>
        {/* Se o token não existir, exibe o Login */}
        <Route path="/" element={token ? <ProductsList /> : <Login />} />
        
        {/* Apenas renderiza ProductsList quando o usuário estiver logado */}
        <Route path="/products" element={token ? <ProductsList /> : <Login />} />

        {/* Carrinho de compras */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
