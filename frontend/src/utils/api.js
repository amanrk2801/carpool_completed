// API utility functions for communicating with the backend
import config from '../config/environment.js';

const API_BASE_URL = config.API_BASE_URL;

// Cache for API responses
const cache = new Map();

// Utility function to get cache key
const getCacheKey = (url, options = {}) => {
  return `${url}_${JSON.stringify(options)}`;
};

// Utility function to check if cache is valid
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < config.CACHE_DURATION;
};

// Enhanced error handling
const handleResponse = async (response) => {
  if (config.DEBUG) {
    console.log('API Response:', response.status, response.statusText);
  }
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If JSON parsing fails, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    
    if (config.DEBUG) {
      console.error('API Error:', {
        url: response.url,
        status: response.status,
        message: errorMessage
      });
    }
    
    throw error;
  }
  
  const data = await response.json();
  if (config.DEBUG) {
    console.log('API Success:', data);
  }
  return data;
};

// Enhanced fetch with retry logic
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

// Cached fetch function
const cachedFetch = async (url, options = {}) => {
  const cacheKey = getCacheKey(url, options);
  const cached = cache.get(cacheKey);
  
  // Return cached data if valid and method is GET
  if (cached && (!options.method || options.method === 'GET') && isCacheValid(cached.timestamp)) {
    if (config.DEBUG) {
      console.log('Returning cached data for:', url);
    }
    return cached.data;
  }
  
  try {
    const response = await fetchWithRetry(url, options);
    const data = await handleResponse(response);
    
    // Cache successful GET requests
    if (!options.method || options.method === 'GET') {
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }
    
    return data;
  } catch (error) {
    // Clear cache for this request if it fails
    cache.delete(cacheKey);
    throw error;
  }
};

// User API functions
export const userApi = {
  // Register a new user
  register: async (userData) => {
    return cachedFetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    if (config.DEBUG) {
      console.log('Attempting login with:', credentials);
      console.log('API URL:', `${API_BASE_URL}/users/login`);
    }
    
    return cachedFetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get user by ID
  getById: async (userId) => {
    return cachedFetch(`${API_BASE_URL}/users/${userId}`);
  }
};

// Ride API functions
export const rideApi = {
  // Create a new ride
  create: async (rideData) => {
    const response = await fetch(`${API_BASE_URL}/rides?driverId=${rideData.driverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rideData),
    });
    return handleResponse(response);
  },

  // Get all rides
  getAll: async () => {
    const data = await cachedFetch(`${API_BASE_URL}/rides`);
    
    // Handle both direct array and object with rides property
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data && Array.isArray(data.rides)) {
      return data.rides;
    }
    
    if (data && typeof data.count === 'number' && Array.isArray(data.rides)) {
      return data.rides;
    }
    
    return [];
  },

  // Search rides
  search: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    const data = await cachedFetch(`${API_BASE_URL}/rides/search?${queryString}`);
    
    // Handle both direct array and object with rides property
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data && Array.isArray(data.rides)) {
      return data.rides;
    }
    
    return [];
  },

  // Get ride by ID
  getById: async (rideId) => {
    const data = await cachedFetch(`${API_BASE_URL}/rides/${rideId}`);
    
    // Handle potential response wrapping
    if (data && data.ride) {
      return data.ride;
    }
    
    return data;
  },

  // Get rides by driver
  getByDriver: async (driverId) => {
    const data = await cachedFetch(`${API_BASE_URL}/rides/driver/${driverId}`);
    
    // Handle both direct array and object with rides property
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data && Array.isArray(data.rides)) {
      return data.rides;
    }
    
    return [];
  }
};

// Booking API functions
export const bookingApi = {
  // Create a new booking
  create: async (bookingData) => {
    return cachedFetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Get user's bookings
  getUserBookings: async (userId) => {
    return cachedFetch(`${API_BASE_URL}/bookings/user/${userId}`);
  },

  // Get bookings for a ride
  getRideBookings: async (rideId) => {
    return cachedFetch(`${API_BASE_URL}/bookings/ride/${rideId}`);
  },

  // Get bookings for a ride (alias for compatibility)
  getByRide: async (rideId) => {
    return cachedFetch(`${API_BASE_URL}/bookings/ride/${rideId}`);
  },

  // Update booking status
  updateStatus: async (bookingId, status, userId) => {
    return cachedFetch(`${API_BASE_URL}/bookings/${bookingId}/status?status=${status}&userId=${userId}`, {
      method: 'PUT',
    });
  }
};

// Health check
export const healthApi = {
  check: async () => {
    return cachedFetch(`${API_BASE_URL}/health`);
  },
};

// Utility to clear cache
export const clearCache = () => {
  cache.clear();
  if (config.DEBUG) {
    console.log('API cache cleared');
  }
};
