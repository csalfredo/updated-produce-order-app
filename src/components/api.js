// src/components/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

/** Shared client: same origin credentials if you re-enable Sanctum stateful API + CSRF */
const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

export const produceAPI = {
  getAllItems: async () => {
    try {
      const response = await apiClient.get('/api/produce-items');
      console.log('Fetched produce items:', response.data);
      return response.data.items || [];
    } catch (error) {
      console.error('Error fetching produce items:', error);
      throw new Error('Failed to load produce items');
    }
  },

  getItemById: async (id) => {
    try {
      const response = await apiClient.get(`/api/produce-items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching produce item:', error);
      throw new Error('Failed to load produce item');
    }
  },

  updateItemById: async (id, payload) => {
    // CSRF: api/produce-items* is excluded in App\VerifyCsrfToken (Sanctum stateful stack).
    const response = await apiClient.patch(`/api/produce-items/${id}`, payload);
    return response;
  },

  deleteItemById: async (id)=>{
    try{
      const response = await apiClient.delete(`/api/produce-items/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting produce item:', error);
      throw new Error('Failed to delete produce item');
    }
  }
};