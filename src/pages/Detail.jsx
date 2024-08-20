// src/pages/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`/api/items/${id}`);
      setItem(data.item);
    };
    fetchItem();
  }, [id]);

  return (
    item ? (
      <div>
        <h1>{item.title}</h1>
        <img src={item.picture} alt={item.title} />
        <p>{item.price.amount} {item.price.currency}</p>
        <p>{item.description}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default Detail;
