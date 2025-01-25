import React, { useState } from 'react';
import { CartProvider } from './CartContext';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import Login from './components/Login';
import Footer from './components/Footer';
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
        {/* Texto curvado somente se não estiver logado */}
        {!loggedIn && (
          <div className="welcome-text-container">
            <svg
              width="100%"
              height="200px"
              viewBox="0 0 1000 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Curva para baixo */}
              <path
                id="curve"
                d="M50,50 Q500,150 950,50" // Curva para baixo, controle no Y=150
                fill="transparent"
                stroke="transparent"
              />
              {/* Texto seguindo a curva */}
              <text className= "texto">
                <textPath href="#curve" startOffset="50%" textAnchor="middle" className="curved-text">
                  Entre e vislumbre os seus desejos
                </textPath>
              </text>
            </svg>
          </div>
        )}
      </main>
      <Footer />
    </CartProvider>
  );
};

export default App;
