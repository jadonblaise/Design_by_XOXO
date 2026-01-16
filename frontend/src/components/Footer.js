// ===== Footer.js =====
import React from 'react';
import { Instagram, Facebook, MapPin } from 'lucide-react';
import Design_by_xoxo_logo from '../images/Design_by_xoxo_logo.png';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer = () => {
  return (
    <footer id="contact" className="bg-luxury-dark text-luxury-cream py-12 px-4 border-t-4 border-luxury-gold">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 md:gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-luxury-gold/70 shadow-md">
                <img
                  src={Design_by_xoxo_logo}
                  alt="Design by XOXO"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <span className="flex flex-col items-start text-sm sm:text-base md:text-base font-bold text-luxury-gold leading-[0.95] md:leading-[0.75] md:tracking-tight">
                <span className="block">Designs</span>
                <span className="block">by xoxo</span>
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
            <div className="mt-4 flex items-start gap-3 text-luxury-cream/90 text-sm">
              <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" aria-hidden="true" />
              <span>
                Address: Owerri Imo State, Nigeria
              </span>
            </div>
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