'use client';

import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function Calendar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ mt: 6 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 0, md: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: 6, px: { xs: 2, md: 0 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: '#ffffff',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: '2rem', md: '3.75rem' }
            }}
          >
            Calendari de Partits
          </Typography>
          <Typography variant="h6" color="white" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Consulta el calendari de la temporada
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', pr: { xs: 3, md: 0 } }}>
          <img
            src={isSmallScreen 
              ? "/calendar-vertical-mobile-view.png" 
              : "/calendar-horizontal-pc-view.png"
            }
            alt="Calendar"
            style={{
              width: isSmallScreen ? '80%' : 'auto',
              maxWidth: isSmallScreen ? '80%' : '100%',
              height: isSmallScreen ? 'auto' : 'auto',
              display: 'block',
              objectFit: isSmallScreen ? 'contain' : 'contain',
              objectPosition: 'center'
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
