import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);
        const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
        setProduct({
          ...detailsResponse.data,
          description: descriptionResponse.data.plain_text,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img src={product.pictures[0]?.url} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
