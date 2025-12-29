// ===== AboutSection.js =====
import React from 'react';

const AboutSection = () => {
    return (
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea1c8347?w=800&h=600&fit=crop" 
                alt="Fashion store" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">About Design by XOXO</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Welcome to Design by XOXO, where fashion meets culture and elegance meets comfort. We are passionate about bringing you the finest collection of women's wear that celebrates diversity, authenticity, and timeless style.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                From vibrant African prints that tell stories of heritage to sophisticated event wear that makes every occasion memorable, our carefully curated collection caters to the modern woman who values quality, style, and cultural expression.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded with a vision to make premium fashion accessible worldwide, we've built our reputation on exceptional craftsmanship, attention to detail, and unwavering commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AboutSection;