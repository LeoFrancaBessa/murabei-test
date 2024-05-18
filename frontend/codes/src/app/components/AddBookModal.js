import React, { useState } from 'react';
import NormalButton from './NormalButton';
import styles from '../styles/Home.module.css';

const AddBookModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    author_bio: '',
    authors: '',
    publisher: '',
    synopsis: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Livro cadastrado com sucesso!');
        onClose();
      } else {
        alert('Erro ao cadastrar o livro.');
      }
    } catch (error) {
      console.error('Erro ao salvar o livro:', error);
      alert('Erro ao cadastrar o livro.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={modalTitleStyle}>Cadastrar Livro</h2>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Autor:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Biografia do Autor:</label>
          <textarea
            name="author_bio"
            value={formData.author_bio}
            onChange={handleChange}
            style={textareaStyle}
          ></textarea>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Autores:</label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Editora:</label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Sinopse:</label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            style={textareaStyle}
          ></textarea>
        </div>
        <div style={buttonContainerStyle}>
          <NormalButton text="Salvar Livro" onClick={handleSave} />
          <NormalButton text="Fechar" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto'
};

const modalTitleStyle = {
  marginBottom: '20px',
  fontSize: '24px',
  textAlign: 'center'
};

const formGroupStyle = {
  marginBottom: '15px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const textareaStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc',
  minHeight: '80px'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px'
};

export default AddBookModal;