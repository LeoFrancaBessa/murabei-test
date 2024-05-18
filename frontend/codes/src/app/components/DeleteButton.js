import React from 'react';

const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      <img src="/trash_icon.svg" alt="Deletar" style={iconStyle} />
    </button>
  );
};

const buttonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const iconStyle = {
  width: '20px',
  height: '20px'
};

export default DeleteButton;