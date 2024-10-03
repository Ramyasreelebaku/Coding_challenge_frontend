/*import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
 
function App() {
 
  let [users, setUsers] = useState([]);
  let [ac, setAc] = useState();
  let [name, setName] = useState();
  let [bal, setBal] = useState();
  let [message, setMessage] = useState(' ');  // State for success/error messages
 
  useEffect(() => {
    getData();
  }, [message])
 
  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:1000/api/getcust");
      if (res.data) { // Check if API response indicates success
        setUsers(res.data);
        //setMessage("Data retrieved successfully!");
      } else {
        setMessage("Failed to retrieve data.");
      }
    } catch (error) {
      setMessage("Error occurred while fetching data.");
    }
  }
 
  const storeData = async () => {
    let user = {
      "acNo": ac,
      "name": name,
      "bal": bal
    };
 
    try {
      let res = await axios.post("http://localhost:1000/api/savecust", user);
      if (res.data ) {  // Check for success in the API response
        setMessage("Record added successfully!");
      } else {
        setMessage("Failed to add record.");
      }
    } catch (error) {
      setMessage("Error occurred while adding record.");
    }
  }
 
  const removeDatabyAcnumber = async () => {
    try {
      let res = await axios.delete(`http://localhost:1000/api/delcust/${ac}`);
      if (res.data) { // Handle success based on response data
        setMessage("Record removed successfully by account number!");
      } else {
        setMessage("Failed to remove record by account number.");
      }
    }
    catch (error) {
      setMessage("Error occurred while removing record by account number.");
    }
  }
 
  const removeDatabyName = async () => {
    try {
      let res = await axios.delete(`http://localhost:1000/api/delcustbyname/${name}`);
      if (res.data) { // Handle success based on response data
        setMessage("Record removed successfully by name!");
      } else {
        setMessage("Failed to remove record by name.");
      }
    } catch (error) {
      setMessage("Error occurred while removing record by name.");
    }
  }
 
  const updateData = async () => {
    try {
      let res = await axios.put(`http://localhost:1000/api/updatedatabyq/${bal}/${ac}`);
      if (res.data) { // Handle success based on response data
        setMessage("Record updated successfully!");
      } else {
        setMessage("Failed to update record.");
      }
    } catch (error) {
      setMessage("Error occurred while updating record.");
    }
  }
 
  return (
    <div className="App">
      <input type="text" placeholder='Account number' onChange={(e) => setAc(e.target.value)} />
      <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder='Balance' onChange={(e) => setBal(e.target.value)} />
 
      <button onClick={storeData}>Add Record</button><br/><br/>
      <button onClick={removeDatabyAcnumber}>Remove Data by Account number</button><br/>
      <button onClick={removeDatabyName}>Remove Data by Name</button><br/>
      <button onClick={updateData}>Update Data</button><br/><br/>
 
      {message && <h3>{message}</h3>}
 
      {
        users ? users.map((temp) => <h1 key={temp.acNo}>{temp.name}  {temp.bal}</h1>) : null
      }
    </div>
  );
}
 
export default App;*/

/*import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
  let [roll, setRoll] = useState('');
  let [name, setName] = useState('');
  let [fee, setFee] = useState('');
  let [age, setAge] = useState('');
  let [email, setEmail] = useState('');
  let [address, setAddress] = useState('');
  let [msg, setMsg] = useState('');
  let [students, setStudents] = useState([]);

 
  const add = async () => {
    let student = { roll, name, fee, age, email, address };

    try {
      let res = await axios.post("http://localhost:8080/saveStudent", student);
      if (res.data) {
        setMsg("Student added successfully!");
        getData(); 
      } else {
        setMsg("Failed to add student.");
      }
    } catch (error) {
      setMsg("Error occurred while adding student.");
      console.error(error); 
    }
  };

  const remove = async () => {
    try {
      let res = await axios.delete(`http://localhost:8080/removeStudent/${roll}`);
      if (res.data) {
        setMsg("Student removed successfully!");
        getData(); 
      } else {
        setMsg("Failed to remove student.");
      }
    } catch (error) {
      setMsg("Error occurred while removing student.");
      console.error(error); 
    }
  };

  const update = async () => {
    try {
      let res = await axios.put(`http://localhost:8080/updateName/${roll}/${name}`);
      if (res.data) {
        setMsg("Student updated successfully!");
        getData(); 
      } else {
        setMsg("Failed to update student.");
      }
    } catch (error) {
      setMsg("Error occurred while updating student.");
      console.error(error); 
    }
  };

  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:8080/students");
      if (res.data) { 
        setStudents(res.data); 
      } else {
        setMsg("Failed to retrieve students.");
      }
    } catch (error) {
      setMsg("Error occurred while fetching student data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="form">
        <input
          type="text"
          placeholder="Enter your roll number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={add}>Add Student</button>
        <button onClick={remove}>Remove Student</button>
        <button onClick={update}>Update Student</button>
        <h3>{msg}</h3>

        <div>
          {students.map((student, index) => (
            <div key={index}>
              <h4>{student.name}</h4>
              <p>Roll: {student.roll}, Fee: {student.fee}, Age: {student.age}</p>
              <p>Email: {student.email}, Address: {student.address}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;*/

