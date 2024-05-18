import React from 'react';

const AddBookButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      Cadastrar Livro
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '2%',
};

export default AddBookButton;