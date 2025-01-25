import React from 'react';
import { useCart } from '../CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, total } = useCart();

  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    clearCart();  // Limpa o carrinho após finalizar a compra
  };

  return (
    <div className="cart">
      <h2 id='pos'><span id="cart-cart"> 🛒 </span>Carrinho de Compras</h2>
      
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.uniqueKey}>
                <span>{item.title} - R${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.uniqueKey)}>Remover</button>
              </li>
            ))}
          </ul>
          <div>
            <h3>Total: R${total.toFixed(2)}</h3> {/* Exibindo o total diretamente do contexto */}
            <button onClick={handleCheckout}>Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
