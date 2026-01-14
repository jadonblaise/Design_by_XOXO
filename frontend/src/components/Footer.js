// ===== Footer.js =====
import React from 'react';
import { ShoppingBag, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-8 h-8 text-emerald-500" />
              <span className="ml-2 text-2xl font-bold">Design by XOXO</span>
            </div>
            <p className="text-gray-400">
              Your destination for elegant African prints, casual wear, and stunning event dresses.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#products" className="hover:text-emerald-500 transition">African Prints</a></li>
              <li><a href="#products" className="hover:text-emerald-500 transition">Casual Wear</a></li>
              <li><a href="#products" className="hover:text-emerald-500 transition">Event Dresses</a></li>
              <li><a href="#products" className="hover:text-emerald-500 transition">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-emerald-500 transition">About Us</a></li>
              <li><a href="#why-us" className="hover:text-emerald-500 transition">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition">Contact</a></li>
              <li><a href="#products" className="hover:text-emerald-500 transition">Shipping Info</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://instagram.com/design.by.xoxo?igsh=MWZjbXNjMXI2MGxpaw==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Email: info@designbyxoxo.com<br />
              Phone: +234 816 499 7960
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Design by XOXO. All rights reserved. Designed with love.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;