// src/Menu.js
import React, { useEffect, useState } from 'react';
import { firestore } from './firebase'; 
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions to get restaurant data
import { useParams } from 'react-router-dom'; // Import useParams to access restaurant ID from URL

const Menu = () => {
  const { id: restaurantId } = useParams(); // Access restaurant ID from URL parameters
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch restaurant's menu items from Firestore
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const restaurantRef = doc(firestore, 'restaurants', restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);
        
        if (restaurantDoc.exists()) {
          const restaurantData = restaurantDoc.data();
          setMenuItems(restaurantData.menu || []); // Assuming you added a 'menu' field in the Firestore document
        } else {
          console.error('Restaurant does not exist');
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
