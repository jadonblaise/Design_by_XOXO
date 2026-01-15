import React from 'react';
import { ShoppingCart as CartIcon, X, Minus, Plus, Trash2 } from 'lucide-react';
import { convertPrice, currencies } from '../utils/currency';
import { createOrder } from '../services/api';

const ShoppingCart = ({ cartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartTotal, currency }) => {
  
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        })),
        currency: currency,
        total: cartTotal,
        customer_email: '' // Can be added from a form
      };

      const response = await createOrder(orderData);
      
      if (response.success) {
        alert(`Order placed successfully! Order Number: ${response.order.order_number}`);
        // Clear cart after successful order
        cart.forEach(item => removeFromCart(item.id));
        setCartOpen(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setCartOpen(false)}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-luxury-cream shadow-2xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-luxury-dark">Shopping Cart</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-luxury-gold/20 rounded-full transition">
            <X className="w-6 h-6 text-luxury-dark" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <CartIcon className="w-16 h-16 mx-auto text-luxury-gold/50 mb-4" />
            <p className="text-luxury-brown">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow border border-luxury-gold/20">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-luxury-dark">{item.name}</h3>
                    <p className="text-luxury-gold font-bold">{convertPrice(parseFloat(item.price), currency)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-luxury-gold/20 rounded transition"
                      >
                        <Minus className="w-4 h-4 text-luxury-dark" />
                      </button>
                      <span className="font-semibold text-luxury-dark">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-luxury-gold/20 rounded transition"
                      >
                        <Plus className="w-4 h-4 text-luxury-dark" />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-luxury-gold/30 pt-4">
              <div className="flex justify-between mb-2 text-sm text-luxury-brown">
                <span>Currency:</span>
                <span>{currencies[currency].flag} {currency}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-luxury-dark">Total:</span>
                <span className="text-2xl font-bold text-luxury-gold">{convertPrice(cartTotal, currency)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;