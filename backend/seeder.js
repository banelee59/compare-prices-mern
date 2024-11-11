import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
    {
        name: "Tastic Rice 2kg",
        category: "groceries",
        description: "Premium grade long grain white rice",
        imageUrl: "https://www.shoprite.co.za/medias/10178453EA-checkers515Wx515H.jpg",
        prices: [
            { store: "Shoprite", price: 49.99 },
            { store: "Pick n Pay", price: 52.99 }
        ]
    },
    {
        name: "Ace Super Maize Meal 5kg",
        category: "groceries",
        description: "Super fine white maize meal",
        imageUrl: "https://www.shoprite.co.za/medias/10134876EA-checkers515Wx515H.jpg",
        prices: [
            { store: "Shoprite", price: 54.99 },
            { store: "Pick n Pay", price: 53.99 }
        ]
    }
    // Add more sample products as needed
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        await Product.deleteMany(); // Clear existing products
        await Product.insertMany(sampleProducts);
        
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        await Product.deleteMany();
        
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
} 