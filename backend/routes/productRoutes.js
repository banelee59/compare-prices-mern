const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Import health items from Excel
router.post('/import-health', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'Health Items_Request.xlsx');
        console.log('Current directory:', __dirname);
        console.log('Attempting to read file from:', filePath);
        console.log('File exists:', fs.existsSync(filePath));

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return res.status(404).json({
                success: false,
                error: 'Excel file not found',
                path: filePath
            });
        }

        // Read Excel file
        const workbook = xlsx.readFile(filePath, { type: 'file' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        if (!data || data.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No data found in Excel file'
            });
        }

        console.log('Processing Excel data:', data[0]); // Log first row for debugging

        const products = [];

        for (const item of data) {
            // Log each item for debugging
            console.log('Processing item:', item);

            const product = {
                name: item['Item Name'] || item['Name'] || '',
                category: 'health',
                description: item['Description'] || '',
                prices: []
            };

            // Add Shoprite price
            const shopritePrice = parseFloat(item['Shoprite Price'] || item['ShopRite']);
            if (!isNaN(shopritePrice)) {
                product.prices.push({
                    store: 'Shoprite',
                    price: shopritePrice,
                    lastUpdated: new Date()
                });
            }

            // Add Pick n Pay price
            const pnpPrice = parseFloat(item['Pick n Pay Price'] || item['Pick n Pay']);
            if (!isNaN(pnpPrice)) {
                product.prices.push({
                    store: 'Pick n Pay',
                    price: pnpPrice,
                    lastUpdated: new Date()
                });
            }

            if (product.name && product.prices.length > 0) {
                products.push(product);
            }
        }

        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No valid products found in Excel file'
            });
        }

        // Save to database
        await Product.deleteMany({ category: 'health' });
        const savedProducts = await Product.insertMany(products);

        res.json({
            success: true,
            count: savedProducts.length,
            data: savedProducts
        });

    } catch (error) {
        console.error('Import error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

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

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        if (products.length > 0) {
            res.json(products);
        } else {
            res.json({ message: `No products found in category: ${req.params.category}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 