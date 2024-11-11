const { readExcelFile } = require('../utils/excelReader');
const path = require('path');

const importHealthItems = async (req, res) => {
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
};

module.exports = {
    importHealthItems
}; 