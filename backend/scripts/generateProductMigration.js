import xlsx from 'xlsx';
import path from 'path';
import { promises as fs } from 'fs';
import { connectDB } from '../config/db.js';

async function generateProductMigration() {
    let db;
    try {
        // Connect to database
        db = await connectDB();

        // Read Excel file
        const filePath = path.join(process.cwd(), 'data', 'Health Items_Request.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const rawProducts = xlsx.utils.sheet_to_json(worksheet);
        
        // Transform data
        const products = rawProducts.map(item => ({
            name: item.name,
            category: item.category,
            subcategory: item.subcategory,
            brand: item.brand,
            description: item.description,
            imageUrl: item.imageUrl || 'https://example.com/placeholder.jpg',
            prices: [{
                store: item.store,
                price: parseFloat(item.price)
            }],
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Test database connection by inserting a test document
        await db.collection('products').insertOne({ test: true });
        await db.collection('products').deleteOne({ test: true });

        // Create migration content
        const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const migrationContent = `
import { connectDB } from '../config/db.js';

export const up = async (db) => {
    const products = ${JSON.stringify(products, null, 2)};
    
    // Insert products
    await db.collection('products').insertMany(products);
    
    console.log('Imported ${products.length} products');
};

export const down = async (db) => {
    // Remove the imported products
    await db.collection('products').deleteMany({});
    
    console.log('Removed imported products');
};
`;

        // Write migration file
        const migrationFileName = `${timestamp}-import-health-items.js`;
        const migrationPath = path.join(process.cwd(), 'migrations', migrationFileName);
        
        await fs.writeFile(migrationPath, migrationContent);
        
        console.log(`Created migration: ${migrationFileName}`);
        console.log(`Imported ${products.length} products`);
        
        process.exit(0);
    } catch (error) {
        console.error('Migration generation failed:', error);
        process.exit(1);
    }
}

generateProductMigration(); 