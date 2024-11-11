const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['groceries', 'electronics', 'fashion', 'home', 'health', 'dairy', 'bread_bakery', 'cereals', 'beverages', 'pantry']
    },
    brand: {
        type: String,
        required: false
    },
    description: String,
    prices: [{
        store: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }],
    subcategory: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Product', productSchema); 