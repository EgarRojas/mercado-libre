// src/pages/Results.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search).get('search');
      const { data } = await axios.get(`/api/items?q=${query}`);
      setResults(data.items);
    };
    fetchResults();
  }, [location.search]);

  return (
    <div>
      {results.map(item => (
        <div key={item.id}>
          <a href={`/items/${item.id}`}>{item.title}</a>
          <p>{item.price.amount} {item.price.currency}</p>
          <img src={item.picture} alt={item.title} />
        </div>
      ))}
    </div>
  );
};

export default Results;
