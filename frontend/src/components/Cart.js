// src/components/Cart.js

import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const Cart = () => {
  const { cart, removeFromCart, calculateTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return <p>O carrinho está vazio.</p>;
  }

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.title} - R${product.price} x {product.quantity} = R$
            {(product.price * product.quantity).toFixed(2)}
            <button onClick={() => removeFromCart(product.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Total: R${calculateTotal()}</h3>
    </div>
  );
};

export default Cart;
