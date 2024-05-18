import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Digite sua pesquisa..."
      value={value}
      onChange={onChange}
      style={{ flex: 1, padding: '10px', fontSize: '16px', width: '300px' }}
    />
  );
};

export default SearchBar;