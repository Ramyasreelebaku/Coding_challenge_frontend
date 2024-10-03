import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Comp_csss/BookDetails.css';
import hauntedImage from '../images/haunted.jpg';
import summer1Image from '../images/summer1.jpg';
import summer2Image from '../images/summer2.jpg';
import Rating from '@mui/material/Rating';

// Hardcoded descriptions for books
const hardcodedDescriptions = {
  1: "This is a thrilling tale of haunted adventures and ghostly encounters.",
  2: "Belly, a young 17 years old has a crush over her cousin Conrad ever since she was a child. One summer all of them went to cousins to enjoy the summer of their life!",
  3: "Belly got stuck in a love triangle between Conrad and his brother Jeremiah. Who will she choose?",
};

// Hardcoded genres for books
const genres = {
  1: "Horror",
  2: "Teen Romance",
  3: "Teen Romance",
};

// Hardcoded ratings for books
const ratings = {
  1: 4.5, // Predefined rating for book 1
  2: 3.8, // Predefined rating for book 2
  3: 4.0, // Predefined rating for book 3
};

// Mapping ISBN to image URLs
const bookImages = {
  1: hauntedImage,
  2: summer1Image,
  3: summer2Image,
};

const BookDetails = () => {
  const { isbn } = useParams(); // Get the ISBN from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = () => {
      axios.get(`http://localhost:9000/api/auth/getBookById/${isbn}`)
        .then(response => {
          // Merge hardcoded description, genre, and rating with API data
          const bookData = response.data;
          const description = hardcodedDescriptions[isbn] || "Description not available.";
          const genre = genres[isbn] || "Genre not available.";
          const rating = ratings[isbn] || 0; // Default rating to 0 if not available
          setBook({ ...bookData, description, genre, rating });
        })
        .catch(error => {
          setError('There was an error fetching the book details.');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchBookDetails();
  }, [isbn]);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-details">
      <img
        src={bookImages[book.isbn] || 'path/to/default/image.jpg'} 
        alt={`${book.title} cover`}
        className="book-image"
      />
      <h3><strong>Title:</strong> {book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published:</strong> {book.publicationYear}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      
      {/* Predefined Rating Display */}
      <div className="rating-section">
  <strong>Book Rate:</strong>
  <div className="rating-stars">
    <Rating
      name="Book Rate:"
      value={book.rating}
      readOnly // Make it read-only to prevent user interaction
      precision={0.5}
    />
  </div>
</div>
    </div>
  );
};

export default BookDetails;
