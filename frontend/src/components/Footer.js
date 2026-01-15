// ===== Footer.js =====
import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import Design_by_xoxo_logo from '../images/Design_by_xoxo_logo.png';

const WhatsAppIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.56 4.19 1.62 6.02L0 24l6.15-1.6A11.9 11.9 0 0 0 12.02 24C18.64 24 24 18.62 24 12a11.86 11.86 0 0 0-3.48-8.52Zm-8.5 18.51a9.92 9.92 0 0 1-5.06-1.39l-.36-.22-3.65.95.97-3.56-.23-.37A9.93 9.93 0 0 1 2.02 12c0-5.51 4.49-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22.02 12c0 5.51-4.49 9.99-10 9.99Zm5.72-7.83c-.31-.16-1.84-.91-2.12-1.01-.29-.11-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.53-.91-.81-1.52-1.81-1.7-2.12-.18-.31-.02-.48.13-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.71-.97-2.34-.26-.63-.52-.55-.71-.56h-.6c-.21 0-.54.08-.82.39-.29.31-1.08 1.05-1.08 2.56 0 1.51 1.1 2.97 1.25 3.18.16.21 2.16 3.3 5.24 4.63.73.31 1.3.5 1.74.64.73.23 1.39.2 1.92.12.59-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.29-.21-.6-.37Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-luxury-dark text-luxury-cream py-12 px-4 border-t-4 border-luxury-gold">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-luxury-gold/70 shadow-md">
                <img
                  src={Design_by_xoxo_logo}
                  alt="Design by XOXO"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <span className="ml-2 text-lg sm:text-2xl font-bold text-luxury-gold leading-tight">
                Design by XOXO
              </span>
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
              <li><a href="#trainings" className="hover:text-luxury-gold transition">Trainings</a></li>
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
                href="https://wa.me/2348164997960"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition"
              >
                <WhatsAppIcon className="w-5 h-5" />
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