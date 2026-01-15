import React from 'react';
import {ShoppingCart, Search, Menu, X } from 'lucide-react';
import { currencies } from '../utils/currency';
import logo from '../images/Design_by_xoxo_logo.png';

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
    <nav className="fixed w-full bg-luxury-dark/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-luxury-gold/70 shadow-md">
              <img
                src={logo}
                alt="Design by XOXO"
                className="w-full h-full object-cover scale-125"
              />
            </div>
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-luxury-gold to-luxury-bronze bg-clip-text text-transparent">
              Designs by XOXO
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-luxury-cream hover:text-luxury-gold transition">Home</a>
            <a href="#products" className="text-luxury-cream hover:text-luxury-gold transition">Shop</a>
            <a href="#about" className="text-luxury-cream hover:text-luxury-gold transition">About</a>
            <a href="#why-us" className="text-luxury-cream hover:text-luxury-gold transition">Why Us</a>
            <a href="#contact" className="text-luxury-cream hover:text-luxury-gold transition">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-luxury-gold/20 text-luxury-cream px-3 py-2 pr-8 rounded-lg font-semibold cursor-pointer hover:bg-luxury-gold/30 transition focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              >
                {Object.keys(currencies).map(curr => (
                  <option key={curr} value={curr} className="bg-luxury-dark text-luxury-cream">
                    {currencies[curr].flag} {curr}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-luxury-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-luxury-gold/20 rounded-full transition"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-luxury-cream" />
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="relative p-2 hover:bg-luxury-gold/20 rounded-full transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-luxury-cream" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-dark text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-luxury-cream"
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
        <div className="md:hidden bg-luxury-dark border-t border-luxury-gold/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-luxury-cream hover:bg-luxury-gold/20 rounded">Home</a>
            <a href="#products" className="block px-3 py-2 text-luxury-cream hover:bg-luxury-gold/20 rounded">Shop</a>
            <a href="#about" className="block px-3 py-2 text-luxury-cream hover:bg-luxury-gold/20 rounded">About</a>
            <a href="#why-us" className="block px-3 py-2 text-luxury-cream hover:bg-luxury-gold/20 rounded">Why Us</a>
            <a href="#contact" className="block px-3 py-2 text-luxury-cream hover:bg-luxury-gold/20 rounded">Contact</a>
            <div className="px-3 py-2">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-luxury-gold/20 text-luxury-cream px-3 py-2 rounded-lg font-semibold"
              >
                {Object.keys(currencies).map(curr => (
                  <option key={curr} value={curr} className="bg-luxury-dark">
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