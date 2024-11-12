import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    description: String,
    imageUrl: {
        type: String,
        required: false
    },
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
    }]
}, {
    timestamps: true  // This will add createdAt and updatedAt fields automatically
});

// Add an index to improve query performance
productSchema.index({ category: 1, subcategory: 1 });

export default mongoose.model('Product', productSchema); 