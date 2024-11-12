import express from 'express';
import Product from '../models/Product.js';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            res.json(products);
        } else {
            res.json({ message: 'No products found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 