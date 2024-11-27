import express from 'express';
import Product from '../models/Product.js';

const router = express.Router()

// Get products with pagination, search, and category filter
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const search = req.query.search ? req.query.search.trim() : '';
        const category = req.query.category;

        // Build search query
        let searchQuery = {};

        if (search) {
            searchQuery = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { brand: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Add category filter if provided
        if (category) {
            searchQuery.category = category;
        }

        const skipIndex = (page - 1) * limit;

        // Find total number of filtered products
        const totalProducts = await Product.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalProducts / limit);

        // Retrieve filtered and paginated products
        const products = await Product.find(searchQuery)
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(limit)
            .skip(skipIndex)
            .exec();

        res.json({
            products,
            currentPage: page,
            totalPages,
            totalProducts,
            productsPerPage: limit
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default router;