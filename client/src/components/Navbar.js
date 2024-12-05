import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            PriceCompare
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600">
              About Us
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary-600">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>
            <div className="flex items-center space-x-2 ml-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-700 hover:text-primary-600"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
