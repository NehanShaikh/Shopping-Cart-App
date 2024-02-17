// App.js

import React, { useState } from 'react';
import './App.css';

const products = [
  {
    id: 1,
    name: 'HP Laptop',
    image: 'product1.jpg',
    price: 20.99,
    rating: 4,
    category: 'Category A',
  },
  {
    id: 2,
    name: 'Lenovo Laptop',
    image: 'product2.jpg',
    price: 30.49,
    rating: 3.5,
    category: 'Category B',
  },
  // Add more products as needed
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const filterProducts = () => {
    let filteredProducts = products;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filteredProducts;
  };

  return (
    <div className="App">
      <nav>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <div className="categories">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="product-list">
        {filterProducts().map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Rating: {product.rating}</p>
              <div className="quantity-controls">
                <button onClick={() => decrementQuantity(product.id)}>
                  -
                </button>
                <span>{product.quantity || 1}</span>
                <button onClick={() => incrementQuantity(product.id)}>
                  +
                </button>
              </div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
