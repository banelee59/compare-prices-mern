export const up = async (db) => {
  // First, get all categories
  const categories = await db.collection('categories').find({}).toArray();
  
  const products = [];
  
  // Generate products for each category and subcategory
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      if (category.name === 'Groceries') {
        if (subcategory.name === 'Fresh Produce') {
          products.push(
            {
              name: "Fresh Carrots 1kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Fresh",
              description: "Fresh, locally sourced carrots",
              imageUrl: "https://example.com/carrots.jpg",
              prices: [
                { store: "Shoprite", price: 19.99 },
                { store: "Pick n Pay", price: 21.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Red Apples 1.5kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Fresh Pick",
              description: "Sweet and crispy red apples",
              imageUrl: "https://example.com/apples.jpg",
              prices: [
                { store: "Shoprite", price: 39.99 },
                { store: "Pick n Pay", price: 42.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        } else if (subcategory.name === 'Dairy & Eggs') {
          products.push(
            {
              name: "Fresh Full Cream Milk 2L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Clover",
              description: "Fresh full cream milk",
              imageUrl: "https://example.com/milk.jpg",
              prices: [
                { store: "Shoprite", price: 33.99 },
                { store: "Pick n Pay", price: 34.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Large Eggs 18 Pack",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Pride",
              description: "Farm fresh large eggs",
              imageUrl: "https://example.com/eggs.jpg",
              prices: [
                { store: "Shoprite", price: 69.99 },
                { store: "Pick n Pay", price: 72.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        }
      } else if (category.name === 'Electronics') {
        if (subcategory.name === 'Smartphones') {
          products.push(
            {
              name: "Samsung Galaxy A54",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Samsung",
              description: "6.4-inch display, 128GB storage",
              imageUrl: "https://example.com/galaxy-a54.jpg",
              prices: [
                { store: "Game", price: 7999.99 },
                { store: "Incredible Connection", price: 8199.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "iPhone 13",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Apple",
              description: "6.1-inch display, 128GB storage",
              imageUrl: "https://example.com/iphone-13.jpg",
              prices: [
                { store: "iStore", price: 14999.99 },
                { store: "Incredible Connection", price: 15299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        }
      } else if (category.name === 'Home & Garden') {
        if (subcategory.name === 'Furniture') {
          products.push(
            {
              name: "3-Seater Fabric Sofa",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Home Living",
              description: "Comfortable fabric sofa in grey",
              imageUrl: "https://example.com/sofa.jpg",
              prices: [
                { store: "House & Home", price: 5999.99 },
                { store: "Rochester", price: 6299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Coffee Table - Oak",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Woodworks",
              description: "Modern oak coffee table",
              imageUrl: "https://example.com/coffee-table.jpg",
              prices: [
                { store: "House & Home", price: 1999.99 },
                { store: "Rochester", price: 2199.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        }
      } else if (category.name === 'Health & Beauty') {
        if (subcategory.name === 'Skincare') {
          products.push(
            {
              name: "Nivea Face Moisturizer",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Nivea",
              description: "Daily moisturizing cream 50ml",
              imageUrl: "https://example.com/nivea.jpg",
              prices: [
                { store: "Clicks", price: 89.99 },
                { store: "Dis-Chem", price: 92.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Garnier Micellar Water",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Garnier",
              description: "Gentle makeup remover 400ml",
              imageUrl: "https://example.com/micellar.jpg",
              prices: [
                { store: "Clicks", price: 79.99 },
                { store: "Dis-Chem", price: 82.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        }
      }
    }
  }

  // Clear existing products
  await db.collection('products').deleteMany({});
  
  // Insert the sample products
  await db.collection('products').insertMany(products);
};

export const down = async (db) => {
  // Remove all seeded products
  await db.collection('products').deleteMany({});
}; 