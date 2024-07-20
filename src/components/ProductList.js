import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', company: '', priceRange: '', rating: '', availability: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching the products:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    filterProducts();
  };

  const filterProducts = () => {
    let filtered = products;
    if (filters.category) filtered = filtered.filter(product => product.category === filters.category);
    if (filters.company) filtered = filtered.filter(product => product.company === filters.company);
    if (filters.priceRange) filtered = filtered.filter(product => product.price <= parseFloat(filters.priceRange));
    if (filters.rating) filtered = filtered.filter(product => product.rating >= parseFloat(filters.rating));
    if (filters.availability) filtered = filtered.filter(product => product.availability === filters.availability);

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1>All Products</h1>
      <div>
        <label>Category: <input name="category" onChange={handleFilterChange} /></label>
        <label>Company: <input name="company" onChange={handleFilterChange} /></label>
        <label>Price Range: <input name="priceRange" onChange={handleFilterChange} /></label>
        <label>Rating: <input name="rating" onChange={handleFilterChange} /></label>
        <label>Availability: <input name="availability" onChange={handleFilterChange} /></label>
      </div>
      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <Link to={'/product/${product.id}'}>
              <h2>{product.name}</h2>
            </Link>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;