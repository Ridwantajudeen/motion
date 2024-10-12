// // src/components/Signup.jsx

// import React, { useState } from 'react';
// import { auth } from './firebase'; // Import auth from firebase.js
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { Link, useNavigate } from 'react-router-dom';

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       navigate('/login'); // Redirect after successful signup
//     } catch (error) {
//       setError('Failed to create an account. Try again.');
//     }
//   };

//   return (
//     <div className="signup">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">Sign Up</button>
//       </form>
//       <Link to="/login">Already have an account? Login</Link>
//     </div>
//   );
// }

// export default Signup;
