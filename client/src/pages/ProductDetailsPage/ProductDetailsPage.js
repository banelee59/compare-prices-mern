import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-gray-700 mb-4">Product not found</div>
        <Link to="/category/groceries" className="btn btn-primary">
          Return to Groceries
        </Link>
      </div>
    );
  }

  const savingsAmount = Math.max(...product.prices.map(p => p.price)) - Math.min(...product.prices.map(p => p.price));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/category/groceries" className="text-primary-600 hover:text-primary-700">
            Groceries
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="h-96 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">
                  {product.description}
                </p>
                {savingsAmount > 0 && (
                  <div className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-md">
                    Potential savings: R{savingsAmount.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Price Comparison Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Store Comparison</h2>
                <div className="space-y-4">
                  {product.prices
                    .sort((a, b) => a.price - b.price)
                    .map((price, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <img 
                                src={price.store === "Shoprite" 
                                  ? "https://www.shoprite.co.za/content/dam/logo/shoprite.png"
                                  : "https://www.pnp.co.za/content/dam/pnpretail/images/pnp-logo.png"} 
                                alt={price.store}
                                className="h-6 object-contain"
                              />
                              <h3 className="font-semibold text-lg">
                                {price.store}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-500">
                              Last checked: {new Date(price.lastUpdated).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`text-xl font-bold ${
                            index === 0 ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            R{price.price.toFixed(2)}
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Best Price Available
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <a 
                  href={`https://www.${product.prices.sort((a, b) => a.price - b.price)[0].store.toLowerCase().replace(' ', '')}.co.za/search?q=${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 text-center"
                >
                  Shop at {product.prices.sort((a, b) => a.price - b.price)[0].store}
                </a>
                <button className="btn btn-secondary flex-1">
                  Set Price Alert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price History */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Price History</h2>
          <div className="text-center text-gray-600 py-8">
            <p>Price tracking will be available soon</p>
            <p className="text-sm mt-2">Get notified when prices change by setting a price alert</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
