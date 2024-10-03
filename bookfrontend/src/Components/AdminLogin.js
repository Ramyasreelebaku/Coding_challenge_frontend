
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import '../Comp_csss/AdminLogin.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const loginUser = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    axios.post('http://localhost:9000/api/auth/login', loginData)
      .then(response => {
        const token = response.data.jwt; 
        localStorage.setItem('token', token); 
        toast.success('Login successful!');
        navigate('/bookcard'); 
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        toast.error('Login failed! Please check your credentials.'); 
      });
  };

  return (
    <div className="admin-login-container">
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
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default AdminLogin;
