// pages/api/send-order.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { items } = req.body;
    
    // Forward all cookies from the client request for authentication
    const cookies = req.headers.cookie;
    
    // Forward the request to your Laravel backend
    const response = await axios.post(
      // Use the direct Laravel endpoint
      'http://localhost:8000/api/send-order', 
      { items },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': cookies, // Forward all cookies for authentication
          'X-Requested-With': 'XMLHttpRequest', // Required by Laravel Sanctum
        },
        withCredentials: true
      }
    );

    return res.status(200).json({ 
      message: 'Order sent successfully!',
      data: response.data 
    });
  } catch (error) {
    console.error('Error sending order:', error.response?.data || error.message);
    
    // Forward the status code from the backend
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || 'Failed to send order';
    
    return res.status(statusCode).json({ 
      message: errorMessage
    });
  }
}