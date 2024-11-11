export const up = async (db) => {
  const sampleProducts = [
    {
      name: "Tastic Rice 2kg",
      category: "groceries",
      description: "Premium grade long grain white rice",
      imageUrl: "https://www.shoprite.co.za/medias/10178453EA-checkers515Wx515H.jpg",
      prices: [
        { store: "Shoprite", price: 49.99 },
        { store: "Pick n Pay", price: 52.99 }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ace Super Maize Meal 5kg",
      category: "groceries",
      description: "Super fine white maize meal",
      imageUrl: "https://www.shoprite.co.za/medias/10134876EA-checkers515Wx515H.jpg",
      prices: [
        { store: "Shoprite", price: 54.99 },
        { store: "Pick n Pay", price: 53.99 }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Insert the sample products
  await db.collection('products').insertMany(sampleProducts);
};

export const down = async (db) => {
  // Remove the seeded products
  await db.collection('products').deleteMany({
    name: {
      $in: [
        "Tastic Rice 2kg",
        "Ace Super Maize Meal 5kg"
      ]
    }
  });
}; 