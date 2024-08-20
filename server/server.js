// server/server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
// Helper function to format prices
const formatPrice = (price) => {
  return {
    currency: price.currency_id,
    amount: Math.floor(price.amount),
    decimals: Number((price.amount % 1).toFixed(2).split('.')[1]),
  };
};
// Endpoint to search for items
app.get('/api/items', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`);
    const items = response.data.results.map(item => ({
      id: item.id,
      title: item.title,
      price: formatPrice(item.price),
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));
    const categories = response.data.filters.find(filter => filter.id === 'category')?.values[0]?.path_from_root.map(cat => cat.name) || [];

    res.json({
      author: { name: 'YourName', lastname: 'YourLastName' },
      categories,
      items,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Endpoint to get details of a specific item
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);

    const item = {
      id: itemResponse.data.id,
      title: itemResponse.data.title,
      price: formatPrice(itemResponse.data.price),
      picture: itemResponse.data.thumbnail,
      condition: itemResponse.data.condition,
      free_shipping: itemResponse.data.shipping.free_shipping,
      sold_quantity: itemResponse.data.sold_quantity,
      description: descriptionResponse.data.plain_text,
    };

    res.json({
      author: { name: 'YourName', lastname: 'YourLastName' },
      item,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
