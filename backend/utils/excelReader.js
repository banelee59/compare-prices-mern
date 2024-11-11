const XLSX = require('xlsx');
const Product = require('../models/Product');

const readExcelFile = async (filePath) => {
    try {
        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert Excel data to JSON
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        // Transform data to match our Product model
        const formattedProducts = rawData.map(item => ({
            name: item['Item Name'] || item['Name'],
            category: 'health',  // Setting default category as health
            description: item['Description'] || `${item['Item Name']} - Health Product`,
            imageUrl: item['Image URL'] || 'default-health-product.jpg',
            prices: [
                {
                    store: "Shoprite",
                    price: parseFloat(item['Shoprite Price']) || 0,
                    lastUpdated: new Date()
                },
                {
                    store: "Pick n Pay",
                    price: parseFloat(item['Pick n Pay Price']) || 0,
                    lastUpdated: new Date()
                }
            ]
        }));

        // Save to database
        await Product.deleteMany({ category: 'health' }); // Clear existing health products
        await Product.insertMany(formattedProducts);
        
        console.log(`${formattedProducts.length} health products imported successfully`);
        return formattedProducts;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
    }
};

module.exports = { readExcelFile }; 