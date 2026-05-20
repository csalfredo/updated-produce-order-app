// pages/api/proxy-order.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1. Get all cookies from the incoming request
    const cookieHeader = req.headers.cookie || '';
    console.log('Cookies received from browser:', cookieHeader);
    
    // 2. Check specifically for Laravel session cookies (laravel_session and XSRF-TOKEN)
    const hasCookies = cookieHeader.includes('laravel_session') || cookieHeader.includes('XSRF-TOKEN');
    console.log('Has Laravel cookies:', hasCookies);
    
    // 3. Extract XSRF token if present (Laravel requires this in a header)
    let xsrfToken = '';
    const xsrfMatch = cookieHeader.match(/XSRF-TOKEN=([^;]+)/);
    if (xsrfMatch) {
      xsrfToken = decodeURIComponent(xsrfMatch[1]);
      console.log('Found XSRF token:', xsrfToken);
    } else {
      console.warn('No XSRF token found in cookies');
    }

    // 4. Make the request to Laravel, ensuring cookies are forwarded
    const response = await axios.post(
      'http://127.0.0.1:8000/api/orders',
      {
        items: req.body.items || []
      },
      {
        headers: {
          // Forward all cookies exactly as received
          'Cookie': cookieHeader,
          
          // Set the XSRF token in the header Laravel expects
          'X-XSRF-TOKEN': xsrfToken,
          
          // Headers that Laravel expects for API requests
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Referer': 'http://localhost:3000'
        },
        // Critical flag to allow cookie transmission
        withCredentials: true
      }
    );
    
    console.log('Order successful with status:', response.status);
    return res.status(200).json(response.data);
    
  } catch (error) {
    console.error('Order submission error:', error.message);
    
    // Determine the exact cause of the error
    if (error.response) {
      // The Laravel server returned an error response
      console.error('Laravel error response:', {
        status: error.response.status,
        data: error.response.data
      });
      
      // If Laravel returns a specific error about authentication or CSRF
      if (error.response.status === 419) {
        return res.status(419).json({
          message: 'CSRF token mismatch. You may need to login again.',
          error: error.response.data
        });
      } else if (error.response.status === 401) {
        return res.status(401).json({
          message: 'Not authenticated. Please login to Laravel first.',
          error: error.response.data
        });
      }
      
      const data = error.response.data;
      const message =
        data?.message ||
        (data?.errors && Object.values(data.errors).flat()[0]) ||
        'Order could not be placed';

      return res.status(error.response.status).json({
        message,
        error: data,
      });
    } else {
      // Network error or other issue
      return res.status(500).json({
        message: 'Error communicating with Laravel server',
        error: error.message
      });
    }
  }
}