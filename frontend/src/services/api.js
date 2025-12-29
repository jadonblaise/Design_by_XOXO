import axios from 'axios';

// Use proxy if available (for development), otherwise use full URL
// The proxy in package.json forwards /api/* to http://localhost:8000/api/*
const API_URL = process.env.REACT_APP_API_URL || '/api';

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