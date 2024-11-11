import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const featuredCategories = [
    { 
      id: 1, 
      name: 'Groceries', 
      icon: '🛒',
      description: 'Compare prices between Shoprite and Pick n Pay',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Electronics', 
      icon: '📱',
      description: 'Compare prices from Takealot, Game, and Makro',
      status: 'coming'
    },
    { 
      id: 3, 
      name: 'Fashion', 
      icon: '👕',
      description: 'Compare prices from major clothing retailers',
      status: 'coming'
    },
    { 
      id: 4, 
      name: 'Home & Garden', 
      icon: '🏡',
      description: 'Find the best deals on home improvement',
      status: 'coming'
    }
  ];

  const featuredStores = [
    {
      name: 'Shoprite',
      logo: 'https://www.shoprite.co.za/content/dam/logo/shoprite.png',
      description: 'Leading supermarket chain in South Africa'
    },
    {
      name: 'Pick n Pay',
      logo: 'https://www.pnp.co.za/content/dam/pnpretail/images/pnp-logo.png',
      description: 'Quality and savings in every aisle'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save Money on Your Shopping
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Compare prices across major South African retailers
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/category/groceries" 
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Compare Grocery Prices
              </Link>
              <Link 
                to="/services" 
                className="btn btn-secondary"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Browse Categories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Find the best deals across different categories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map(category => (
              <Link 
                to={category.status === 'active' ? `/category/${category.name.toLowerCase()}` : '#'} 
                key={category.id} 
                className={`card hover:shadow-lg transition-shadow duration-200 ${
                  category.status === 'coming' ? 'opacity-75' : ''
                }`}
              >
                <div className="p-6 text-center">
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {category.description}
                  </p>
                  {category.status === 'coming' ? (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Featured Stores
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Compare prices from these trusted retailers
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredStores.map((store, index) => (
              <div key={index} className="flex items-center p-6 bg-gray-50 rounded-lg">
                <img 
                  src={store.logo} 
                  alt={store.name}
                  className="h-12 object-contain mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                  <p className="text-gray-600 text-sm">{store.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Start saving money in three simple steps
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Category</h3>
              <p className="text-gray-600">Select from our available shopping categories</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Compare Prices</h3>
              <p className="text-gray-600">View price comparisons across different stores</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600">Choose the best deal and start saving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Saving Today
          </h2>
          <p className="mb-8 text-gray-300">
            Join thousands of smart shoppers who save money every day
          </p>
          <Link 
            to="/services" 
            className="btn bg-white text-gray-900 hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
