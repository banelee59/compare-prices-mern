import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

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

const Category = mongoose.model('Category', categorySchema);

export default Category; 