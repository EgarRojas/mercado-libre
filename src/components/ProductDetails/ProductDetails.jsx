import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

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
        <div className="product-content">
            <div className="product-image-container">
            <img src={product.pictures[0]?.url} alt={product.title} className="product-image" />
            <p className="title-description">Descripcion del producto</p>
            <p className="product-description">{product.description}</p>
            </div>
            <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)}
            </p>
            <button className="buy-button">Comprar</button>
            </div>
        </div>
    </div>

  );
};

export default ProductDetails;
