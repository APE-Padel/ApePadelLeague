'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const titleFont = '"Tw Cen MT", Arial, sans-serif';
const bodyFont = '"Tw Cen MT Condensed Bold", Arial, sans-serif';

const theme = createTheme({
  palette: {
    primary: {
      main: '#112121',
    }
  },
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: titleFont },
    h2: { fontFamily: titleFont },
    h3: { fontFamily: titleFont },
    h4: { fontFamily: titleFont },
    h5: { fontFamily: titleFont },
    h6: { fontFamily: titleFont }
  }
});

export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
