import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  // Extended product list for each category
  const categoryProducts = {
    groceries: [
      {
        name: "Clover Full Cream Milk Fresh 2L",
        originalPrice: 36.99,
        salePrice: 31.99,
        store: "Pick n Pay"
      },
      {
        name: "Albany Superior White Bread 700g",
        originalPrice: 19.99,
        salePrice: 17.99,
        store: "Shoprite"
      },
      // Add more grocery items
      {
        name: "Jungle Oats 1kg",
        originalPrice: 45.99,
        salePrice: 39.99,
        store: "Checkers"
      },
      {
        name: "Nescafe Classic Coffee 200g",
        originalPrice: 89.99,
        salePrice: 79.99,
        store: "Pick n Pay"
      },
      {
        name: "Tastic Rice 2kg",
        originalPrice: 49.99,
        salePrice: 45.99,
        store: "Shoprite"
      }
    ],
    electronics: [
      {
        name: "Samsung 55\" Smart TV",
        originalPrice: 9999.99,
        salePrice: 8499.99,
        store: "Game"
      },
      {
        name: "JBL Bluetooth Speaker",
        originalPrice: 1299.99,
        salePrice: 999.99,
        store: "Makro"
      },
      // Add more electronics
      {
        name: "Sony PlayStation 5",
        originalPrice: 11999.99,
        salePrice: 10999.99,
        store: "Game"
      },
      {
        name: "Apple iPhone 13",
        originalPrice: 15999.99,
        salePrice: 14499.99,
        store: "Incredible Connection"
      },
      {
        name: "Samsung Galaxy Watch 5",
        originalPrice: 4999.99,
        salePrice: 4299.99,
        store: "Takealot"
      }
    ],
    health: [
      {
        name: "Dove Body Wash 500ml",
        originalPrice: 79.99,
        salePrice: 69.99,
        store: "Clicks"
      },
      {
        name: "Nivea Sun Protection SPF50",
        originalPrice: 159.99,
        salePrice: 129.99,
        store: "Dis-Chem"
      },
      // Add more health items
      {
        name: "Centrum Multivitamins 100 Tablets",
        originalPrice: 299.99,
        salePrice: 249.99,
        store: "Clicks"
      },
      {
        name: "Colgate Total Toothpaste 150g",
        originalPrice: 45.99,
        salePrice: 39.99,
        store: "Dis-Chem"
      },
      {
        name: "Johnson's Baby Powder 500g",
        originalPrice: 69.99,
        salePrice: 59.99,
        store: "Clicks"
      }
    ],
    home: [
      {
        name: "Garden Chair Set",
        originalPrice: 1999.99,
        salePrice: 1499.99,
        store: "Builders"
      },
      {
        name: "Bosch Power Drill",
        originalPrice: 899.99,
        salePrice: 749.99,
        store: "Makro"
      },
      // Add more home items
      {
        name: "Russell Hobbs Kettle",
        originalPrice: 599.99,
        salePrice: 499.99,
        store: "Game"
      },
      {
        name: "Defy Washing Machine 8kg",
        originalPrice: 5999.99,
        salePrice: 4999.99,
        store: "Hirsch's"
      },
      {
        name: "Samsung Microwave",
        originalPrice: 1499.99,
        salePrice: 1299.99,
        store: "Makro"
      }
    ]
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Use the static data instead of API call
        if (categoryProducts[category]) {
          setProducts(categoryProducts[category]);
        } else {
          const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
      setLoading(false);
    };

    loadProducts();
  }, [category]);

  const renderProductCard = (product) => {
    const savings = product.originalPrice - product.salePrice;

    return (
      <div key={product.name} className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          {savings > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              SAVE R{savings.toFixed(2)}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="mt-2">
            {savings > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">R{product.salePrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through">R{product.originalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold">R{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Available at {product.store}
          </div>
          <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700">
            Compare Prices
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          {category} Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => renderProductCard(product))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
