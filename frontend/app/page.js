'use client';

import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  Button,
  Card,
  CardContent,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import BalanceIcon from '@mui/icons-material/Balance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

// Point 3 — each card gets a distinct red shade
const features = [
  {
    icon: CalendarMonthIcon,
    title: 'Calendari de Partits',
    description: 'Consulta tots els partits programats i els resultats',
    href: '/calendar',
    color: '#7a1212',
    textColor: '#ffffff'
  },
  {
    icon: EmojiEventsIcon,
    title: 'Classificació',
    description: 'Segueix la classificació dels equips en temps real',
    href: '/standings',
    color: '#8e1515',
    textColor: '#ffffff'
  },
  {
    icon: GroupsIcon,
    title: 'Equips',
    description: 'Coneix els equips i jugadors participants',
    href: '/teams',
    color: '#a32020',
    textColor: '#ffffff'
  },
  {
    icon: BalanceIcon,
    title: 'Reglament',
    description: 'Consulta el reglament de la lliga',
    href: '/rules',
    color: '#b52828',
    textColor: '#ffffff'
  }
];

// Point 4 — reusable stat cell for the stats strip
function StatItem({ label, value }) {
  return (
    <Box sx={{ textAlign: 'center', minWidth: { xs: '70px', sm: '90px' } }}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#fff', lineHeight: 1 }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          opacity: 0.6,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: { xs: '0.6rem', md: '0.7rem' },
          display: 'block',
          mt: 0.5
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);

  // Point 4 — live stats fetched from backend
  const [stats, setStats] = useState({
    teams: null,
    completedMatches: null,
    totalMatches: null,
    seasonName: null,
  });

  useEffect(() => {
    setVisible(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    Promise.all([
      fetch(`${baseUrl}/seasons/active/teams`, { cache: 'no-store' }).then(r => r.ok ? r.json() : []),
      fetch(`${baseUrl}/seasons/active/matches`, { cache: 'no-store' }).then(r => r.ok ? r.json() : []),
      fetch(`${baseUrl}/seasons`, { cache: 'no-store' }).then(r => r.ok ? r.json() : []),
    ]).then(([teams, matches, seasons]) => {
      const activeSeason = Array.isArray(seasons) ? seasons.find(s => s.isActive) : null;
      setStats({
        teams: Array.isArray(teams) ? teams.length : null,
        completedMatches: Array.isArray(matches)
          ? matches.filter(m => m.status === 'completed').length
          : null,
        totalMatches: Array.isArray(matches) ? matches.length : null,
        seasonName: activeSeason?.name ?? null,
      });
    }).catch(() => {
      // Stats are decorative — fail silently
    });
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
          // Extra bottom padding so content stays clear of the wave
          pb: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={visible} timeout={1000}>
            <Box sx={{ textAlign: 'center', px: { xs: 2, sm: 0 } }}>
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
                    style={{ width: 'clamp(110px, 18vw, 200px)', height: 'auto' }}
                  />
                </Box>
              </Zoom>

              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: { xs: '1px', md: '2px' }
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
                  opacity: 0.95,
                  fontSize: { xs: '0.95rem', sm: '1.15rem', md: '1.5rem' }
                }}
              >
                La lliga de pàdel més emocionant. Segueix els partits, resultats i classificacions en temps real.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'stretch',
                  maxWidth: { xs: '300px', sm: 'unset' },
                  mx: 'auto',
                }}
              >
                <Link href="/calendar" style={{ textDecoration: 'none', display: 'flex' }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: 'white',
                      color: '#c62828',
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '1rem', md: '1.1rem' },
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
              </Box>
            </Box>
          </Fade>
        </Container>

        {/* Animated Background Orbs */}
        <Box sx={{ position: 'absolute', width: { xs: '100px', md: '200px' }, height: { xs: '100px', md: '200px' }, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', top: '10%', right: '10%', animation: 'float 4s ease-in-out infinite' }} />
        <Box sx={{ position: 'absolute', width: { xs: '80px', md: '150px' }, height: { xs: '80px', md: '150px' }, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', bottom: '20%', left: '5%', animation: 'float 5s ease-in-out infinite' }} />

        {/* Point 2 — SVG wave divider: fills to rgba(0,0,0,0.82) matching the stats strip */}
        <Box
          component="svg"
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          sx={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            height: { xs: '45px', md: '70px' },
            display: 'block',
            zIndex: 2,
          }}
        >
          <path
            d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z"
            fill="rgba(0,0,0,0.82)"
          />
        </Box>
      </Box>

      {/* Point 4 — Stats Strip */}
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.82)', color: 'white', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="md">
          <Fade in={visible} timeout={1500}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 3, sm: 5, md: 6 },
                flexWrap: 'wrap',
              }}
            >
              {stats.seasonName && (
                <>
                  <StatItem label="Temporada" value={stats.seasonName} />
                  <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', display: { xs: 'none', sm: 'block' } }} />
                </>
              )}
              <StatItem label="Equips" value={stats.teams ?? '—'} />
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', display: { xs: 'none', sm: 'block' } }} />
              <StatItem label="Partits jugats" value={stats.completedMatches ?? '—'} />
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', display: { xs: 'none', sm: 'block' } }} />
              <StatItem label="Total partits" value={stats.totalMatches ?? '—'} />
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Slide direction="up" in={visible} timeout={1000}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            color="#ffffff"
            sx={{ mb: { xs: 4, md: 6 }, fontWeight: 700, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' } }}
          >
            Descobreix la Lliga
          </Typography>
        </Slide>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Zoom in={visible} timeout={1000 + index * 200} key={index}>
                <Link href={feature.href} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
                  <Card
                    elevation={3}
                    sx={{
                      width: '100%',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${feature.color}cc 0%, ${feature.color} 100%)`,
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: 8,
                        '& .feature-icon': {
                          transform: 'scale(1.2) rotate(5deg)',
                        }
                      }
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        '&:last-child': { pb: { xs: 3, md: 4 } }
                      }}
                    >
                      <Box
                        className="feature-icon"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, transition: 'transform 0.3s' }}
                      >
                        <IconComponent sx={{ fontSize: { xs: 52, md: 68 }, color: feature.textColor }} />
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        fontWeight={700}
                        color={feature.textColor}
                        sx={{ fontSize: { xs: '1.15rem', md: '1.4rem' } }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={feature.textColor}
                        sx={{ opacity: 0.9, fontSize: { xs: '0.875rem', md: '1rem' } }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Zoom>
            );
          })}
        </Box>
      </Container>

      {/* Point 5 — Social / Follow CTA (replaces admin CTA) */}
      <Box sx={{ bgcolor: '#6a1010', color: 'white', py: { xs: 6, md: 8 }, mt: 4 }}>
        <Container maxWidth="sm">
          <Fade in={visible} timeout={2000}>
            <Box sx={{ textAlign: 'center', px: { xs: 2, sm: 0 } }}>
              <InstagramIcon sx={{ fontSize: { xs: 52, md: 68 }, mb: 1.5, color: '#E1306C' }} />
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                fontWeight={700}
                sx={{ fontSize: { xs: '1.6rem', md: '2.125rem' } }}
              >
                Segueix-nos a Instagram
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: 300, opacity: 0.85, fontSize: { xs: '1rem', md: '1.2rem' } }}
              >
                Resultats, novetats i moments destacats de la lliga
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, opacity: 0.55, letterSpacing: '0.06em', fontSize: { xs: '0.9rem', md: '1rem' } }}
              >
                @ape_padel
              </Typography>
              <Link
                href="https://www.instagram.com/ape_padel"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<InstagramIcon />}
                  sx={{
                    bgcolor: '#E1306C',
                    color: 'white',
                    px: { xs: 4, md: 5 },
                    py: 1.5,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    '&:hover': {
                      bgcolor: '#c9215a',
                      transform: 'translateY(-2px)',
                      boxShadow: 6
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Segueix-nos
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
          <Typography
            variant="body2"
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}
          >
            <Link href="/privacy" style={{ color: '#fff', textDecoration: 'underline' }}>
              Política de Privacitat
            </Link>
            <Link href="/terms" style={{ color: '#fff', textDecoration: 'underline' }}>
              Termes i Condicions
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
