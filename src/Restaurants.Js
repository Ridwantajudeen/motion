// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';
import './App.css'; // Optional, for styling

const App = () => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get('/api/food'); // API endpoint
                setFoodItems(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        fetchFoodData();
    }, []);

    return (
        <div className="App">
            <h1>Food Delivery</h1>
            <div className="food-cards">
                {foodItems.map((item) => (
                    <FoodCard
                        key={item.id}
                        image={item.image}
                        restaurant={item.restaurant}
                        deliveryTime={item.deliveryTime}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
