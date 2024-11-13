import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCategoriesWithProducts from '../../hooks/useCategoriesWithProducts';
import * as LucideIcons from 'lucide-react';

function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { categories, loading, error } = useCategoriesWithProducts();

    // Helper function to get icon component
    const getIconComponent = (iconName) => {
        const formattedIconName = iconName
            ?.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
        
        const IconComponent = formattedIconName && LucideIcons[formattedIconName];
        return IconComponent ? <IconComponent size={20} /> : <LucideIcons.ShoppingCart size={20} />;
    };

    // Render subcategory section
    const renderSubcategory = (subcategory, categoryProducts) => {
        // Filter products for this subcategory
        const subcategoryProducts = categoryProducts.filter(
            product => product.subcategory === subcategory._id
        );
    
        return (
            <div className="mb-8" key={subcategory._id}>
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-800">{subcategory.name}</h3>
                        <span className="text-sm text-gray-500">
                            {subcategoryProducts.length} products
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {subcategoryProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800">
                                            {product.name}
                                        </h4>
                                        <p className="text-gray-600">
                                            {product.brand}
                                        </p>
                                        <p className="font-medium text-primary-600">
                                            From R{Math.min(...product.prices.map(p => p.price)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        to={`/category/${selectedCategory?._id}/${subcategory._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mt-4"
                    >
                        Browse products
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    };

    // Rest of the component remains similar, but update the return statement
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Browse Categories
                    </h1>
                    <p className="text-xl text-center text-primary-100">
                        Find products by category and compare prices
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Navigation */}
                <div className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            className={`px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 whitespace-nowrap font-medium ${
                                selectedCategory?._id === category._id 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-white text-gray-700 hover:text-primary-600'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <span className="mr-2">{getIconComponent(category.iconName)}</span>
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Display subcategories for selected category */}
                {selectedCategory && (
                    <section id={`${selectedCategory._id}-section`} className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 capitalize flex items-center gap-2">
                                {getIconComponent(selectedCategory.iconName)} {selectedCategory.name}
                            </h2>
                            <Link 
                                to={`/category/${selectedCategory._id}`}
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                            >
                                View all products
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedCategory.subcategories.map(subcategory => 
                                renderSubcategory(subcategory, selectedCategory.products)
                            )}
                        </div>
                    </section>
                )}

                {/* Welcome message when no category is selected */}
                {!selectedCategory && (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">
                            Welcome to Our Categories
                        </h2>
                        <p className="text-gray-600">
                            Select a category above to explore subcategories
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ServicesPage;