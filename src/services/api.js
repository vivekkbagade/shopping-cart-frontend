const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${API_URL}/cart`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
};

export const addToCart = async (productId) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId, quantity: 1 })
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return res.json();
};

export const removeFromCart = async (cartItemId) => {
  const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to remove from cart');
  return res.json();
};
