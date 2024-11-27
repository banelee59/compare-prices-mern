import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import Pagination from './Pagination';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, pagination } = useProducts(currentPage);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-sm mt-2">{product.description}</p>
            <div className="mt-4">
              {product.prices.map((price, index) => (
                <div key={index} className="flex justify-between">
                  <span>{price.store}</span>
                  <span className="font-bold">R {price.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {pagination && (
        <Pagination 
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProductList;
