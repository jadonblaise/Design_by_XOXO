import React, { useState } from 'react';
import { ShoppingCart as CartIcon, X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { convertPrice, currencies } from '../utils/currency';
import { createOrder } from '../services/api';

const ShoppingCart = ({ cartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartTotal, currency, setCurrency }) => {
  const [checkoutReminderOpen, setCheckoutReminderOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  
  const placeOrder = async () => {
    if (cart.length === 0) return;
    if (placingOrder) return;

    try {
      setPlacingOrder(true);
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
        alert(
          `Order placed successfully! Order Number: ${response.order.order_number}\n\nPlease contact us on WhatsApp/phone to confirm your order.`
        );
        // Clear cart after successful order
        cart.forEach(item => removeFromCart(item.id));
        setCheckoutReminderOpen(false);
        setCartOpen(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setPlacingOrder(false);
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
                {typeof setCurrency === 'function' ? (
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-white border border-luxury-gold/30 rounded-lg px-3 py-1 text-luxury-dark font-semibold focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    aria-label="Select currency"
                  >
                    {Object.keys(currencies).map((curr) => (
                      <option key={curr} value={curr}>
                        {currencies[curr].flag} {curr}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{currencies[currency].flag} {currency}</span>
                )}
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-luxury-dark">Total:</span>
                <span className="text-2xl font-bold text-luxury-gold">{convertPrice(cartTotal, currency)}</span>
              </div>
              <button 
                onClick={() => setCheckoutReminderOpen(true)}
                className="w-full bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={placingOrder}
              >
                {placingOrder ? 'Placing order...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkout reminder modal */}
      {checkoutReminderOpen && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setCheckoutReminderOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border-2 border-luxury-gold/25 p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-2xl font-bold text-luxury-dark">Confirm your order</h3>
              <button
                onClick={() => setCheckoutReminderOpen(false)}
                className="p-2 hover:bg-luxury-gold/20 rounded-full transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-luxury-dark" />
              </button>
            </div>

            <p className="text-luxury-brown leading-relaxed mb-4">
              After placing your order, please <span className="font-bold text-luxury-dark">contact us to confirm</span>{' '}
              your order so we can process it quickly.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://wa.me/2348164997960"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/15 hover:bg-luxury-gold/25 text-luxury-dark font-semibold transition"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-luxury-gold" />
                WhatsApp
              </a>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-luxury-cream text-luxury-brown font-semibold border border-luxury-gold/25">
                Phone: +234 816 499 7960
              </span>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCheckoutReminderOpen(false)}
                className="px-5 py-3 rounded-lg font-bold text-luxury-dark bg-luxury-gold/10 hover:bg-luxury-gold/20 transition"
                disabled={placingOrder}
              >
                Cancel
              </button>
              <button
                onClick={placeOrder}
                className="px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-luxury-gold to-luxury-bronze hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={placingOrder}
              >
                {placingOrder ? 'Placing...' : 'Place order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;