import React, { useState } from 'react';
import { CartProvider } from './CartContext';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CartProvider>
      <Header />
      <main>
        {loggedIn ? (
          <>
            <ProductsList />
            <Cart />
          </>
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </main>
    </CartProvider>
  );
};

export default App;
