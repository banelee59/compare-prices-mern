import { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

const useProducts = ({ category, subcategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/products';
        const params = new URLSearchParams();
        
        if (category) {
          params.append('category', category);
        }
        if (subcategory) {
          params.append('subcategory', subcategory);
        }

        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }

        const response = await axiosInstance.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      } finally {
        console.log('Products fetched:', products);
      } 
    };

    fetchProducts();
  }, [category, subcategory]);

  return { products, loading, error };
};

export default useProducts;
