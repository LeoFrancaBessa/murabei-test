import React from 'react';

const SaveBookButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      Salvar Livro
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default SaveBookButton;