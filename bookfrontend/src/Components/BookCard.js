import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../Comp_csss/BookCard.css'; 
import hauntedImage from '../images/haunted.jpg';
import summer1Image from '../images/summer1.jpg';
import summer2Image from '../images/summer2.jpg';

const bookImages = {
  1: hauntedImage,
  2: summer1Image,
  3: summer2Image,

};

function BookCard() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); 

  const fetchBooks = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:9000/api/auth/getBooks', {
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

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = (e) => {
    e.preventDefault();
    const book = { title, author, publicationYear: parseInt(publicationYear, 10) };
    const token = localStorage.getItem('token');

    axios.post('http://localhost:9000/api/admin/addNewBook', book, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        toast.success('Book added successfully');
        fetchBooks(); 
      })
      .catch(error => {
        console.error('There was an error adding the book!', error);
        toast.error('There was an error adding the book!'); 
      });
  };

  const updateBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:9000/api/admin/updateBook/${editingBook.isbn}/${newTitle}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        toast.success('Book updated successfully'); 
        setEditingBook(null); 
        setNewTitle(''); 
        fetchBooks(); 
      })
      .catch(error => {
        console.error('There was an error updating the book!', error);
        toast.error('There was an error updating the book!'); 
      });
  };

  const removeBook = (book) => {
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:9000/api/admin/removeBook/${book.isbn}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        toast.success('Book removed successfully'); 
        fetchBooks(); 
      })
      .catch(error => {
        console.error('There was an error removing the book!', error);
        toast.error('There was an error removing the book!'); 
      });
  };

  return (
    <div className="bookcard-container">
      <ToastContainer /> 
      <div className="sidebar">
        <h2>Add New Book</h2>
        <form className="bookcard-form" onSubmit={addBook}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
          <input type="number" placeholder="Publication Year" value={publicationYear} onChange={e => setPublicationYear(e.target.value)} required />
          <button type="submit">Add Book</button>
        </form>

        {editingBook && (
          <form className="bookcard-form" onSubmit={updateBook}>
            <input type="text" placeholder="New Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
            <button type="submit">Update Book</button>
            <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>
          </form>
        )}
      </div>

      <div className="book-list-container">
        <h2>Book List</h2>
        <ul className="book-list">
          {books.map(book => (
            <li key={book.isbn} className="book-item">
              <img
                src={bookImages[book.isbn] || '../images/default.jpg'} 
                alt={`${book.title} cover`}
                className="book-image"
              />
              <div className="book-details">
                <span><strong>Title:</strong> {book.title}</span>
                <span><strong>Author:</strong> {book.author}</span>
                <span><strong>Published:</strong> {book.publicationYear}</span>
                <div className="book-actions">
                  <button onClick={() => { setEditingBook(book); setNewTitle(book.title); }}>Update</button>
                  <button onClick={() => removeBook(book)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookCard;
