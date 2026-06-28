import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCart, addToCart, removeFromCart } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodsData, cartData] = await Promise.all([fetchProducts(), fetchCart()]);
      setProducts(prodsData);
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError('Could not load shop items or cart. Make sure backend is running!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (err) {
      alert('Error adding item to cart');
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (err) {
      alert('Error removing item from cart');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <header>
        <h1>YOGA CART</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-primary" onClick={loadData}>Refresh</button>
        </div>
      </header>

      <div className="container">
        {error && (
          <div style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgb(239, 68, 68)', borderRadius: '8px', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        <div className="products-section">
          <h2>Premium Products</h2>
          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading items...</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} className="product-img" />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-price-btn">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <button className="btn-primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-section">
          <h2>
            Shopping Cart
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </h2>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart-msg">Your cart is empty. Add some items to get started!</p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <button className="qty-btn" onClick={() => handleRemoveFromCart(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleAddToCart(item.product_id)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-total-section">
              <div className="cart-total-row">
                <span>Total:</span>
                <span className="price">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-primary btn-checkout" onClick={() => alert('Order Placed Successfully!')}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
