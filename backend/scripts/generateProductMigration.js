import xlsx from 'xlsx';
import path from 'path';
import { promises as fs } from 'fs';
import { connectDB } from '../config/db.js';
import { paginateResults } from '../utils/pagination.js';

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

        // Create paginated migrations
        const totalPages = Math.ceil(products.length / 50);
        
        for (let page = 1; page <= totalPages; page++) {
            const paginatedData = paginateResults(products, page, 50);
            
            const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
            const migrationContent = `
export const up = async (db) => {
    const products = ${JSON.stringify(paginatedData.items, null, 2)};
    
    // Insert products
    await db.collection('products').insertMany(products);
    
    console.log('Imported ${paginatedData.items.length} products (Page ${page}/${totalPages})');
};

export const down = async (db) => {
    // Remove the imported products from this batch
    const productNames = ${JSON.stringify(paginatedData.items.map(p => p.name))};
    await db.collection('products').deleteMany({ name: { $in: productNames } });
    
    console.log('Removed products from page ${page}');
};`;

            const migrationFileName = `${timestamp}-import-health-items-page-${page}.js`;
            const migrationPath = path.join(process.cwd(), 'migrations', migrationFileName);
            
            await fs.writeFile(migrationPath, migrationContent);
            console.log(`Created migration for page ${page}: ${migrationFileName}`);
        }
        
        console.log(`Created ${totalPages} migration files`);
        process.exit(0);
    } catch (error) {
        console.error('Migration generation failed:', error);
        process.exit(1);
    }
}

generateProductMigration(); 