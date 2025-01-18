import React from "react";
import { CartProvider } from "./CartContext"; // Importando o CartProvider
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

const App = () => {
  return (
    <CartProvider>
      <div>
        <Header />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Exemplo de produtos: adicione mais conforme necessário */}
          <ProductCard id={1} name="Produto 1" price={50} />
          <ProductCard id={2} name="Produto 2" price={100} />
          <ProductCard id={3} name="Produto 3" price={30} />
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
