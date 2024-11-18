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
            },
            {
              name: "Bananas 1kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Fresh Pick",
              description: "Ripe yellow bananas",
              imageUrl: "https://example.com/bananas.jpg",
              prices: [
                { store: "Shoprite", price: 24.99 },
                { store: "Pick n Pay", price: 26.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Tomatoes 1kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Fresh",
              description: "Fresh red tomatoes",
              imageUrl: "https://example.com/tomatoes.jpg",
              prices: [
                { store: "Shoprite", price: 29.99 },
                { store: "Pick n Pay", price: 31.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Potatoes 2kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Fresh",
              description: "Fresh potatoes",
              imageUrl: "https://example.com/potatoes.jpg",
              prices: [
                { store: "Shoprite", price: 34.99 },
                { store: "Pick n Pay", price: 36.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Onions 1kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Fresh",
              description: "Fresh brown onions",
              imageUrl: "https://example.com/onions.jpg",
              prices: [
                { store: "Shoprite", price: 22.99 },
                { store: "Pick n Pay", price: 24.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Cucumber 500g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Fresh Pick",
              description: "Fresh green cucumbers",
              imageUrl: "https://example.com/cucumber.jpg",
              prices: [
                { store: "Shoprite", price: 15.99 },
                { store: "Pick n Pay", price: 17.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Lettuce Head",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Fresh Pick",
              description: "Fresh crispy lettuce",
              imageUrl: "https://example.com/lettuce.jpg",
              prices: [
                { store: "Shoprite", price: 18.99 },
                { store: "Pick n Pay", price: 20.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Bell Peppers Mix 500g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Fresh",
              description: "Mixed color bell peppers",
              imageUrl: "https://example.com/bellpeppers.jpg",
              prices: [
                { store: "Shoprite", price: 32.99 },
                { store: "Pick n Pay", price: 34.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Sweet Corn 4 Pack",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Fresh",
              description: "Fresh sweet corn cobs",
              imageUrl: "https://example.com/sweetcorn.jpg",
              prices: [
                { store: "Shoprite", price: 28.99 },
                { store: "Pick n Pay", price: 30.99 }
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
            },
            {
              name: "Cheddar Cheese 400g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Clover",
              description: "Mature cheddar cheese",
              imageUrl: "https://example.com/cheddar.jpg",
              prices: [
                { store: "Shoprite", price: 89.99 },
                { store: "Pick n Pay", price: 92.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Plain Yogurt 1kg",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Parmalat",
              description: "Creamy plain yogurt",
              imageUrl: "https://example.com/yogurt.jpg",
              prices: [
                { store: "Shoprite", price: 42.99 },
                { store: "Pick n Pay", price: 44.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Butter 500g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Clover",
              description: "Salted butter",
              imageUrl: "https://example.com/butter.jpg",
              prices: [
                { store: "Shoprite", price: 79.99 },
                { store: "Pick n Pay", price: 82.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Cream Cheese 230g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Philadelphia",
              description: "Original cream cheese",
              imageUrl: "https://example.com/creamcheese.jpg",
              prices: [
                { store: "Shoprite", price: 54.99 },
                { store: "Pick n Pay", price: 56.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Low Fat Milk 2L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Clover",
              description: "2% low fat milk",
              imageUrl: "https://example.com/lowfatmilk.jpg",
              prices: [
                { store: "Shoprite", price: 32.99 },
                { store: "Pick n Pay", price: 34.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Mozzarella 250g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Parmalat",
              description: "Shredded mozzarella cheese",
              imageUrl: "https://example.com/mozzarella.jpg",
              prices: [
                { store: "Shoprite", price: 64.99 },
                { store: "Pick n Pay", price: 66.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Greek Yogurt 500g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Danone",
              description: "Plain Greek yogurt",
              imageUrl: "https://example.com/greekyogurt.jpg",
              prices: [
                { store: "Shoprite", price: 44.99 },
                { store: "Pick n Pay", price: 46.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Free Range Eggs 12 Pack",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Farm Pride",
              description: "Free range large eggs",
              imageUrl: "https://example.com/freerangeeggs.jpg",
              prices: [
                { store: "Shoprite", price: 59.99 },
                { store: "Pick n Pay", price: 62.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        } else if (subcategory.name === 'Meat & Seafood') {
          products.push(
            {
              name: "Coca-Cola 2L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Coca-Cola",
              description: "Classic carbonated soft drink",
              imageUrl: "https://example.com/coke.jpg",
              prices: [
                { store: "Shoprite", price: 24.99 },
                { store: "Pick n Pay", price: 25.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Nescafe Gold 200g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Nescafe",
              description: "Premium instant coffee",
              imageUrl: "https://example.com/nescafe.jpg",
              prices: [
                { store: "Shoprite", price: 129.99 },
                { store: "Pick n Pay", price: 132.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Rooibos Tea 100 Bags",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Five Roses",
              description: "Pure rooibos tea bags",
              imageUrl: "https://example.com/rooibos.jpg",
              prices: [
                { store: "Shoprite", price: 49.99 },
                { store: "Pick n Pay", price: 52.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Sprite 2L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Coca-Cola",
              description: "Lemon-lime carbonated drink",
              imageUrl: "https://example.com/sprite.jpg",
              prices: [
                { store: "Shoprite", price: 23.99 },
                { store: "Pick n Pay", price: 24.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Orange Juice 1L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Clover",
              description: "100% pure orange juice",
              imageUrl: "https://example.com/orange-juice.jpg",
              prices: [
                { store: "Shoprite", price: 34.99 },
                { store: "Pick n Pay", price: 36.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Still Water 6x1L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Bonaqua",
              description: "Pure still water pack",
              imageUrl: "https://example.com/water.jpg",
              prices: [
                { store: "Shoprite", price: 44.99 },
                { store: "Pick n Pay", price: 46.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Energy Drink 6x250ml",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Red Bull",
              description: "Energy drink pack",
              imageUrl: "https://example.com/redbull.jpg",
              prices: [
                { store: "Shoprite", price: 129.99 },
                { store: "Pick n Pay", price: 134.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Apple Juice 1L",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Liqui-Fruit",
              description: "100% pure apple juice",
              imageUrl: "https://example.com/apple-juice.jpg",
              prices: [
                { store: "Shoprite", price: 32.99 },
                { store: "Pick n Pay", price: 34.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Green Tea 80 Bags",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Tetley",
              description: "Pure green tea bags",
              imageUrl: "https://example.com/green-tea.jpg",
              prices: [
                { store: "Shoprite", price: 59.99 },
                { store: "Pick n Pay", price: 62.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Hot Chocolate 400g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Cadbury",
              description: "Rich hot chocolate powder",
              imageUrl: "https://example.com/hot-chocolate.jpg",
              prices: [
                { store: "Shoprite", price: 69.99 },
                { store: "Pick n Pay", price: 72.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        } else if (subcategory.name === 'Snacks & Sweets') {
          products.push(
            {
              name: "Potato Chips 150g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Simba",
              description: "Classic salted chips",
              imageUrl: "https://example.com/chips.jpg",
              prices: [
                { store: "Shoprite", price: 24.99 },
                { store: "Pick n Pay", price: 26.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Chocolate Bar 80g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Cadbury",
              description: "Dairy milk chocolate",
              imageUrl: "https://example.com/chocolate.jpg",
              prices: [
                { store: "Shoprite", price: 19.99 },
                { store: "Pick n Pay", price: 21.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Mixed Nuts 500g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Safari",
              description: "Roasted mixed nuts",
              imageUrl: "https://example.com/nuts.jpg",
              prices: [
                { store: "Shoprite", price: 89.99 },
                { store: "Pick n Pay", price: 92.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Jelly Beans 200g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Wilson's",
              description: "Assorted jelly beans",
              imageUrl: "https://example.com/jellybeans.jpg",
              prices: [
                { store: "Shoprite", price: 29.99 },
                { store: "Pick n Pay", price: 31.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Popcorn Kernels 500g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Act II",
              description: "Microwave popcorn",
              imageUrl: "https://example.com/popcorn.jpg",
              prices: [
                { store: "Shoprite", price: 44.99 },
                { store: "Pick n Pay", price: 46.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Biscuits Pack 200g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Bakers",
              description: "Tennis biscuits",
              imageUrl: "https://example.com/biscuits.jpg",
              prices: [
                { store: "Shoprite", price: 26.99 },
                { store: "Pick n Pay", price: 28.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Marshmallows 150g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Manhattan",
              description: "Pink and white marshmallows",
              imageUrl: "https://example.com/marshmallows.jpg",
              prices: [
                { store: "Shoprite", price: 22.99 },
                { store: "Pick n Pay", price: 24.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Dried Fruit Mix 400g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Safari",
              description: "Mixed dried fruits",
              imageUrl: "https://example.com/dried-fruit.jpg",
              prices: [
                { store: "Shoprite", price: 64.99 },
                { store: "Pick n Pay", price: 66.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Chocolate Cookies 180g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Oreo",
              description: "Chocolate sandwich cookies",
              imageUrl: "https://example.com/cookies.jpg",
              prices: [
                { store: "Shoprite", price: 32.99 },
                { store: "Pick n Pay", price: 34.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Pretzels 300g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Snackers",
              description: "Salted pretzels",
              imageUrl: "https://example.com/pretzels.jpg",
              prices: [
                { store: "Shoprite", price: 39.99 },
                { store: "Pick n Pay", price: 41.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        } else if (subcategory.name === 'Canned Foods') {
          products.push(
            {
              name: "Baked Beans 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Baked beans in tomato sauce",
              imageUrl: "https://example.com/beans.jpg",
              prices: [
                { store: "Shoprite", price: 19.99 },
                { store: "Pick n Pay", price: 21.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Tuna Chunks 170g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Lucky Star",
              description: "Tuna chunks in brine",
              imageUrl: "https://example.com/tuna.jpg",
              prices: [
                { store: "Shoprite", price: 29.99 },
                { store: "Pick n Pay", price: 31.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Sweet Corn 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Whole kernel corn",
              imageUrl: "https://example.com/canned-corn.jpg",
              prices: [
                { store: "Shoprite", price: 22.99 },
                { store: "Pick n Pay", price: 24.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Peach Halves 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Peach halves in syrup",
              imageUrl: "https://example.com/peaches.jpg",
              prices: [
                { store: "Shoprite", price: 32.99 },
                { store: "Pick n Pay", price: 34.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Pilchards 400g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Lucky Star",
              description: "Pilchards in tomato sauce",
              imageUrl: "https://example.com/pilchards.jpg",
              prices: [
                { store: "Shoprite", price: 24.99 },
                { store: "Pick n Pay", price: 26.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Mixed Vegetables 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Mixed vegetables in brine",
              imageUrl: "https://example.com/mixed-veg.jpg",
              prices: [
                { store: "Shoprite", price: 26.99 },
                { store: "Pick n Pay", price: 28.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Chakalaka 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Spicy vegetable relish",
              imageUrl: "https://example.com/chakalaka.jpg",
              prices: [
                { store: "Shoprite", price: 24.99 },
                { store: "Pick n Pay", price: 26.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Tomato & Onion Mix 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Diced tomato and onion mix",
              imageUrl: "https://example.com/tomato-onion.jpg",
              prices: [
                { store: "Shoprite", price: 21.99 },
                { store: "Pick n Pay", price: 23.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Fruit Cocktail 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Mixed fruit in syrup",
              imageUrl: "https://example.com/fruit-cocktail.jpg",
              prices: [
                { store: "Shoprite", price: 34.99 },
                { store: "Pick n Pay", price: 36.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Baked Beans Curry 410g",
              category: category._id,
              subcategory: subcategory._id,
              brand: "KOO",
              description: "Curry flavored baked beans",
              imageUrl: "https://example.com/curry-beans.jpg",
              prices: [
                { store: "Shoprite", price: 21.99 },
                { store: "Pick n Pay", price: 23.99 }
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
            },
            {
              name: "Xiaomi Redmi Note 12",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Xiaomi",
              description: "6.67-inch display, 128GB storage",
              imageUrl: "https://example.com/redmi-note-12.jpg",
              prices: [
                { store: "Game", price: 4999.99 },
                { store: "Incredible Connection", price: 5199.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Huawei P60 Pro",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Huawei",
              description: "6.67-inch display, 256GB storage",
              imageUrl: "https://example.com/p60-pro.jpg",
              prices: [
                { store: "Game", price: 19999.99 },
                { store: "Incredible Connection", price: 20499.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Google Pixel 7",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Google",
              description: "6.3-inch display, 128GB storage",
              imageUrl: "https://example.com/pixel-7.jpg",
              prices: [
                { store: "Game", price: 13999.99 },
                { store: "Incredible Connection", price: 14299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "OnePlus 11",
              category: category._id,
              subcategory: subcategory._id,
              brand: "OnePlus",
              description: "6.7-inch display, 256GB storage",
              imageUrl: "https://example.com/oneplus-11.jpg",
              prices: [
                { store: "Game", price: 16999.99 },
                { store: "Incredible Connection", price: 17499.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Samsung Galaxy S23",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Samsung",
              description: "6.1-inch display, 256GB storage",
              imageUrl: "https://example.com/galaxy-s23.jpg",
              prices: [
                { store: "Game", price: 21999.99 },
                { store: "Incredible Connection", price: 22499.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "iPhone 14 Pro",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Apple",
              description: "6.1-inch display, 256GB storage",
              imageUrl: "https://example.com/iphone-14-pro.jpg",
              prices: [
                { store: "iStore", price: 23999.99 },
                { store: "Incredible Connection", price: 24499.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Oppo Reno 8",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Oppo",
              description: "6.4-inch display, 128GB storage",
              imageUrl: "https://example.com/reno-8.jpg",
              prices: [
                { store: "Game", price: 9999.99 },
                { store: "Incredible Connection", price: 10299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Motorola Edge 40",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Motorola",
              description: "6.55-inch display, 256GB storage",
              imageUrl: "https://example.com/edge-40.jpg",
              prices: [
                { store: "Game", price: 12999.99 },
                { store: "Incredible Connection", price: 13499.99 }
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
            },
            {
              name: "6-Seater Dining Set",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Woodworks",
              description: "Wooden dining table with 6 chairs",
              imageUrl: "https://example.com/dining-set.jpg",
              prices: [
                { store: "House & Home", price: 8999.99 },
                { store: "Rochester", price: 9299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Queen Size Bed Frame",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Sleep King",
              description: "Modern queen size bed frame",
              imageUrl: "https://example.com/bed-frame.jpg",
              prices: [
                { store: "House & Home", price: 4999.99 },
                { store: "Rochester", price: 5299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Wardrobe - 3 Door",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Home Living",
              description: "Spacious 3-door wardrobe",
              imageUrl: "https://example.com/wardrobe.jpg",
              prices: [
                { store: "House & Home", price: 7999.99 },
                { store: "Rochester", price: 8299.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "TV Stand - Modern",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Home Living",
              description: "Modern TV stand with storage",
              imageUrl: "https://example.com/tv-stand.jpg",
              prices: [
                { store: "House & Home", price: 2999.99 },
                { store: "Rochester", price: 3199.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Office Desk",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Woodworks",
              description: "Computer desk with drawers",
              imageUrl: "https://example.com/office-desk.jpg",
              prices: [
                { store: "House & Home", price: 3499.99 },
                { store: "Rochester", price: 3699.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Bookshelf - 5 Tier",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Home Living",
              description: "5-tier wooden bookshelf",
              imageUrl: "https://example.com/bookshelf.jpg",
              prices: [
                { store: "House & Home", price: 2499.99 },
                { store: "Rochester", price: 2699.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Recliner Chair",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Comfort Plus",
              description: "Leather recliner chair",
              imageUrl: "https://example.com/recliner.jpg",
              prices: [
                { store: "House & Home", price: 4499.99 },
                { store: "Rochester", price: 4799.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              name: "Side Table Set",
              category: category._id,
              subcategory: subcategory._id,
              brand: "Woodworks",
              description: "Set of 2 wooden side tables",
              imageUrl: "https://example.com/side-tables.jpg",
              prices: [
                { store: "House & Home", price: 1499.99 },
                { store: "Rochester", price: 1699.99 }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          );
        }
      }
      // Continue with other categories and their subcategories...
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