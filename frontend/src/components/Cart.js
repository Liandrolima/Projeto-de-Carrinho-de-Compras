import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css"; // Importando o CSS

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Carrinho de Compras</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio</p>
      ) : (
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">R$ {item.price}</span>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <span className="total-label">Total:</span>
        <span className="total-price">R$ {total}</span>
      </div>
    </div>
  );
};

export default Cart;
