import React from 'react';
import { ShoppingBag, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { currencies } from '../utils/currency';

const Navigation = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  cartOpen, 
  setCartOpen, 
  cartCount, 
  currency, 
  setCurrency, 
  searchOpen, 
  setSearchOpen 
}) => {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 text-emerald-600" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Design by XOXO
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-600 transition">Home</a>
            <a href="#products" className="text-gray-700 hover:text-emerald-600 transition">Shop</a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 transition">About</a>
            <a href="#why-us" className="text-gray-700 hover:text-emerald-600 transition">Why Us</a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-emerald-50 text-gray-700 px-3 py-2 pr-8 rounded-lg font-semibold cursor-pointer hover:bg-emerald-100 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {Object.keys(currencies).map(curr => (
                  <option key={curr} value={curr}>
                    {currencies[curr].flag} {curr}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-emerald-50 rounded-full transition"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-gray-700" />
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 hover:bg-emerald-50 rounded-full transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Home</a>
            <a href="#products" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Shop</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">About</a>
            <a href="#why-us" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Why Us</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded">Contact</a>
            <div className="px-3 py-2">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-emerald-50 text-gray-700 px-3 py-2 rounded-lg font-semibold"
              >
                {Object.keys(currencies).map(curr => (
                  <option key={curr} value={curr}>
                    {currencies[curr].flag} {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;