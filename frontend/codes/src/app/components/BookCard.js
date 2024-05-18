import React from 'react';
import DeleteButton from './DeleteButton';

const BookCard = ({ id, title, author, biography, onDelete }) => {
  return (
    <div style={cardStyle}>
      <h4>{title}</h4>
      <p><strong>Autor:</strong> {author}</p>
      <p>{biography}</p>
      <DeleteButton onClick={() => onDelete(id)} />
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  margin: '8px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '600px',
  position: 'relative'
};

export default BookCard;