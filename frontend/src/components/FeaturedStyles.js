// ===== FeaturedStyles.js =====
import React from 'react';

const FeaturedStyles = () => {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Featured Styles</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Trending looks of the season</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96">
              <img 
                src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&h=800&fit=crop" 
                alt="African print style"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Bold African Prints</h3>
                  <p className="text-sm">Celebrate heritage with vibrant patterns</p>
                </div>
              </div>
            </div>
  
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96">
              <img 
                src="https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop" 
                alt="Event wear style"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Glamorous Events</h3>
                  <p className="text-sm">Shine in every celebration</p>
                </div>
              </div>
            </div>
  
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96">
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop" 
                alt="Casual style"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Everyday Elegance</h3>
                  <p className="text-sm">Comfort meets sophistication</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default FeaturedStyles;