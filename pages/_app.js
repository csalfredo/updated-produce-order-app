import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ProduceProvider } from '../src/components/context/ProduceContext'
// Import Tailwind CSS after Material UI to give it higher specificity
import '../src/styles/globals.css'

// Align MUI with app emerald brand (navbar, checkout, buttons)
const theme = createTheme({
  palette: {
    primary: {
      main: '#166534',
      dark: '#14532d',
      light: '#22c55e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626',
    },
    background: {
      default: '#f0fdf4',
    },
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#14532d',
          },
        },
      },
    },
  },
});

// Make sure to use React.StrictMode
function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProduceProvider>
          <Component {...pageProps} />
        </ProduceProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;