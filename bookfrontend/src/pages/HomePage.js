
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Comp_csss/HomePage.css';
import hauntedImage from '../images/haunted.jpg';
import summer1Image from '../images/summer1.jpg';
import summer2Image from '../images/summer2.jpg';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const bookImages = {
  1: hauntedImage,
  2: summer1Image,
  3: summer2Image,
};

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  const fetchBooks = () => {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:9000/api/auth/getBooks';

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setBooks(response.data);
        toast.success('Books fetched successfully!'); 
      })
      .catch(error => {
        setError('There was an error fetching the books!');
        console.error(error);
        toast.error('Failed to fetch books! Please try again.'); 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (isbn) => {
    navigate(`/book/${isbn}`); 
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      <h1>What's Your Fantasy</h1>

      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input"
      />

      <ul>
        {filteredBooks.map(book => (
          <li key={book.isbn} className="book-item" onClick={() => handleBookClick(book.isbn)}>
            <img
              src={bookImages[book.isbn] || 'path/to/default/image.jpg'} 
              alt={`${book.title} cover`}
              className="book-image"
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p>(Published: {book.publicationYear})</p>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer /> 
    </div>
  );
}

export default HomePage;
