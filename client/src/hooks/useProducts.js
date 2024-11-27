import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

export const useProducts = (page = 1) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    productsPerPage: 50
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/products?page=${page}`);
        
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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { 
    products, 
    loading, 
    error, 
    pagination: paginationData,
    hasNextPage: paginationData.currentPage < paginationData.totalPages,
    hasPreviousPage: paginationData.currentPage > 1
  };
};
