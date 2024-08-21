import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import logo from '../assets/logo_v2.png';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from React Icons

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${query}`);
  };

  return (
    <header className="search-header">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBox;
