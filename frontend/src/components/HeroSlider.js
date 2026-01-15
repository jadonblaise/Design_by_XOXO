import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop",
      title: "African Heritage Collection",
      subtitle: "Vibrant prints that celebrate culture and style",
      cta: "Shop African Prints"
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop",
      title: "Elegant Event Wear",
      subtitle: "Make every occasion unforgettable",
      cta: "Explore Event Dresses"
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop",
      title: "Casual Comfort",
      subtitle: "Effortless style for everyday elegance",
      cta: "View Casual Wear"
    },
    {
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1600&h=900&fit=crop",
      title: "New Arrivals",
      subtitle: "Fresh styles just for you",
      cta: "Discover Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="home" className="pt-16 relative h-screen overflow-hidden bg-luxury-dark">
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              {/* Keep images clear: theme the content panel, not the whole image */}
              <div className="text-center text-white px-4 max-w-4xl">
                <div className="inline-block rounded-3xl bg-luxury-dark/55 backdrop-blur-sm border border-luxury-gold/30 shadow-2xl px-6 md:px-10 py-8 md:py-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/40 bg-luxury-dark/40 mb-6 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-luxury-gold" />
                    <span className="text-sm md:text-base font-semibold text-luxury-cream tracking-wide">
                      Design by XOXO • Luxury Womenswear
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-luxury-cream drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] animate-fade-in">
                    <span className="bg-gradient-to-r from-luxury-gold to-luxury-bronze bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 text-luxury-cream/95 drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] animate-fade-in-delay">
                    {slide.subtitle}
                  </p>
                <a 
                  href="#products"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-luxury-dark animate-fade-in-delay-2"
                >
                  {slide.cta}
                </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-luxury-gold w-8 shadow-lg' 
                : 'bg-luxury-cream/40 hover:bg-luxury-cream/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-luxury-gold/15 hover:bg-luxury-gold/25 backdrop-blur-sm text-luxury-cream p-3 rounded-full border border-luxury-gold/30 transition focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-luxury-gold/15 hover:bg-luxury-gold/25 backdrop-blur-sm text-luxury-cream p-3 rounded-full border border-luxury-gold/30 transition focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroSlider;