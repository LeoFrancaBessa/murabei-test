import React from 'react';

const NormalButton = ({ text, onClick, id }) => {
  return (
    <button id={id} onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
      {text}
    </button>
  );
};

export default NormalButton;