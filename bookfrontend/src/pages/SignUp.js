import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../Comp_csss/SignUp.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function SignUp() {
  const [name, setName] = useState('');
  const [email, setSignupEmail] = useState('');
  const [password, setSignupPassword] = useState('');
  const [userRole, setUserRole] = useState('0'); 

  const signupUser = (e) => {
    e.preventDefault();
    const signupData = {
      email,
      password,
      name,
      userRole: parseInt(userRole, 10) 
    };

    axios.post('http://localhost:9000/api/auth/signup', signupData)
      .then(response => {
        toast.success('Signup successful! You can now log in.'); 
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        toast.error('Signup failed! Please try again.'); 
      });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={signupUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setSignupEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
        />
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="0">Admin</option>
          <option value="1">User</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <p className="login-message">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <ToastContainer /> 
    </div>
  );
}

export default SignUp;
