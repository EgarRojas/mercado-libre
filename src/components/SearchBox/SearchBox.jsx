import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBox.css';
import logo from '../../assets/logo_v2.png';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${query}`);
  };

  const handleSelectItem = (id) => {
    setResults([]); // Clear search results
    navigate(`/item/${id}`); // Navigate to ProductDetails page
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        try {
          const { data } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
          const items = await Promise.all(
            data.results.slice(0, 10).map(async (item) => {
              const detailsResponse = await axios.get(`https://api.mercadolibre.com/items/${item.id}`);
              const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${item.id}/description`);
              return {
                ...item,
                price: detailsResponse.data.price,
                description: descriptionResponse.data.plain_text,
                picture: detailsResponse.data.pictures[0]?.url || item.thumbnail
              };
            })
          );
          setResults(items);
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
      {query.length > 2 && location.pathname === '/items' && (
        <div className="search-route-menu">
          <p>Producto > {query}</p>
        </div>
      )}
      {results.length > 0 && (
        <ul className="results-list">
          {results.map(item => (
            <li key={item.id} onClick={() => handleSelectItem(item.id)}>
              <img src={item.picture} alt={item.title} />
              <div className="item-info">
                <span className="item-price">
                  {item.price ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(item.price) : "Precio no disponible"}
                </span>
                <span className="item-title">{item.title || "Precio no disponible"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
