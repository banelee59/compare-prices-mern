import asyncHandler from 'express-async-handler';
import xlsx from 'xlsx';
import path from 'path';
import mongoose from 'mongoose';
import { paginateResults } from '../utils/pagination.js';

export const importProducts = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;

        // Read Excel file from backend folder
        const filePath = path.join(process.cwd(), 'data', 'Health Items_Request.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert Excel data to JSON
        const rawProducts = xlsx.utils.sheet_to_json(worksheet);
        
        // Get categories collection
        const db = mongoose.connection.db;
        const categories = await db.collection('categories').find({}).toArray();
        
        // Transform to match our product schema
        const products = rawProducts.map(item => {
            const category = categories.find(c => c.name === item.category);
            const subcategory = category?.subcategories.find(s => s.name === item.subcategory);
            
            return {
                name: item.name,
                category: category?._id,
                subcategory: subcategory?._id,
                brand: item.brand,
                description: item.description,
                imageUrl: item.imageUrl || 'https://example.com/placeholder.jpg',
                prices: [{
                    store: item.store,
                    price: parseFloat(item.price)
                }],
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        // Apply pagination
        const paginatedResults = paginateResults(products, page, limit);

        res.json({
            success: true,
            message: 'Products retrieved successfully',
            data: paginatedResults.items,
            pagination: paginatedResults.pagination
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const importController = {
    importHealthItems
};

export default importController; 