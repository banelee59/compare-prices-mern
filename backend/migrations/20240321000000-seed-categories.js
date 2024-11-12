import { ObjectId } from 'mongodb';

export const up = async (db) => {
  const categories = [
    {
      name: 'Groceries',
      iconName: 'shopping-cart',
      subcategories: [
        { _id: new ObjectId(), name: 'Fresh Produce' },
        { _id: new ObjectId(), name: 'Dairy & Eggs' },
        { _id: new ObjectId(), name: 'Meat & Seafood' },
        { _id: new ObjectId(), name: 'Bakery' },
        { _id: new ObjectId(), name: 'Breakfast & Cereals' }
      ]
    },
    {
      name: 'Electronics',
      iconName: 'smartphone',
      subcategories: [
        { _id: new ObjectId(), name: 'Smartphones' },
        { _id: new ObjectId(), name: 'Laptops & Computers' },
        { _id: new ObjectId(), name: 'TV & Audio' },
        { _id: new ObjectId(), name: 'Gaming' },
        { _id: new ObjectId(), name: 'Accessories' }
      ]
    },
    {
      name: 'Home & Garden',
      iconName: 'home',
      subcategories: [
        { _id: new ObjectId(), name: 'Furniture' },
        { _id: new ObjectId(), name: 'Garden & Outdoor' },
        { _id: new ObjectId(), name: 'Kitchen & Dining' },
        { _id: new ObjectId(), name: 'Home Decor' },
        { _id: new ObjectId(), name: 'Storage & Organization' }
      ]
    },
    {
      name: 'Health & Beauty',
      iconName: 'heart',
      subcategories: [
        { _id: new ObjectId(), name: 'Skincare' },
        { _id: new ObjectId(), name: 'Hair Care' },
        { _id: new ObjectId(), name: 'Makeup' },
        { _id: new ObjectId(), name: 'Personal Care' },
        { _id: new ObjectId(), name: 'Vitamins & Supplements' }
      ]
    }
  ];

  // Clear existing categories
  await db.collection('categories').deleteMany({});
  
  // Insert new categories
  return db.collection('categories').insertMany(categories);
};

export const down = async (db) => {
  // Revert the changes
  return db.collection('categories').deleteMany({});
}; 