import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: true });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  iconName: {
    type: String,
    required: true,
    trim: true
  },
  subcategories: [subcategorySchema]
});

// Add indexes for better query performance
categorySchema.index({ name: 1 });
categorySchema.index({ 'subcategories.name': 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category; 