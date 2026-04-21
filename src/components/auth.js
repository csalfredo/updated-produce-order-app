import axiosInstance from './axios';

const API_BASE_URL = '';  // Empty string for relative URLs

// Simplify request interceptor to only handle XSRF token
axiosInstance.interceptors.request.use(
  function (config) {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    
    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Simplify response interceptor to only log critical errors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Only log unexpected errors, not 401s which are expected for auth checks
    if (!error.response || error.response.status !== 401) {
      console.error('Unexpected API error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
    }
    return Promise.reject(error);
  }
);

export const authService = {
  getCsrfCookie: async () => {
    try {
      console.log('Fetching CSRF cookie...');
      // Ensure we're using the correct endpoint
      const response = await axiosInstance.get(`/sanctum/csrf-cookie`, {
        withCredentials: true
      });
      console.log('CSRF cookie response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching CSRF cookie:', error);
      console.error('Error details:', {
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data
      });
      throw new Error('Failed to fetch CSRF cookie: ' + (error.response?.data?.message || error.message));
    }
  },

  register: async (userData) => {
    try {
      await authService.getCsrfCookie();
      
      const response = await axiosInstance.post('/register', {
        name: userData.email.split('@')[0],
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation
      });

      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      console.log('Starting login process...');
      console.log('Credentials:', credentials);
      
      await authService.getCsrfCookie();
      
      // Check if credentials is an object with email/password or if they're separate params
      let email, password;
      
      if (typeof credentials === 'object' && credentials !== null) {
        // If credentials is an object (like {email: '...', password: '...'})
        email = credentials.email;
        password = credentials.password;
      } else {
        // If credentials are passed as separate parameters
        email = credentials;
        password = arguments[1];
      }
      
      // Validate input before sending
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Ensure they're strings
      email = String(email);
      password = String(password);
      
      console.log('Sending login request with:', { email });
      
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password
      });
      
      console.log('Login response:', response);
      
      // A 204 response means success but no content
      if (response.status === 204) {
        return true;
      }
      
      // For other successful responses, check for data
      if (!response.data) {
        throw new Error('Unexpected response format from server');
      }
      
      // Handle any token if present
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      console.error('Error details:', {
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data
      });
      
      // Provide a more helpful error message
      if (error.response?.status === 422) {
        throw new Error('Login failed: ' + (error.response?.data?.message || 'Invalid email or password format'));
      }
      
      throw new Error('Login failed');
    }
  },

  logout: async () => {
    try {
      // Remove the /api prefix to be consistent
      await axiosInstance.post('/logout');
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      // First refresh the CSRF cookie to ensure it's valid
      await authService.getCsrfCookie().catch(err => {
        console.warn('Failed to refresh CSRF cookie before auth check:', err);
        // Continue anyway, it might still work
      });
      
      // Make the authenticated request to /user endpoint
      const response = await axiosInstance.get(`/api/user`, {
        withCredentials: true
      });
      
      if (response.data && response.data.id) {
        return response.data;
      }
      return false;
    } catch (error) {
      if (error.response?.status === 401) {
        return false;
      }
      console.error('Unexpected error during auth check:', error);
      return false;
    }
  },

  getXsrfToken: () => {
    const tokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='));
    if (tokenCookie) {
      // First decode the URL encoding, then decode the Base64 if needed
      const token = decodeURIComponent(tokenCookie.split('=')[1]);
      try {
        // Some implementations might double-encode the token
        return decodeURIComponent(token);
      } catch {
        // If the token is not double-encoded, just return it
        return token;
      }
    }
    return null;
  }
};

// Helper function to get cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
};


