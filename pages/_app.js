import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ProduceProvider } from '../src/components/context/ProduceContext'
// Import Tailwind CSS after Material UI to give it higher specificity
import '../src/styles/globals.css'

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#ffffff',
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