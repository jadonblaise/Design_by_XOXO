import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Globe, MapPin, Instagram, Facebook, Twitter, Menu, X, ShoppingCart, Minus, Plus, Trash2, Search } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export default function FashionLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const currencies = {
    USD: { symbol: '$', rate: 1, flag: '🇺🇸' },
    EUR: { symbol: '€', rate: 0.92, flag: '🇪🇺' },
    NGN: { symbol: '₦', rate: 1550, flag: '🇳🇬' }
  };

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

  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "On-Time Delivery",
      description: "We guarantee your orders arrive exactly when promised. Your time matters to us, and punctuality is our priority."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Worldwide Shipping",
      description: "Fashion knows no borders. We deliver premium quality to your doorstep, anywhere in the world with care."
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Heart of the City",
      description: "Our flagship store is located in the city's most prestigious fashion district, easily accessible to all our valued customers."
    }
  ];

  // Fetch products and categories from backend
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (categorySlug = null) => {
    try {
      const url = categorySlug 
        ? `${API_URL}/products?category=${categorySlug}`
        : `${API_URL}/products`;
      const response = await axios.get(url);
      // Handle paginated response or direct array
      setProducts(response.data.results || response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Auto-slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const convertPrice = (price) => {
    const converted = price * currencies[currency].rate;
    return `${currencies[currency].symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        })),
        currency: currency,
        total: parseFloat(cartTotal)
      };
      const response = await axios.post(`${API_URL}/checkout/`, orderData);
      if (response.data.success) {
        alert(`Order placed successfully! Order number: ${response.data.order?.order_number || 'N/A'}`);
        setCart([]);
        setCartOpen(false);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert(error.response?.data?.error || 'Checkout failed. Please try again.');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products by active category
  useEffect(() => {
    setLoading(true);
    if (activeCategory === 'all') {
      fetchProducts();
    } else {
      fetchProducts(activeCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const filteredProducts = products;

  const searchedProducts = searchQuery 
    ? filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category_name && p.category_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredProducts;

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Design by XOXO
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 transition">Home</a>
              <a href="#products" className="text-gray-700 hover:text-emerald-600 transition">Shop</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition">About</a>
              <a href="#why-us" className="text-gray-700 hover:text-emerald-600 transition">Why Us</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              {/* Currency Selector */}
              <div className="relative hidden sm:block">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-emerald-50 text-gray-700 px-3 py-2 pr-8 rounded-lg font-semibold cursor-pointer hover:bg-emerald-100 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.keys(currencies).map(curr => (
                    <option key={curr} value={curr}>
                      {currencies[curr].flag} {curr}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-emerald-50 rounded-full transition"
              >
                <Search className="w-6 h-6 text-gray-700" />
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 hover:bg-emerald-50 rounded-full transition"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">Home</a>
              <a href="#products" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">Shop</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">About</a>
              <a href="#why-us" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">Why Us</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50">Contact</a>
              <div className="px-3 py-2">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-emerald-50 text-gray-700 px-3 py-2 rounded-lg font-semibold"
                >
                  {Object.keys(currencies).map(curr => (
                    <option key={curr} value={curr}>
                      {currencies[curr].flag} {curr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="max-w-3xl mx-auto mt-24 px-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, styles, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button 
                  onClick={() => {
                    setSearchOpen(false);
                    if (searchQuery) {
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {searchQuery && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Found {searchedProducts.length} results for "{searchQuery}"
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {searchedProducts.slice(0, 6).map(product => (
                      <div key={product.id} className="cursor-pointer hover:shadow-lg transition rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                        <div className="p-2">
                          <p className="text-sm font-semibold truncate">{product.name}</p>
                          <p className="text-emerald-600 font-bold">{convertPrice(product.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-emerald-600 font-bold">{convertPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Currency:</span>
                    <span>{currencies[currency].flag} {currency}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-emerald-600">{convertPrice(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section with Slideshow */}
      <section id="home" className="pt-16 relative h-screen overflow-hidden">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
                    {slide.subtitle}
                  </p>
                  <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition animate-fade-in-delay-2">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Featured Styles Carousel */}
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

      {/* About Section */}
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

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Collections</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Discover styles that define you</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category.id || category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  activeCategory === category.slug
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-emerald-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : searchedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!product.in_stock && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-emerald-600 font-semibold mb-2">{product.category_name || 'Uncategorized'}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-emerald-600">{convertPrice(product.price)}</span>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.in_stock}
                        className={`px-6 py-2 rounded-full font-semibold transition ${
                          product.in_stock
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">What sets us apart</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="inline-block mb-4 text-emerald-600">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">We'd love to hear from you</p>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="w-8 h-8 text-emerald-400" />
                <span className="ml-2 text-xl font-bold">Design by XOXO</span>
              </div>
              <p className="text-gray-400">
                Where fashion meets culture and elegance meets comfort.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-emerald-400 transition">Home</a></li>
                <li><a href="#products" className="hover:text-emerald-400 transition">Shop</a></li>
                <li><a href="#about" className="hover:text-emerald-400 transition">About</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#why-us" className="hover:text-emerald-400 transition">Why Us</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">FAQ</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">Shipping</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Design by XOXO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API_URL}/contact/`, formData);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
      {submitted && (
        <div className="mb-6 p-4 bg-emerald-100 text-emerald-700 rounded-lg">
          Thank you for contacting us! We will get back to you soon.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          placeholder="How can we help you?"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Tell us more about your inquiry..."
        />
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}