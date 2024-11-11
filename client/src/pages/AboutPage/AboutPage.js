import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  const features = [
    {
      title: "Price Comparison",
      description: "We help you find the best deals by comparing prices across major South African retailers."
    },
    {
      title: "Real-Time Updates",
      description: "Our prices are regularly updated to ensure you get the most current information."
    },
    {
      title: "Multiple Categories",
      description: "From groceries to electronics, we cover a wide range of product categories."
    }
  ];

  const values = [
    {
      title: "Transparency",
      description: "We provide clear, unbiased price comparisons to help you make informed decisions."
    },
    {
      title: "Reliability",
      description: "Our data is sourced directly from retailers to ensure accuracy and reliability."
    },
    {
      title: "User-Focused",
      description: "We're committed to making price comparison simple and accessible for everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Main About Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About PriceCompare
          </h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              PriceCompare is South Africa's leading price comparison platform, dedicated to helping shoppers find the best deals across major retailers. Our mission is to empower consumers to make smart shopping decisions by providing transparent price comparisons and up-to-date information.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Founded with the goal of simplifying the shopping experience, we currently focus on comparing prices between Shoprite and Pick n Pay, with plans to expand to more retailers and categories in the future.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Plans */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Future Plans
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              We're constantly working to improve our service and expand our offerings. Our upcoming features include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Expansion to more retailers across South Africa</li>
              <li>Price history tracking and alerts</li>
              <li>Mobile app development</li>
              <li>User reviews and ratings</li>
              <li>Personalized shopping recommendations</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Start Saving Today
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join our community of smart shoppers and start saving on your purchases.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/category/groceries" 
              className="btn btn-primary"
            >
              Compare Prices
            </Link>
            <Link 
              to="/contact" 
              className="btn btn-secondary"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage; 