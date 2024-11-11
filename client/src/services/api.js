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

    // Get products by category with price comparison
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    // Get category statistics
    getCategoryStats: async (category) => {
        try {
            const products = await api.getProductsByCategory(category);
            const stats = {
                totalProducts: products.length,
                averageSavings: 0,
                bestDeals: []
            };

            // Calculate average savings and find best deals
            const productsWithSavings = products.map(product => {
                const prices = product.prices.map(p => p.price);
                const savings = Math.max(...prices) - Math.min(...prices);
                return { ...product, savings };
            });

            stats.averageSavings = productsWithSavings.reduce((acc, curr) => acc + curr.savings, 0) / products.length;
            stats.bestDeals = productsWithSavings.sort((a, b) => b.savings - a.savings).slice(0, 3);

            return stats;
        } catch (error) {
            console.error('Error calculating category stats:', error);
            throw error;
        }
    }
};

export default api; 