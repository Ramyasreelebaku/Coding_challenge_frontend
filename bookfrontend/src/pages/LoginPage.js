import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Comp_csss/LoginPage.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    
    console.log("Sending login data:", loginData); // Log the login data being sent
  
    axios.post('http://localhost:9000/api/auth/login', loginData)
      .then(response => {
        console.log("Received response:", response); // Log the full response
  
        const token = response.data.jwt;
        if (token) {
          localStorage.setItem('token', token); // Save token in localStorage
          setIsLoggedIn(true);
          toast.success('Login successful!');
          navigate('/');
        } else {
          console.error("Token not found in response.");
          toast.error('Login failed! Token not found.');
        }
      })
      .catch(error => {
        console.error('There was an error logging in!', error); // Log any error details
        toast.error('Login failed! Please check your credentials.');
      });
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-message">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
