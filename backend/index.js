const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

const STRAPI_API_URL = 'http://localhost:1337';

app.post('/api/products', async (req, res) => {
    try {
      const response = await axios.post(`${STRAPI_API_URL}/api/products`, { data: req.body.data });
      res.status(201).json(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Error adding product' });
    }
    // console.log(req.body.data)
  })

// Endpoint to fetch products
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${STRAPI_API_URL}/api/products?populate=*`);
    res.json(response.data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch categories
app.get('/api/categories', async (req, res) => {
  try {
    const response = await axios.get(`${STRAPI_API_URL}/api/categories`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
