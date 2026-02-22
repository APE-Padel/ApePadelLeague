'use client';

import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import BalanceIcon from '@mui/icons-material/Balance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

const features = [
  {
    icon: CalendarMonthIcon,
    title: 'Calendari de Partits',
    description: 'Consulta tots els partits programats i els resultats',
    href: '/calendar',
    color: '#9a1717',
    textColor: '#ffffff'
  },
  {
    icon: EmojiEventsIcon,
    title: 'Classificació',
    description: 'Segueix la classificació dels equips en temps real',
    href: '/standings',
    color: '#9a1717',
    textColor: '#ffffff'
  },
  {
    icon: GroupsIcon,
    title: 'Equips',
    description: 'Coneix els equips i jugadors participants',
    href: '/teams',
    color: '#9a1717',
    textColor: '#ffffff'
  },
  {
    icon: BalanceIcon,
    title: 'Reglament',
    description: 'Consulta el reglament de la lliga',
    href: '/rules',
    color: '#9a1717',
    textColor: '#ffffff'
  }
];

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #b71c1c 0%, #000000 100%)',
          color: 'white',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={visible} timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <Zoom in={visible} timeout={1500}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    mb: 3,
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' }
                    }
                  }}
                >
                  <Image
							    	src="/logo.png"
							    	alt="Logo"
							    	width={200}
							    	height={200}
							    	priority
							    />
                </Box>
              </Zoom>
              
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '3rem', md: '5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '2px'
                }}
              >
                APE PADEL LEAGUE
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 300,
                  maxWidth: 600,
                  mx: 'auto',
                  opacity: 0.95
                }}
              >
                La lliga de pàdel més emocionant. Segueix els partits, resultats i classificacions en temps real.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/calendar" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: '#c62828',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: 6
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    Veure Calendari
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/ape_padel" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<InstagramIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: '#E1306C',
                      borderColor: '#E1306C',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      ml: 2,
                      '&:hover': {
                        bgcolor: '#E1306C',
                        color: 'white',
                        borderColor: '#E1306C',
                        boxShadow: 6
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    Instagram
                  </Button>
                </Link>
              </Box>
            </Box>
          </Fade>
        </Container>
        
        {/* Animated Background Balls */}
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
            top: '10%',
            right: '10%',
            animation: 'float 4s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
            bottom: '15%',
            left: '5%',
            animation: 'float 5s ease-in-out infinite',
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Slide direction="up" in={visible} timeout={1000}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            color='#ffffff'
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Descobreix la Lliga
          </Typography>
        </Slide>

        <Stack spacing={4}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isEven = index % 2 === 0;
            return (
              <Zoom in={visible} timeout={1000 + index * 200} key={index}>
                <Link href={feature.href} style={{ textDecoration: 'none' }}>
                  <Card
                    elevation={3}
                    sx={{
                      width: '100%',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: isEven 
                        ? `linear-gradient(to right, transparent 0%, ${feature.color}90 100%)`
                        : `linear-gradient(to left, transparent 0%, ${feature.color}90 100%)`,
                      '&:hover': {
                        transform: 'translateX(' + (isEven ? '8px' : '-8px') + ')',
                        boxShadow: 8,
                        '& .feature-icon': {
                          transform: 'scale(1.2) rotate(5deg)',
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          flexDirection: isEven ? 'row' : 'row-reverse',
                          minHeight: 180
                        }}
                      >
                        <Box
                          className="feature-icon"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 200,
                            height: '100%',
                            flexShrink: 0,
                            transition: 'transform 0.3s',
                          }}
                        >
                          <IconComponent 
                            sx={{ 
                              fontSize: 80, 
                              color: feature.textColor,
                            }} 
                          />
                        </Box>
                        <Box sx={{ flex: 1, p: 4 }}>
                          <Typography 
                            variant="h4" 
                            component="h3" 
                            gutterBottom 
                            fontWeight={700} 
                            color={feature.textColor}
                            align={isEven ? 'right' : 'left'}
                            sx={{ fontSize: { xs: '2rem', md: '2.25rem' } }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            color={feature.textColor}
                            align={isEven ? 'right' : 'left'}
                            sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Zoom>
            );
          })}
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: '#6a1010ff',
          color: 'white',
          py: 8,
          mt: 4
        }}
      >
        <Container maxWidth="md">
          <Fade in={visible} timeout={2000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                Forma part de la lliga
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 300 }}>
                Administra partits, equips i segueix tota l'activitat
              </Typography>
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: '#6a1010ff',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Accedir a Admin
                </Button>
              </Link>
            </Box>
          </Fade>
        </Container>
      </Box>
    {/* Legal Footer */}
    <Box component="footer" sx={{ bgcolor: '#222', color: '#fff', py: 3, textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 1 }}>
          &copy; {new Date().getFullYear()} Ape Padel League. Tots els drets reservats.
        </Typography>
        <Typography variant="body2">
          <Link href="/privacy" style={{ color: '#fff', textDecoration: 'underline', marginRight: 16 }}>Política de Privacitat</Link>
          <Link href="/terms" style={{ color: '#fff', textDecoration: 'underline' }}>Termes i Condicions</Link>
        </Typography>
      </Container>
    </Box>
  </Box>
  );
}