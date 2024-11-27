import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import debounce from 'lodash/debounce';

function ServicesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); // Reset to first page on new search
        }, 300);

        handler();
        return () => handler.cancel();
    }, [searchTerm]);

    const { products, loading, error, pagination, hasNextPage, hasPreviousPage } 
        = useProducts(currentPage, debouncedSearch, selectedCategory);

    const handleSearch = (e) => {
        const value = e.target.value;
        // Sanitize input - remove special characters that could be used for injection
        const sanitizedValue = value.replace(/[^\w\s]/gi, '');
        setSearchTerm(sanitizedValue);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setCurrentPage(1);
    };

    const handlePageSubmit = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(pageInput);
        if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
            setCurrentPage(pageNumber);
            setPageInput('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Our Products</h1>
                
                {/* Enhanced Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search products..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10"
                        />
                        <svg 
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Stats */}
                <div className="text-center mb-6">
                    <div className="text-gray-600">
                        {pagination.totalProducts} products found
                        {searchTerm && ` for "${searchTerm}"`}
                        {selectedCategory && ` in ${selectedCategory}`}
                    </div>
                    {(searchTerm || selectedCategory) && (
                        <button
                            onClick={clearSearch}
                            className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                {/* Loading state */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl">Loading...</div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-red-500">Error: {error}</div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-gray-500">No products found</div>
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div 
                                key={product._id} 
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-xl font-semibold">{product.name}</h2>
                                    <span className="text-sm text-gray-500">({product.brand})</span>
                                </div>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                
                                {/* Store Prices */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-gray-700">Store Prices:</h3>
                                    {product.prices.map((priceInfo) => (
                                        <div 
                                            key={priceInfo._id}
                                            className="flex justify-between items-center bg-gray-50 p-2 rounded"
                                        >
                                            <span className="font-medium">{priceInfo.store}</span>
                                            <div className="flex flex-col items-end">
                                                <span className="text-lg font-bold text-blue-600">
                                                    R{priceInfo.price.toFixed(2)}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    Updated: {new Date(priceInfo.lastUpdated).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Updated Pagination Controls */}
                <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={!hasPreviousPage}
                        className={`px-4 py-2 rounded ${
                            hasPreviousPage 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-600">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>

                    {/* Page Jump Form */}
                    <form onSubmit={handlePageSubmit} className="flex items-center gap-2">
                        <input
                            type="number"
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            min="1"
                            max={pagination.totalPages}
                            placeholder="Go to page"
                            className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                        >
                            Go
                        </button>
                    </form>

                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!hasNextPage}
                        className={`px-4 py-2 rounded ${
                            hasNextPage 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServicesPage;