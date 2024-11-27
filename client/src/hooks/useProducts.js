import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

export const useProducts = (page = 1, search = '', category = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    productsPerPage: 50
  });

  // Move fetchProducts outside useEffect
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page);
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const response = await axiosInstance.get(`/api/products?${params.toString()}`);
      
      setProducts(response.data.products);
      setPaginationData({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts,
        productsPerPage: response.data.productsPerPage
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setPaginationData({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        productsPerPage: 50
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add a small delay to prevent rapid API calls
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, search, category]);

  const refetch = () => {
    setLoading(true);
    fetchProducts();
  };

  return { 
    products, 
    loading, 
    error, 
    pagination: paginationData,
    hasNextPage: paginationData.currentPage < paginationData.totalPages,
    hasPreviousPage: paginationData.currentPage > 1,
    refetch
  };
};
