import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { convertPrice } from '../utils/currency';

const ProductCard = ({ product, addToCart, currency }) => {
  return (
    <div className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={() => addToCart(product)}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
        {!product.in_stock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}
        {product.stock > 0 && product.stock < 5 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {product.stock} left
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
        <p className="text-2xl font-bold text-emerald-600">
          {convertPrice(parseFloat(product.price), currency)}
        </p>
        {product.category_name && (
          <p className="text-sm text-gray-500 mt-2">{product.category_name}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;