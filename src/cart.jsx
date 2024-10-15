// src/Cart.js
import React, { useState } from 'react';

const Cart = ({ cart, setCart }) => {
  const [checkoutMessage, setCheckoutMessage] = useState(''); 

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0); // Calculate total price

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Simulate checkout process
      setCheckoutMessage('Thank you for your purchase!');
      setCart([]); // Clear cart
      localStorage.removeItem('cart'); // Clear localStorage
    } else {
      setCheckoutMessage('Your cart is empty.');
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
      {checkoutMessage && <p>{checkoutMessage}</p>}
    </div>
  );
};

export default Cart;
