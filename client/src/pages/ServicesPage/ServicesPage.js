import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

function ServicesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState('');
    const { products, loading, error, pagination, hasNextPage, hasPreviousPage } = useProducts(currentPage);

    const handlePageSubmit = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(pageInput);
        if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
            setCurrentPage(pageNumber);
            setPageInput('');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Our Products</h1>
                
                {/* Products Grid */}
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