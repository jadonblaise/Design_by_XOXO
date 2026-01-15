import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSlider from './components/HeroSlider';
import FeaturedStyles from './components/FeaturedStyles';
import AboutSection from './components/AboutSection';
import ProductGrid from './components/ProductGrid';
import WhyUsSection from './components/WhyUsSection';
import TrainingsSection from './components/TrainingsSection';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import SearchBar from './components/SearchBar';
import { getAllProducts, searchProducts } from './services/api';
import './App.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount and when category changes
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (activeCategory === 'all') {
        data = await getAllProducts();
      } else {
        data = await getAllProducts(activeCategory);
      }
      // Handle pagination from Django REST framework
      const productsList = data.results || data;
      console.log('Fetched products:', productsList.length, productsList);
      setProducts(Array.isArray(productsList) ? productsList : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(`Failed to load products: ${err.message || 'Please try again.'}`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (err) {
        console.error('Search error:', err);
      }
    } else {
      fetchProducts();
    }
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

  const cartTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = searchQuery ? products : products;

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
        currency={currency}
        setCurrency={setCurrency}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      <SearchBar 
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
        products={filteredProducts}
        currency={currency}
      />

      <ShoppingCart 
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        currency={currency}
      />

      <HeroSlider />
      
      <FeaturedStyles />
      
      <AboutSection />
      
      <ProductGrid 
        products={filteredProducts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        addToCart={addToCart}
        currency={currency}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <WhyUsSection />

      <TrainingsSection />
      
      <Footer />
    </div>
  );
}

export default App;