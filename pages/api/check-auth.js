// pages/api/check-auth.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Log incoming cookies for debugging
    console.log('Incoming cookies:', req.headers.cookie);
    
    // Forward the cookies to Laravel's user endpoint
    const response = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        'Cookie': req.headers.cookie || '',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': 'http://localhost:3000'
      },
      withCredentials: true,
    });
    
    console.log('Laravel auth response:', response.data);
    
    return res.status(200).json({
      authenticated: true,
      user: response.data
    });
  } catch (error) {
    console.error('Auth check error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    return res.status(error.response?.status || 500).json({ 
      authenticated: false,
      error: error.response?.data || error.message
    });
  }
}