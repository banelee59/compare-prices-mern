import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

export const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'subcategory',
          as: 'subcategoryProducts'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          iconName: 1,
          subcategories: 1,
          products: 1,
          subcategoryProducts: 1
        }
      }
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Get single category
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// Create a new category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, subcategories } = req.body;

  const category = new Category({
    name,
    subcategories
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// Update a category
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, subcategories } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.subcategories = subcategories || category.subcategories;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// Delete a category
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
}); 