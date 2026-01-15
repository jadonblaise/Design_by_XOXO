import React from 'react';
import ProductCard from './ProductCard';
import { Search } from 'lucide-react';

const ProductGrid = ({ 
  products, 
  activeCategory, 
  setActiveCategory, 
  addToCart, 
  currency, 
  loading, 
  error,
  searchQuery,
  setSearchQuery
}) => {
  
  const categories = [
    { slug: 'all', name: 'All Products' },
    { slug: 'african', name: 'African Prints' },
    { slug: 'casual', name: 'Casuals' },
    { slug: 'event', name: 'Event Wear' }
  ];

  return (
    <section id="products" className="py-20 px-4 bg-gradient-to-br from-luxury-cream/30 to-luxury-gold/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-luxury-dark">Our Collections</h2>
        <p className="text-center text-luxury-brown mb-12 text-lg">Discover styles that define you</p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button 
              key={category.slug}
              onClick={() => {
                setActiveCategory(category.slug);
                setSearchQuery('');
              }}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeCategory === category.slug
                  ? 'bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white shadow-lg' 
                  : 'bg-white text-luxury-dark hover:bg-luxury-gold/20 border-2 border-luxury-gold/30'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
            <p className="mt-4 text-luxury-brown">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    currency={currency}
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <Search className="w-16 h-16 mx-auto text-luxury-gold/50 mb-4" />
                <p className="text-luxury-brown text-lg">
                  {searchQuery 
                    ? `No products found matching "${searchQuery}"` 
                    : 'No products available'}
                </p>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-luxury-gold hover:text-luxury-bronze font-semibold"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;