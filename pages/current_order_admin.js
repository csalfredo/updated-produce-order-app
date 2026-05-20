import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../src/components/Navbar';
import axiosInstance from '../src/components/axios';
import { authService } from '../src/components/auth';
import { useProduce } from '../src/components/context/ProduceContext';
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
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';

export default function CurrentOrderAdmin() {
  const router = useRouter();
  const { setAuthMessage } = useProduce();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const user = await authService.checkAuth();
        if (!user || typeof user !== 'object') {
          setAuthMessage('Your session has expired. Please sign in again.');
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
            setAuthMessage('Your session has expired. Please sign in again.');
            router.replace('/login');
            return;
          }
          setError(
            e.response?.data?.message ??
              e.message ??
              'Could not load orders',
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
  }, [router, setAuthMessage]);

  const formatDate = (iso) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const formatMoney = (amount) =>
    Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const sortedOrders = useMemo(
    () =>
      [...orders].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      ),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedOrders;
    return sortedOrders.filter((order) => {
      const email = order.user?.email?.toLowerCase() ?? '';
      const id = String(order.id);
      return email.includes(q) || id.includes(q);
    });
  }, [sortedOrders, searchQuery]);

  const renderLineItems = (items, compact = false) => {
    if (!items?.length) {
      return (
        <Typography variant="body2" color="text.secondary">
          No line items recorded.
        </Typography>
      );
    }

    if (compact) {
      return (
        <ul className="divide-y divide-gray-100">
          {items.map((line) => (
            <li key={line.id} className="py-2 flex justify-between gap-3 text-sm">
              <span className="capitalize font-medium">{line.name}</span>
              <span className="text-gray-600 shrink-0">
                {line.quantity} × ${formatMoney(line.price)}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return (
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
            {items.map((line) => (
              <TableRow key={line.id}>
                <TableCell className="capitalize">{line.name}</TableCell>
                <TableCell align="right">{line.quantity}</TableCell>
                <TableCell align="right">${formatMoney(line.price)}</TableCell>
                <TableCell align="right">
                  {line.promo_price != null
                    ? `$${formatMoney(line.promo_price)}`
                    : '—'}
                </TableCell>
                <TableCell>{line.product_code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-50">
      <Navbar title="Order history" />

      <main id="main-content" className="max-w-5xl mx-auto px-4 py-6" role="main">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <HistoryIcon sx={{ color: '#166534' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#14532d' }}>
            Order history
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Newest orders first. Search by order # or customer email.
        </Typography>

        {!loading && !error && orders.length > 0 && (
          <TextField
            fullWidth
            size="small"
            placeholder="Search by order # or email…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 3, maxWidth: 400, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {!loading && error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && orders.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No orders yet. Customer orders will appear here after they submit from the produce page.
            </Typography>
          </Paper>
        )}

        {!loading && !error && orders.length > 0 && filteredOrders.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No orders match &ldquo;{searchQuery}&rdquo;.
            </Typography>
          </Paper>
        )}

        {!loading && !error && filteredOrders.length > 0 && (
          <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              {filteredOrders.map((order) => (
                <Accordion
                  key={order.id}
                  disableGutters
                  sx={{ mb: 1, '&:before': { display: 'none' }, borderRadius: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ width: '100%', pr: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight={600}>Order #{order.id}</Typography>
                        <Chip
                          label={`$${formatMoney(order.total)}`}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {formatDate(order.created_at)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.user?.email ?? `User #${order.user_id}`}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    {renderLineItems(order.items, true)}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {filteredOrders.map((order) => (
                <Paper key={order.id} sx={{ mb: 3, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      bgcolor: '#166534',
                      color: 'white',
                      px: 2,
                      py: 1.5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography fontWeight={600}>Order #{order.id}</Typography>
                    <Typography variant="body2">{formatDate(order.created_at)}</Typography>
                    <Typography variant="body2">
                      {order.user?.email ?? `User #${order.user_id}`}
                    </Typography>
                    <Typography fontWeight={600}>
                      Total: ${formatMoney(order.total)}
                    </Typography>
                  </Box>
                  {renderLineItems(order.items)}
                </Paper>
              ))}
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
              Showing {filteredOrders.length} of {orders.length} orders
            </Typography>
          </>
        )}
      </main>
    </div>
  );
}
