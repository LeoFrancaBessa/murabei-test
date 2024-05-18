import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const BookList = ({ author, title }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = 'http://127.0.0.1:5000/api/v1/books';
        if (author) {
          url = `http://127.0.0.1:5000/api/v1/books/author/${author}`;
        } else if (title) {
          url = `http://127.0.0.1:5000/api/v1/books/title/${title}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchBooks();
  }, [author, title]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/books/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        alert('Livro deletado com sucesso!');
        setBooks(books.filter((book) => book.id !== id));
      } else {
        alert('Erro ao deletar o livro.');
      }
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
      alert('Erro ao deletar o livro.');
    }
  };

  return (
    <div style={listStyle}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          biography={book.biography}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

export default BookList;