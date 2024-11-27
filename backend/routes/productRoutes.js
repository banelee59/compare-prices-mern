import express from 'express';
import Product from '../models/Product.js';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

const router = express.Router()

// Get products with pagination
router.get('/', async (req, res) => {
    try {
        // Default values if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = 50

        // Calculate skip value
        const skipIndex = (page - 1) * limit;

        // Find total number of products
        const totalProducts = await Product.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / limit);

        // Retrieve paginated products
        const products = await Product.find()
            .limit(limit)
            .skip(skipIndex)
            .exec();

        // Prepare response
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
})

export default router