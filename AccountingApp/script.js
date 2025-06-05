async function addToCart(id) {
  await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: id })
  });
  alert('Added to cart');
}

async function renderCart() {
  const res = await fetch('/api/cart');
  const cart = await res.json();
  const container = document.getElementById('cart');
  const totalEl = document.getElementById('total');
  container.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
    container.appendChild(el);
  });
  totalEl.innerText = 'Total: $' + total;
}

async function removeFromCart(index) {
  await fetch(`/api/cart/${index}`, { method: 'DELETE' });
  renderCart();
}

async function fetchProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const container = document.getElementById('products');
  if (!container) return;
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `\
      <img src="https://via.placeholder.com/300x400" alt="${p.name}" />\
      <h3>${p.name}</h3>\
      <p>$${p.price}</p>\
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>`;
    container.appendChild(card);
  });
}

if (document.getElementById('cart')) {
  renderCart();
}

if (document.getElementById('products')) {
  fetchProducts();
}
