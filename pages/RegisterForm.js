import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Alert,
} from '@mui/material';
import { authService } from '../src/components/auth';
import { useProduce } from '../src/components/context/ProduceContext';

const initialForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

/**
 * Shared registration UI.
 * @param {'public'|'public-admin'|'admin-user'|'admin-admin'} mode
 *   - public: customer self-registration
 *   - public-admin: guest self-registration as admin
 *   - admin-user: admin creates a customer account
 *   - admin-admin: admin creates another admin account
 */
export default function RegisterForm({
  mode = 'public',
  title,
  subtitle,
  successRedirect = '/produceorder',
}) {
  const router = useRouter();
  const { refreshAuth } = useProduce();
  const isPublicAdmin = mode === 'public-admin';
  const isAdminCreateUser = mode === 'admin-user';
  const isAdminCreateAdmin = mode === 'admin-admin';

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const heading =
    title ||
    (isAdminCreateAdmin
      ? 'Add admin user'
      : isPublicAdmin
        ? 'Register as admin'
        : isAdminCreateUser
          ? 'Add user'
          : 'Create your account');
  const subheading =
    subtitle ||
    (isAdminCreateAdmin
      ? 'New admins can manage inventory and view all orders.'
      : isPublicAdmin
        ? 'Create an admin account to manage inventory and orders.'
        : isAdminCreateUser
          ? 'Create a customer account so they can sign in and place orders.'
          : 'Register to place produce orders.');

  const validateForm = () => {
    const nextErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      nextErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!formData.password_confirmation) {
      nextErrors.password_confirmation = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.password_confirmation) {
      nextErrors.password_confirmation = 'Passwords do not match';
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isPublicAdmin) {
        await authService.registerAdminPublic(formData);
        await refreshAuth();
        router.push(successRedirect);
      } else if (isAdminCreateAdmin) {
        await authService.registerAdmin(formData);
        setSuccess('Admin account created successfully.');
        setFormData(initialForm);
      } else if (isAdminCreateUser) {
        await authService.registerUserByAdmin(formData);
        setSuccess('User account created successfully. They can sign in with the email and password you set.');
        setFormData(initialForm);
      } else {
        await authService.register(formData);
        await refreshAuth();
        router.push(successRedirect);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
        flexDirection: 'column',
        bgcolor: '#f0fdf4',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box
          className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm w-full"
          sx={{ maxWidth: 420 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Typography component="h1" variant="h5" sx={{ color: '#166534', fontWeight: 700 }}>
              {heading}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center' }}>
              {subheading}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || 'At least 8 characters'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirm password"
              type="password"
              id="password_confirmation"
              autoComplete="new-password"
              value={formData.password_confirmation}
              onChange={handleChange}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading
                ? 'Creating account…'
                : isAdminCreateAdmin || isPublicAdmin
                  ? 'Create admin'
                  : isAdminCreateUser
                    ? 'Create user'
                    : 'Create account'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            {isAdminCreateAdmin || isAdminCreateUser ? (
              <Link href="/inventory_list" style={{ color: '#166534', fontWeight: 600 }}>
                Back to inventory
              </Link>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#166534', fontWeight: 600 }}>
                  Sign in
                </Link>
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
