
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import UserDashboard from './Userdashboard';


function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
        </Router>
      <Footer/>
    </div>
  );
}

export default App;
