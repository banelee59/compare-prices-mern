import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [healthData, setHealthData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Organized grocery items by subcategories
    const groceryItems = {
        dairy: [
            {
                name: "Clover Full Cream Milk 2L",
                originalPrice: 36.99,
                salePrice: 31.99,
                store: "Pick n Pay",
                brand: "Clover"
            },
            {
                name: "Parmalat Low Fat Milk 2L",
                originalPrice: 34.99,
                salePrice: 32.99,
                store: "Shoprite",
                brand: "Parmalat"
            },
            {
                name: "Lancewood Cheddar Cheese 400g",
                originalPrice: 89.99,
                salePrice: 79.99,
                store: "Checkers",
                brand: "Lancewood"
            }
        ],
        bread_bakery: [
            {
                name: "Albany Superior White Bread 700g",
                originalPrice: 19.99,
                salePrice: 17.99,
                store: "Shoprite",
                brand: "Albany"
            },
            {
                name: "Sasko Brown Bread 700g",
                originalPrice: 18.99,
                salePrice: 16.99,
                store: "Pick n Pay",
                brand: "Sasko"
            },
            {
                name: "Blue Ribbon White Bread 700g",
                originalPrice: 19.99,
                salePrice: 17.49,
                store: "Checkers",
                brand: "Blue Ribbon"
            }
        ],
        cereals: [
            {
                name: "Jungle Oats Original 1kg",
                originalPrice: 45.99,
                salePrice: 39.99,
                store: "Checkers",
                brand: "Jungle"
            },
            {
                name: "Weet-Bix Original 900g",
                originalPrice: 49.99,
                salePrice: 44.99,
                store: "Pick n Pay",
                brand: "Weet-Bix"
            },
            {
                name: "Kellogg's Corn Flakes 750g",
                originalPrice: 54.99,
                salePrice: 49.99,
                store: "Shoprite",
                brand: "Kellogg's"
            }
        ],
        beverages: [
            {
                name: "Coca-Cola 2L",
                originalPrice: 24.99,
                salePrice: 21.99,
                store: "Pick n Pay",
                brand: "Coca-Cola"
            },
            {
                name: "Fanta Orange 2L",
                originalPrice: 22.99,
                salePrice: 19.99,
                store: "Shoprite",
                brand: "Fanta"
            },
            {
                name: "Sprite 2L",
                originalPrice: 23.99,
                salePrice: 20.99,
                store: "Checkers",
                brand: "Sprite"
            }
        ],
        pantry: [
            {
                name: "Tastic Rice 2kg",
                originalPrice: 49.99,
                salePrice: 45.99,
                store: "Shoprite",
                brand: "Tastic"
            },
            {
                name: "Ace Super Maize Meal 5kg",
                originalPrice: 54.99,
                salePrice: 49.99,
                store: "Pick n Pay",
                brand: "Ace"
            },
            {
                name: "White Star Super Maize Meal 5kg",
                originalPrice: 55.99,
                salePrice: 50.99,
                store: "Checkers",
                brand: "White Star"
            }
        ]
    };

    // Add this grouped items constant
    const groupedItems = {
        groceries: {
            title: "Groceries",
            icon: "🛒",
            items: groceryItems.dairy.concat(
                groceryItems.bread_bakery,
                groceryItems.cereals,
                groceryItems.beverages,
                groceryItems.pantry
            )
        },
        electronics: {
            title: "Electronics",
            icon: "📱",
            items: [
                {
                    name: "Samsung 55\" Smart TV",
                    originalPrice: 9999.99,
                    salePrice: 8499.99,
                    store: "Game",
                    brand: "Samsung"
                },
                // Add more electronics items
            ]
        },
        health: {
            title: "Health & Beauty",
            icon: "💊",
            items: healthData || []
        },
        home: {
            title: "Home & Garden",
            icon: "🏡",
            items: [
                {
                    name: "Garden Chair Set",
                    originalPrice: 1999.99,
                    salePrice: 1499.99,
                    store: "Builders",
                    brand: "Home & Co"
                },
                // Add more home items
            ]
        }
    };

    // Render subcategory section
    const renderGrocerySubcategory = (title, items) => (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(product => renderProductCard({
                    ...product,
                    category: 'groceries'
                }))}
            </div>
        </div>
    );

    // Update the renderProductCard to include brand
    const renderProductCard = (product) => {
        const savings = product.originalPrice - product.salePrice;

        return (
            <div key={product.name} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative p-4">
                    {/* Product Image Placeholder */}
                    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
                        <span className="text-4xl">🛒</span>
                    </div>
                    
                    {savings > 0 && (
                        <div className="absolute top-6 right-6">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                                Save R{savings.toFixed(2)}
                            </div>
                        </div>
                    )}

                    {/* Brand Badge */}
                    <div className="absolute top-6 left-6">
                        <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                            {product.brand}
                        </div>
                    </div>

                    {/* Store Badge */}
                    <div className="absolute top-16 left-6">
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                            {product.store}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 h-14">
                            {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary-600">
                                R{product.salePrice.toFixed(2)}
                            </span>
                            {savings > 0 && (
                                <span className="text-sm text-gray-500 line-through">
                                    R{product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200">
                                Compare
                            </button>
                            <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-200 rounded-lg hover:border-primary-600 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const importAndShowHealthData = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/products/import-health');
            
            if (response.data.success) {
                const healthResponse = await axios.get('http://localhost:5000/api/products/category/health');
                setHealthData(healthResponse.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add this function after your existing state declarations
    const showCategoryContent = (categoryKey) => {
        setSelectedCategory(categoryKey);
        
        // Scroll to the category section
        const section = document.getElementById(`${categoryKey}-section`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Compare Prices Across Stores
                    </h1>
                    <p className="text-xl text-center text-primary-100">
                        Find the best deals on your favorite products
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Navigation */}
                <div className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-hide">
                    {Object.entries(groupedItems).map(([key, category]) => (
                        <button
                            key={key}
                            className={`px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 whitespace-nowrap font-medium ${
                                selectedCategory === key 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-white text-gray-700 hover:text-primary-600'
                            }`}
                            onClick={() => showCategoryContent(key)}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.title}
                        </button>
                    ))}
                </div>

                {/* Display content based on selected category */}
                {selectedCategory && (
                    <section id={`${selectedCategory}-section`} className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 capitalize flex items-center gap-2">
                                {groupedItems[selectedCategory].icon} {groupedItems[selectedCategory].title}
                            </h2>
                            <Link 
                                to={`/category/${selectedCategory}`}
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                            >
                                View all
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                        {/* Render content based on category */}
                        {selectedCategory === 'groceries' && (
                            <>
                                {renderGrocerySubcategory('Dairy & Eggs', groceryItems.dairy)}
                                {renderGrocerySubcategory('Bread & Bakery', groceryItems.bread_bakery)}
                                {renderGrocerySubcategory('Breakfast & Cereals', groceryItems.cereals)}
                                {renderGrocerySubcategory('Beverages', groceryItems.beverages)}
                                {renderGrocerySubcategory('Pantry Essentials', groceryItems.pantry)}
                            </>
                        )}

                        {selectedCategory === 'electronics' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {groupedItems.electronics.items.map(product => renderProductCard(product))}
                            </div>
                        )}

                        {selectedCategory === 'health' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {(healthData || []).map(product => renderProductCard(product))}
                            </div>
                        )}

                        {selectedCategory === 'home' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {groupedItems.home.items.map(product => renderProductCard(product))}
                            </div>
                        )}
                    </section>
                )}

                {/* Show welcome message if no category is selected */}
                {!selectedCategory && (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">
                            Welcome to Price Comparison
                        </h2>
                        <p className="text-gray-600">
                            Select a category above to start comparing prices
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ServicesPage; 