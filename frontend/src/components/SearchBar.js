// ===== SearchBar.js =====
import React from 'react';
import { Search, X } from 'lucide-react';
import { convertPrice } from '../utils/currency';

const SearchBar = ({ searchOpen, setSearchOpen, searchQuery, setSearchQuery, products, currency }) => {
  if (!searchOpen) return null;

  const goToProducts = () => {
    setSearchOpen(false);
    // Let the modal close before scrolling
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
      <div className="max-w-3xl mx-auto mt-24 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-luxury-cream rounded-2xl shadow-2xl p-6 border-2 border-luxury-gold">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-6 h-6 text-luxury-gold" />
            <input
              type="text"
              placeholder="Search for products, styles, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-lg outline-none bg-transparent text-luxury-dark placeholder-luxury-brown"
              autoFocus
            />
            <button 
              onClick={() => {
                if (searchQuery) return goToProducts();
                setSearchOpen(false);
              }}
              className="text-luxury-brown hover:text-luxury-dark transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {searchQuery && products.length > 0 && (
            <div className="border-t border-luxury-gold/30 pt-4">
              <p className="text-sm text-luxury-brown mb-3">
                Found {products.length} results for "{searchQuery}"
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {products.slice(0, 6).map(product => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={goToProducts}
                    className="text-left cursor-pointer hover:shadow-lg transition rounded-lg overflow-hidden bg-white border border-luxury-gold/20 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    aria-label={`View ${product.name} in products`}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                    <div className="p-2">
                      <p className="text-sm font-semibold truncate text-luxury-dark">{product.name}</p>
                      <p className="text-luxury-gold font-bold">{convertPrice(parseFloat(product.price), currency)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;