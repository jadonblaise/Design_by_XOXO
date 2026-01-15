import axios from 'axios';

/**
 * API base URL:
 * - Local dev (CRA proxy): default to "/api"
 * - Production: set REACT_APP_API_URL to your backend Render URL, e.g.
 *   "https://<your-backend>.onrender.com/api"
 *
 * Note: if REACT_APP_API_URL is not set in production, "/api" will hit the
 * frontend origin (and won't reach your separate backend service).
 */
const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? '/api' : '/api');

if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    'REACT_APP_API_URL is not set. Set it to your backend URL (e.g. https://<backend>.onrender.com/api) to load products in production.'
  );
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const getAllProducts = async (category = null) => {
  try {
    const url = category ? `/products/?category=${category}` : '/products/';
    console.log('API Call:', API_URL + url);
    const response = await api.get(url);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/search/?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Category APIs
export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Order APIs
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/checkout/', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Contact form API
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact/', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export default api;