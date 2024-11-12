import Product from '../models/Product.js';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single product
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add sample products
export const addSampleProducts = async (req, res) => {
    try {
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
            // Add more sample products here
        ];

        await Product.deleteMany({});
        const products = await Product.insertMany(sampleProducts);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 