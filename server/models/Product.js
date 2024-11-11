const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
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
  }],
  description: String,
  imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);
