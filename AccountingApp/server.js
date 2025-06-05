const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(session({
  secret: 'ecommerce-secret',
  resave: false,
  saveUninitialized: true
}));

const products = [
  { id: 1, name: 'Cropped Hoodie', price: 120 },
  { id: 2, name: 'Straight-Cut Trousers', price: 98 },
  { id: 3, name: 'Layered Utility Jacket', price: 160 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(product);
  res.json(req.session.cart);
});

app.delete('/api/cart/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  if (isNaN(idx)) {
    return res.status(400).json({ error: 'Invalid index' });
  }
  if (req.session.cart) {
    req.session.cart.splice(idx, 1);
  }
  res.json(req.session.cart || []);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
