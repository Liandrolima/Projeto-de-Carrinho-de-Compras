// src/components/ProductsList.js

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]); // Estado para armazenar produtos
  const [cart, setCart] = useState([]); // Estado para armazenar o carrinho
  const [total, setTotal] = useState(0); // Estado para armazenar o total do carrinho

  // Atualiza o total sempre que o carrinho é alterado
  const updateTotal = (updatedCart) => {
    const newTotal = updatedCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotal(newTotal.toFixed(2)); // Atualiza o estado do total
  };

  // Função para adicionar produto ao carrinho
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      updateTotal(updatedCart);
      return updatedCart;
    });
  };

  // Função para remover produto do carrinho
  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      updateTotal(updatedCart);
      return updatedCart;
    });
  };

  // Função para finalizar a compra
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    const cartDetails = cart
      .map(
        (item) =>
          `${item.title} - R$${item.price.toFixed(2)} x ${item.quantity} = R$${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');
    alert(`Itens no carrinho:\n${cartDetails}\n\nTotal a pagar: R$${total}`);
    setCart([]); // Limpar o carrinho após finalizar a compra
    setTotal(0); // Resetar o total
  };

  useEffect(() => {
    // Buscando os produtos da API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Exibindo o carrinho */}
      <div className="cart">
        <h2>Carrinho de Compras</h2>
        {cart.length === 0 ? (
          <p>O carrinho está vazio</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.title} - R${product.price.toFixed(2)} x{' '}
                {product.quantity} = R$
                {(product.price * product.quantity).toFixed(2)}
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: R${total}</h3>
        {cart.length > 0 && (
          <button onClick={handleCheckout}>Finalizar Compra</button>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
