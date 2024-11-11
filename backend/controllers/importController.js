import asyncHandler from 'express-async-handler';
import { readExcelFile } from '../utils/excelReader';
import path from 'path';

export const importHealthItems = asyncHandler(async (req, res) => {
    try {
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