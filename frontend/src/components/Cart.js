import React from 'react';
import { useCart } from '../CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, calculateTotal } = useCart();

  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    clearCart();  // Limpa o carrinho após finalizar a compra
  };

  return (
    <div className="cart">
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <span>{item.title} - R${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(index)}>Remover</button>
              </li>
            ))}
          </ul>
          <div>
            <h3>Total: R${calculateTotal().toFixed(2)}</h3>
            <button onClick={handleCheckout}>Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );    
};

export default Cart;
