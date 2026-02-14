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

        <Box sx={{ display: 'flex', justifyContent: 'center' , mt: -40, pt:-20, overflow: 'hidden' }}>
          <img
            src={isSmallScreen 
              ? "/Calendari_Fons Transparent_1 Columna.png" 
              : "/Calendari_Fons Transparent_3 Columnes.png"
            }
            alt="Calendar"
            style={{
              width: isSmallScreen ? '100vw' : 'auto',
              maxWidth: isSmallScreen ? 'none' : '100%',
              height: isSmallScreen ? 'auto' : 'auto',
              display: 'block',
              objectFit: isSmallScreen ? 'cover' : 'contain',
              objectPosition: 'center'
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
