import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import logo from '../assets/logo_v2.png';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${query}`);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        try {
          const { data } = await axios.get(`/api/items?q=${query}`);
          setResults(data.items);
          console.log(data.items)
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="search-container">
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
      {results.length > 0 && (
        <ul className="results-list">
          {results.map(item => (
            <li key={item.id}>
              <img src={item.picture} alt={item.title} />
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <span className="item-price">
                {item.price.amount || "Precio no disponible"}
                </span>
                <span className="item-description">
                  {item.description || "Descripción no disponible"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
