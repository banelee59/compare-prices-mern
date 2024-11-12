export const up = async (db) => {
  const categories = [
    {
      name: 'Groceries',
      iconName: 'shopping-cart',
      subcategories: [
        { name: 'Fresh Produce' },
        { name: 'Dairy & Eggs' },
        { name: 'Meat & Seafood' },
        { name: 'Bakery' },
        { name: 'Breakfast & Cereals' }
      ]
    },
    {
      name: 'Electronics',
      iconName: 'smartphone',
      subcategories: [
        { name: 'Smartphones' },
        { name: 'Laptops & Computers' },
        { name: 'TV & Audio' },
        { name: 'Gaming' },
        { name: 'Accessories' }
      ]
    },
    {
      name: 'Home & Garden',
      iconName: 'home',
      subcategories: [
        { name: 'Furniture' },
        { name: 'Garden & Outdoor' },
        { name: 'Kitchen & Dining' },
        { name: 'Home Decor' },
        { name: 'Storage & Organization' }
      ]
    },
    {
      name: 'Health & Beauty',
      iconName: 'heart',
      subcategories: [
        { name: 'Skincare' },
        { name: 'Hair Care' },
        { name: 'Makeup' },
        { name: 'Personal Care' },
        { name: 'Vitamins & Supplements' }
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