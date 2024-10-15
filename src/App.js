// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import UserDashboard from './Userdashboard'; // Ensure this is named correctly
import RestaurantDashboard from './RestaurantDashboard'; // Add this import
import RestaurantSignup from './RestaurantSignup'; // Add this import
import Menu from './Menu';
import Cart from './cart';


function App() {
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant-signup" element={<RestaurantSignup />} /> 
            <Route path="/menu/:id" element={<Menu />} />
            <Route path="/cart" element={<Cart />} /> 
          </Routes>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
