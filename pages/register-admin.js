import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import Navbar from '../src/components/Navbar';
import RegisterForm from './RegisterForm';
import { authService } from '../src/components/auth';

export default function RegisterAdmin() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const user = await authService.checkAuth();
        if (user?.is_admin) {
          setAllowed(true);
        } else if (user) {
          router.replace('/produceorder');
        } else {
          router.replace('/login');
        }
      } catch {
        router.replace('/login');
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, [router]);

  if (checking) {
    return (
      <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#166534' }} />
      </Container>
    );
  }

  if (!allowed) {
    return (
      <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">Redirecting…</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0fdf4' }}>
      <Navbar title="Produce Order" />
      <RegisterForm mode="admin-admin" />
    </Box>
  );
}
