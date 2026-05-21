import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import Navbar from '../src/components/Navbar';
import RegisterForm from './RegisterForm';
import { authService } from '../src/components/auth';

export default function RegisterAdmin() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const user = await authService.checkAuth();
        if (user?.is_admin) {
          setMode('admin-admin');
        } else if (user) {
          router.replace('/produceorder');
          return;
        } else {
          setMode('public-admin');
        }
      } catch {
        setMode('public-admin');
      } finally {
        setChecking(false);
      }
    };

    verifyAccess();
  }, [router]);

  if (checking) {
    return (
      <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#166534' }} />
      </Container>
    );
  }

  if (!mode) {
    return (
      <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">Redirecting…</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0fdf4' }}>
      <Navbar title="Produce Order" />
      <RegisterForm
        mode={mode}
        successRedirect={mode === 'public-admin' ? '/inventory_list' : '/produceorder'}
      />
    </Box>
  );
}
