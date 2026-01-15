// ===== FeaturedStyles.js =====
import React from 'react';

const FeaturedStyles = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-luxury-cream/30 via-luxury-gold/10 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-luxury-dark">Featured Styles</h2>
        <p className="text-center text-luxury-brown mb-12 text-lg">Trending looks of the season</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border-4 border-luxury-gold/30">
            <img 
              src="https://ideogram.ai/assets/image/lossless/response/BLhayjgCQZCEpbFeVHS7Dw@2k" 
              alt="African print style"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 to-transparent flex items-end p-6">
              <div className="text-luxury-cream">
                <h3 className="text-2xl font-bold mb-2 text-luxury-gold">Bridal Wear</h3>
                <p className="text-sm">Beautiful bridal wear for your special day</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border-4 border-luxury-gold/30">
            <img 
              src="https://ideogram.ai/assets/image/lossless/response/GzMJA799Ri2UibPeQJk7Aw@2k" 
              alt="Event wear style"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 to-transparent flex items-end p-6">
              <div className="text-luxury-cream">
                <h3 className="text-2xl font-bold mb-2 text-luxury-gold">Asoebi Styles</h3>
                <p className="text-sm">Shine in every celebration</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border-4 border-luxury-gold/30">
            <img 
              src="https://ideogram.ai/assets/image/lossless/response/PNRRxZj0SdmeXLoW_PHzJw@2k" 
              alt="Casual style"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 to-transparent flex items-end p-6">
              <div className="text-luxury-cream">
                <h3 className="text-2xl font-bold mb-2 text-luxury-gold">Traditional Styles</h3>
                <p className="text-sm">Traditional styles for the modern woman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStyles;