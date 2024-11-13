import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

const useCategoriesWithProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        const response = await axiosInstance.get('/categories/with-products');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories with products. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};

export default useCategoriesWithProducts; 