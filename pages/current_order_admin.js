import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../src/components/Navbar';
import axiosInstance from '../src/components/axios';
import { authService } from '../src/components/auth';
import {
  Box,
  CircularProgress,
  Alert,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function CurrentOrderAdmin() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const user = await authService.checkAuth();
        if (!user || typeof user !== 'object') {
          router.replace('/login');
          return;
        }

        const response = await axiosInstance.get('/api/orders', {
          withCredentials: true,
        });

        if (!cancelled) {
          setOrders(response.data?.orders ?? []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          if (e.response?.status === 401) {
            router.replace('/login');
            return;
          }
          setError(
            e.response?.data?.message ??
              e.message ??
              'Could not load orders'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const formatDate = (iso) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Current Order" />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Typography variant="h4" component="h1" className="mb-6 font-semibold">
          Order history
        </Typography>

        {loading && (
          <Box className="flex justify-center py-12">
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {!loading && !error && orders.length === 0 && (
          <Paper className="p-8 text-center text-gray-600">
            No orders found yet. Submit an order from the produce page to see it
            here.
          </Paper>
        )}

        {!loading &&
          !error &&
          orders.length > 0 &&
          orders.map((order) => (
            <Paper key={order.id} className="mb-6 overflow-hidden shadow-sm">
              <Box className="bg-emerald-800 text-white px-4 py-3 flex flex-wrap gap-4 justify-between items-baseline">
                <Typography variant="subtitle1" fontWeight={600}>
                  Order #{order.id}
                </Typography>
                <Typography variant="body2">
                  {formatDate(order.created_at)}
                </Typography>
                <Typography variant="body2">
                  Customer:{' '}
                  <span className="font-medium">
                    {order.user?.email ?? `User #${order.user_id}`}
                  </span>
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  Total: $
                  {Number(order.total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Promo</TableCell>
                      <TableCell>Code</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(order.items ?? []).map((line) => (
                      <TableRow key={line.id}>
                        <TableCell className="capitalize">{line.name}</TableCell>
                        <TableCell align="right">{line.quantity}</TableCell>
                        <TableCell align="right">
                          $
                          {Number(line.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell align="right">
                          {line.promo_price != null
                            ? `$${Number(line.promo_price).toFixed(2)}`
                            : '—'}
                        </TableCell>
                        <TableCell>{line.product_code}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
      </div>
    </div>
  );
}
