// ===== AboutSection.js =====
import React from 'react';
import xoxo from '../images/xoxo.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={xoxo} 
              alt="Fashion store" 
              className="rounded-2xl shadow-2xl border-4 border-luxury-gold"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-luxury-dark">
              About Design by XOXO
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-luxury-gold to-luxury-bronze mb-6"></div>
            <p className="text-luxury-brown text-lg leading-relaxed mb-4">
              Hi! I am Maryann Chisom Chukwu. I am a fashion designer and a fashion blogger. I am passionate about bringing you the finest collection of women's wear that celebrates diversity, authenticity, and timeless style.
            </p>
            <p className="text-luxury-brown text-lg leading-relaxed mb-4">
              From vibrant African prints that tell stories of heritage to sophisticated event wear that makes every occasion memorable, our carefully curated collection caters to the modern woman who values quality, style, and cultural expression.
            </p>
            <p className="text-luxury-brown text-lg leading-relaxed mb-6">
              Founded with a vision to make premium fashion accessible worldwide, we've built our reputation on exceptional craftsmanship, attention to detail, and unwavering commitment to customer satisfaction.
            </p>
            <button className="bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;