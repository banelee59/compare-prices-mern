import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get products by category
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    // Get single product
    getProduct: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    // Add sample products (for testing)
    addSampleProducts: async () => {
        try {
            const response = await axios.post(`${API_URL}/products/sample-data`);
            return response.data;
        } catch (error) {
            console.error('Error adding sample products:', error);
            throw error;
        }
    }
};

export default api; 