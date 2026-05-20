import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { authService } from './auth';
import { useProduce } from './context/ProduceContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grow,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Inventory as InventoryIcon,
  History as HistoryIcon,
  ShoppingCart as ShoppingCartIcon,
  PersonAdd as PersonAddIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

const APP_BAR_FONT =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif';

const navButtonSx = {
  color: 'inherit',
  textTransform: 'none',
  fontWeight: 500,
  fontFamily: APP_BAR_FONT,
};

const Navbar = ({ title }) => {
  const router = useRouter();
  const { inventoryUpdated, isLoggedIn, isAdmin } = useProduce();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    try {
      await authService.logout();
      handleClose();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (path) => {
    handleClose();
    router.push(path);
  };

  const inventoryLabel = inventoryUpdated ? 'Inventory (updated)' : 'Inventory';

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#166534',
        color: '#fff',
        fontFamily: APP_BAR_FONT,
        '& .MuiTypography-root, & .MuiButton-root': {
          fontFamily: APP_BAR_FONT,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href={isLoggedIn ? '/produceorder' : '/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title || 'Produce Order'}
          </Link>
        </Typography>

        {isLoggedIn && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <Button
              color="inherit"
              component={Link}
              href="/produceorder"
              sx={navButtonSx}
              startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
            >
              Place order
            </Button>
            {isAdmin && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  href="/inventory_list"
                  sx={navButtonSx}
                  startIcon={<InventoryIcon sx={{ fontSize: 18 }} />}
                >
                  {inventoryLabel}
                </Button>
                {inventoryUpdated && (
                  <Chip
                    label="Updated"
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      bgcolor: '#fbbf24',
                      color: '#14532d',
                      fontWeight: 700,
                    }}
                  />
                )}
                <Button
                  color="inherit"
                  component={Link}
                  href="/current_order_admin"
                  sx={navButtonSx}
                  startIcon={<HistoryIcon sx={{ fontSize: 18 }} />}
                >
                  Order history
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/register-user"
                  sx={navButtonSx}
                  startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
                >
                  Add user
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/register-admin"
                  sx={navButtonSx}
                  startIcon={<AdminPanelSettingsIcon sx={{ fontSize: 18 }} />}
                >
                  Add admin
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout} sx={navButtonSx} startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}>
              Logout
            </Button>
          </Box>
        )}

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="Open menu"
          aria-controls={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ ml: 1, display: { xs: 'inline-flex', md: isLoggedIn ? 'none' : 'inline-flex' } }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Grow}
          transitionDuration={300}
          PaperProps={{
            elevation: 3,
            sx: {
              minWidth: 220,
              mt: 1,
              fontFamily: APP_BAR_FONT,
              '& .MuiMenuItem-root': { py: 1.5, px: 2 },
            },
          }}
        >
          {isLoggedIn ? (
            [
              <MenuItem key="place-order" onClick={() => goTo('/produceorder')}>
                <ShoppingCartIcon sx={{ mr: 2, fontSize: 20 }} />
                Place order
              </MenuItem>,
              isAdmin && (
                <MenuItem key="inventory-list" onClick={() => goTo('/inventory_list')}>
                  <InventoryIcon sx={{ mr: 2, fontSize: 20 }} />
                  {inventoryLabel}
                  {inventoryUpdated && (
                    <Chip label="Updated" size="small" sx={{ ml: 1, height: 20, fontSize: '0.65rem' }} color="warning" />
                  )}
                </MenuItem>
              ),
              isAdmin && (
                <MenuItem key="order-history" onClick={() => goTo('/current_order_admin')}>
                  <HistoryIcon sx={{ mr: 2, fontSize: 20 }} />
                  Order history
                </MenuItem>
              ),
              isAdmin && (
                <MenuItem key="register-user" onClick={() => goTo('/register-user')}>
                  <PersonAddIcon sx={{ mr: 2, fontSize: 20 }} />
                  Add user
                </MenuItem>
              ),
              isAdmin && (
                <MenuItem key="register-admin" onClick={() => goTo('/register-admin')}>
                  <AdminPanelSettingsIcon sx={{ mr: 2, fontSize: 20 }} />
                  Add admin
                </MenuItem>
              ),
              <MenuItem key="logout" onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                Logout
              </MenuItem>,
            ]
          ) : (
            [
              <MenuItem key="login" onClick={() => goTo('/login')}>
                Sign in
              </MenuItem>,
              <MenuItem key="register" onClick={() => goTo('/register')}>
                Register
              </MenuItem>,
            ]
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
