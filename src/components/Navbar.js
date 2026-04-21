import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
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
  Fade,
  Grow,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Inventory as InventoryIcon,
  History as HistoryIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

/** System sans-serif stack: readable in app bars across OS/browser */
const APP_BAR_FONT =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif';

const Navbar = ({title, main}) => {
  const router = useRouter();
  const { inventoryUpdated } = useProduce();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const result = await authService.checkAuth();
      console.log('Authentication check result:', result);
      setIsLoggedIn(!!result);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
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

  const handleInventoryList = () => {
    handleClose();
    router.push('/inventory_list');
  };

  const handleHistoryOrder = () => {
    handleClose();
    router.push('/current_order_admin');
  };

  const handleOrder = () => {
    handleClose();
    router.push('/produceorder');
  };

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
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            {title || 'Produce Order'}
          </Link>
        </Typography>
        
        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {isLoggedIn && (
            <Button 
              color="inherit" 
              component={Link} 
              href="/produceorder"
              sx={{ mr: 2 }}
            >
              Order
            </Button>
          )}
        </Box>
{console.log("inventoryUpdated is ", inventoryUpdated)}
        {/* Hamburger menu button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-controls={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Dropdown menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Grow}
          transitionDuration={300}
          PaperProps={{
            elevation: 3,
            sx: {
              minWidth: 200,
              mt: 1,
              fontFamily: APP_BAR_FONT,
              '& .MuiMenuItem-root': {
                py: 1.5,
                px: 2,
              }
            }
          }}
        >
          {isLoggedIn ? (
            <>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                Logout
              </MenuItem>
              <MenuItem
                onClick={handleInventoryList}
                title={
                  inventoryUpdated
                    ? 'Inventory list has been updated (edits or unsaved changes)'
                    : undefined
                }
              >
                <InventoryIcon sx={{ mr: 2, fontSize: 20 }} />
                Inventory List
                {inventoryUpdated ? ' •' : ''}
              </MenuItem>
              <MenuItem onClick={handleHistoryOrder}>
                <HistoryIcon sx={{ mr: 2, fontSize: 20 }} />
                Order History
              </MenuItem>
              <MenuItem onClick={handleOrder}>
                <ShoppingCartIcon sx={{ mr: 2, fontSize: 20 }} />
                Current Order
              </MenuItem>
            </>
          ) : (
            <MenuItem 
              onClick={handleClose}
              component={Link}
              href="/login"
            >
              Login
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 