import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

const useCategory = (categoryId) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (categoryId) {
          // Fetch single category if ID is provided
          const response = await axiosInstance.get(`/categories/${categoryId}`);
          setCategory(response.data);
        } else {
          // Fetch all categories if no ID is provided
          const response = await axiosInstance.get('/categories');
          setCategories(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId]);

  // CRUD operations
  const createCategory = async (categoryData) => {
    try {
      const response = await axiosInstance.post('/categories', categoryData);
      setCategories(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create category');
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, categoryData);
      setCategories(prev => 
        prev.map(cat => cat._id === id ? response.data : cat)
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update category');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      setCategories(prev => prev.filter(cat => cat._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete category');
    }
  };

  return {
    categories,
    category,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory
  };
};

export default useCategory; 