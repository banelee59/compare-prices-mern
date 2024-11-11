const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add sample products route
router.post('/sample-data', async (req, res) => {
  try {
    const sampleProducts = [
      // Groceries
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
      },
      
      // Electronics
      {
        name: "Samsung Galaxy A54",
        category: "electronics",
        description: "128GB, Awesome Graphite",
        imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/za/sm-a546ezakafa/gallery/za-galaxy-a54-5g-sm-a546-sm-a546ezakafa-thumb-535856569",
        prices: [
          { store: "Takealot", price: 8499.00 },
          { store: "Game", price: 8699.00 }
        ]
      },
      {
        name: "LG 55\" UHD 4K TV",
        category: "electronics",
        description: "55 inch Smart UHD 4K TV",
        imageUrl: "https://www.lg.com/za/images/tvs/md07529605/gallery/medium01.jpg",
        prices: [
          { store: "Makro", price: 9999.00 },
          { store: "Game", price: 10499.00 }
        ]
      },

      // Fashion
      {
        name: "Nike Air Max",
        category: "fashion",
        description: "Men's Running Shoes",
        imageUrl: "https://static.nike.com/a/images/t_default/ouweg5dax4ysdxpf2zle/air-max-90-shoes-mnCmVT.png",
        prices: [
          { store: "Sportscene", price: 2299.00 },
          { store: "Total Sports", price: 2399.00 }
        ]
      },
      {
        name: "Levi's 501 Original",
        category: "fashion",
        description: "Men's Straight Fit Jeans",
        imageUrl: "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp",
        prices: [
          { store: "Woolworths", price: 999.00 },
          { store: "Edgars", price: 1099.00 }
        ]
      },

      // Home & Garden
      {
        name: "Weber Master-Touch Kettle Braai",
        category: "home",
        description: "57cm Charcoal Grill",
        imageUrl: "https://www.weber.com/za/en/product-assets/master-touch-gbs-e-5750/Master-Touch-GBS-E-5750.png",
        prices: [
          { store: "Builders", price: 4999.00 },
          { store: "Game", price: 5299.00 }
        ]
      },
      {
        name: "Bosch Cordless Drill",
        category: "home",
        description: "18V Lithium-Ion Drill/Driver Kit",
        imageUrl: "https://www.bosch-professional.com/za/en/products/gsr-18v-50-06019H5000",
        prices: [
          { store: "Builders", price: 1999.00 },
          { store: "Makro", price: 2099.00 }
        ]
      }
    ];

    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(sampleProducts);
    
    res.json({ message: 'Sample products added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
