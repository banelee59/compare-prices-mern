import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

function ServicesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProductsByCategory(category);
        setProducts(data);
        setError(null);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const loadSampleData = async () => {
    try {
      await api.addSampleProducts();
      alert('Sample products loaded successfully!');
    } catch (error) {
      alert('Error loading sample products');
    }
  };

  return (
    <div>
      {/* Add this button somewhere in your JSX */}
      <button 
        onClick={loadSampleData}
        className="btn btn-secondary mt-4"
      >
        Load Sample Products
      </button>
    </div>
  );
}

export default ServicesPage; 