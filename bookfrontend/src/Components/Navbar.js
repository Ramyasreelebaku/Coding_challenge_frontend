// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Comp_csss/Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm }) => {
    return (
        <nav className="navbar">
            <h2>BookScape</h2>
            <input
                type="text"
                placeholder="Search books..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="nav-links">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/admin-login" className="admin-login">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
