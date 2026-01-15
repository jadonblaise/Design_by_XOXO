// ===== Footer.js =====
import React from 'react';
import { ShoppingBag, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-luxury-dark text-luxury-cream py-12 px-4 border-t-4 border-luxury-gold">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-8 h-8 text-luxury-gold" />
              <span className="ml-2 text-2xl font-bold text-luxury-gold">Design by XOXO</span>
            </div>
            <p className="text-luxury-cream/80">
              Your destination for elegant African prints, casual wear, and stunning event dresses.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-luxury-gold">Shop</h4>
            <ul className="space-y-2 text-luxury-cream/80">
              <li><a href="#products" className="hover:text-luxury-gold transition">African Prints</a></li>
              <li><a href="#products" className="hover:text-luxury-gold transition">Casual Wear</a></li>
              <li><a href="#products" className="hover:text-luxury-gold transition">Event Dresses</a></li>
              <li><a href="#products" className="hover:text-luxury-gold transition">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-luxury-gold">Quick Links</h4>
            <ul className="space-y-2 text-luxury-cream/80">
              <li><a href="#about" className="hover:text-luxury-gold transition">About Us</a></li>
              <li><a href="#why-us" className="hover:text-luxury-gold transition">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-luxury-gold transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-luxury-gold">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://www.instagram.com/designs.by.xoxo?igsh=MWZjbXNjMXl2MGxpaw==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-luxury-cream/90 text-sm">
              Email: info@designbyxoxo.com<br />
              Phone: +234 816 499 7960
            </p>
          </div>
        </div>
        
        <div className="border-t border-luxury-gold/30 pt-8 text-center text-luxury-cream/60">
          <p>&copy; 2024 Design by XOXO. All rights reserved. Designed with love.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;