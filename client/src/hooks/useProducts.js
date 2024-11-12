import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const endpoint = category 
          ? `${API_URL}/products/category/${category}`
          : `${API_URL}/products`;
        
        const response = await axios.get(endpoint);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const addSampleProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/products/sample`);
      setProducts(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    getProductById,
    addSampleProducts
  };
}; 