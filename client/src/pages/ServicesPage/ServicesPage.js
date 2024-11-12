import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
//import { useProducts } from '../../hooks/useProducts.js';
//import { useCategory } from '../../hooks/useCategory.js';
import useProducts from '../../hooks/useProducts.js';
import useCategory from '../../hooks/useCategory.js';
import * as LucideIcons from 'lucide-react';

function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { products, loading: productsLoading, error: productsError } = useProducts(selectedCategory);
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategory();

    // Transform categories and products into grouped structure
    const groupedItems = useMemo(() => {
        if (!categories || !products) return {};

        return categories.reduce((acc, category) => {
            // Debug logs to check the icon name and component
            console.log("Category:", category.name);
            console.log("Icon name:", category.iconName);
            console.log("Available icons:", Object.keys(LucideIcons));
            
            // Make sure the icon name matches exactly with Lucide component names
            // Convert first letter to uppercase and remove any spaces or special characters
            const formattedIconName = category.iconName
                ?.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
            
            console.log("Formatted icon name:", formattedIconName);
            console.log("Icon exists:", !!LucideIcons[formattedIconName]);

            const IconComponent = formattedIconName && LucideIcons[formattedIconName];
            
            acc[category.name.toLowerCase()] = {
                title: category.name,
                icon: IconComponent ? <IconComponent size={20} /> : <LucideIcons.ShoppingCart size={20} />,
                items: products.filter(product => 
                    product.category.toLowerCase() === category.name.toLowerCase()
                ),
                subcategories: category.subcategories || []
            };
            return acc;
        }, {});
    }, [categories, products]);

    // Render subcategory section
    const renderSubcategory = (subcategory, items) => (
        <div className="mb-8" key={subcategory.name}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{subcategory.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(product => renderProductCard(product))}
            </div>
        </div>
    );

    // Update the renderProductCard to handle the new product structure
    const renderProductCard = (product) => {
        const latestPrice = product.prices[0]; // Assuming prices are sorted by date
        const previousPrice = product.prices[1];
        const savings = previousPrice ? previousPrice.price - latestPrice.price : 0;

        return (
            <div key={product._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
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
                    {product.brand && (
                        <div className="absolute top-6 left-6">
                            <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                                {product.brand}
                            </div>
                        </div>
                    )}

                    {/* Store Badge */}
                    <div className="absolute top-16 left-6">
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                            {latestPrice.store}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 h-14">
                            {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary-600">
                                R{latestPrice.price.toFixed(2)}
                            </span>
                            {previousPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    R{previousPrice.price.toFixed(2)}
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

    // Add this function after your existing state declarations
    const showCategoryContent = (categoryKey) => {
        setSelectedCategory(categoryKey);
        
        // Scroll to the category section
        const section = document.getElementById(`${categoryKey}-section`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (categoriesLoading || productsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (categoriesError || productsError) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">
                    Error loading content: {categoriesError || productsError}
                </p>
            </div>
        );
    }

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
                {selectedCategory && groupedItems[selectedCategory] && (
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

                        {/* Render subcategories if they exist */}
                        {groupedItems[selectedCategory].subcategories.length > 0 ? (
                            groupedItems[selectedCategory].subcategories.map(subcategory => {
                                const subcategoryItems = groupedItems[selectedCategory].items.filter(
                                    item => item.subcategory === subcategory.name
                                );
                                return renderSubcategory(subcategory, subcategoryItems);
                            })
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {groupedItems[selectedCategory].items.map(product => renderProductCard(product))}
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