import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TextField, Button, Box, Container, Typography, Alert, Grid } from '@mui/material';
import { Password } from '@mui/icons-material';
import { authService } from '../src/components/auth';
// import Navbar from '../components/Navbar';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuthenticated = await authService.checkAuth();
        console.log("isAuthenticated=", isAuthenticated);
        if (isAuthenticated && typeof isAuthenticated === 'object') {
          // If user is already logged in, set loggedIn to true and redirect
          setLoggedIn(true);
          router.push('/produceorder');
        } else {
          console.log("Not authenticated");
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);


  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogin = async (credentials) => {
    console.log("1. Starting login attempt...");
    try {
        console.log("2. About to call authService.login");
        const response = await authService.login(credentials);
        console.log("3. Login response:", response);
        console.log("4. Setting loggedIn to true");
        setLoggedIn(true);
        console.log("5. About to redirect");
        window.location.href = '/produceorder';
        console.log("6. After redirect command");
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(error.response?.data?.message || error.message || 'Authentication failed.');
    }
  };

  const handleLoginSuccess = () => {
    const returnPath = localStorage.getItem('returnPath');
    localStorage.removeItem('returnPath'); // Clean up
    
    if (returnPath) {
      router.push(returnPath);
    } else {
      router.push('/produceorder'); // Default redirect
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
        setLoading(false);
        return;
    }

    try {
        console.log('Attempting login...');
        await authService.login(formData);
        console.log('Login successful');
        // Most basic redirect possible
        document.location = '/produceorder';
        
    } catch (err) {
        console.error('Login error:', err);
        setError(err.message || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
      >
      {loggedIn ? console.log("logged in=",loggedIn) : console.log("not logged in=",loggedIn)}

      {/* <Navbar /> */}
      <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
      <div className='border border-gray-300 rounded-md p-8'>     
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>   

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/register" passHref style={{ textDecoration: 'none' }}>
                <Typography color="primary" sx={{ cursor: 'pointer' }}>
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
          </div>
        </Box>
    </Container>
  );
}