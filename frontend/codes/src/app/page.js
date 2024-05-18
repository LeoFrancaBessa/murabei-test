"use client";

import SearchBar from './components/SearchBar';
import NormalButton from './components/NormalButton';
import BookList from './components/BookList';
import AddBookButton from './components/AddBookButton';
import AddBookModal from './components/AddBookModal';
import { useState } from 'react';
import styles from './styles/Home.module.css';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAuthorSearchClick = () => {
    setAuthor(searchText);
    setTitle(''); // Limpa o título para evitar conflitos
  };

  const handleTitleSearchClick = () => {
    setTitle(searchText);
    setAuthor(''); // Limpa o autor para evitar conflitos
  };

  const handleCleanSearchClick = () => {
    setTitle('');
    setAuthor('');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
        <title>Livraria São Luís</title>
        <meta name="description" content="Livraria São Luís - Pesquisa de livros" />
        <link rel="icon" href="/favicon.ico" />

        <main className={styles.main}>
        <h1 className={styles.title}>Livraria São Luís</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SearchBar value={searchText} onChange={handleSearchChange} />
          <NormalButton id="search-author-button" text="Pesquisar por Autor" onClick={handleAuthorSearchClick} />
          <NormalButton id="search-title-button" text="Pesquisar por Título" onClick={handleTitleSearchClick} />
          <NormalButton id="search-title-button" text="Limpar Filtros" onClick={handleCleanSearchClick} />
        </div>
        <AddBookButton onClick={openModal} />
        <BookList author={author} title={title} />
        <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
      </main>
    </div>
  );
}