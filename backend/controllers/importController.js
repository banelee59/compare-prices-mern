import asyncHandler from 'express-async-handler';
import xlsx from 'xlsx';
import path from 'path';
import mongoose from 'mongoose';

export const importProducts = asyncHandler(async (req, res) => {
    try {
        // Read Excel file from backend folder
        const filePath = path.join(process.cwd(), 'Health Items_Request.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert Excel data to JSON
        const rawProducts = xlsx.utils.sheet_to_json(worksheet);
        
        // Get categories collection
        const db = mongoose.connection.db;
        const categories = await db.collection('categories').find({}).toArray();
        
        // Transform to match our product schema
        const excelPath = path.join(__dirname, '../data/Health Items_Request.xlsx');
        const products = await readExcelFile(excelPath);
        res.json({
            success: true,
            count: products.length,
            message: 'Health items imported successfully',
            data: products
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