/*import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  // States for login, signup, and book management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [name, setName] = useState('');
  const [userRole, setUserRole] = useState('0'); // Default to Admin (0 for admin, 1 for user)

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:9000/api/admin/getBooks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  };

  // Handle login
  const loginUser = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    axios.post('http://localhost:9000/api/auth/login', loginData)
      .then(response => {
        const token = response.data.jwt; // Get JWT token from response
        localStorage.setItem('token', token); // Save token in localStorage
        alert('Login successful!');
        fetchBooks(); // Fetch books after login
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        alert('Login failed! Please check your credentials.');
      });
  };

  // Handle signup with user role
  const signupUser = (e) => {
    e.preventDefault();
    const signupData = {
      email: signupEmail,
      password: signupPassword,
      name,
      userRole: parseInt(userRole, 10) // Convert role to number (0 for Admin, 1 for User)
    };

    axios.post('http://localhost:9000/api/auth/signup', signupData)
      .then(response => {
        alert('Signup successful! You can now log in.');
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        alert('Signup failed! Please try again.');
      });
  };

  // Add book
  const addBook = (e) => {
    e.preventDefault();
    const book = { title, author, publicationYear: parseInt(publicationYear, 10) };
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios.post('http://localhost:9000/api/admin/addNewBook', book, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        alert('Book added successfully');
        fetchBooks(); // Refresh book list
      })
      .catch(error => {
        console.error('There was an error adding the book!', error);
      });
  };

  // Update book title
  const updateBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:9000/api/admin/updateBook/${isbn}/${newTitle}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert('Book updated successfully');
        fetchBooks(); // Refresh book list
      })
      .catch(error => {
        console.error('There was an error updating the book!', error);
      });
  };

  // Remove book
  const removeBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:9000/api/admin/removeBook/${isbn}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert('Book removed successfully');
        fetchBooks(); // Refresh book list
      })
      .catch(error => {
        console.error('There was an error removing the book!', error);
      });
  };

  return (
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={
            <div>
              <h2>Login</h2>
              <form onSubmit={loginUser}>
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
            </div>
          } />

          <Route path="/signup" element={
            <div>
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
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                  <option value="0">Admin</option>
                  <option value="1">User</option>
                </select>
                <button type="submit">Signup</button>
              </form>
            </div>
          } />

          <Route path="/" element={
            <div>
              <h1>Book Management</h1>
              <h2>Add New Book</h2>
              <form onSubmit={addBook}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
                <input type="number" placeholder="Publication Year" value={publicationYear} onChange={e => setPublicationYear(e.target.value)} required />
                <button type="submit">Add Book</button>
              </form>

              <h2>Update Book Title</h2>
              <form onSubmit={updateBook}>
                <input type="number" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} required />
                <input type="text" placeholder="New Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                <button type="submit">Update Book</button>
              </form>

              <h2>Remove Book</h2>
              <form onSubmit={removeBook}>
                <input type="number" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} required />
                <button type="submit">Remove Book</button>
              </form>


              <h2>Book List</h2>
              <ul>
                {books.map(book => (
                  <li key={book.isbn}>
                    {book.title} by {book.author} (Published: {book.publicationYear})
                  </li>
                ))}
              </ul>
            </div>
          } />
        </Routes>
      </div>
  );
}

export default App;*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import BookCard from './Components/BookCard';
import Navbar from './Components/Navbar';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import AdminLogin from './Components/AdminLogin';
import BookDetails from './Components/BookDetails';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
      <div>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} /> {/* SignupPage Route */}
          <Route path="/" element={<HomePage />} /> {/* Home page with BookCard */}
          <Route path="/bookcard" element={<BookCard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/book/:isbn" element={<BookDetails />} />
        </Routes>
      </div>
  );
}

export default App;
