'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const adminSections = [
  {
    title: 'Gestió d\'Equips',
    description: 'Crear i gestionar equips',
    icon: GroupsIcon,
    href: '/admin/teams',
    color: '#1976d2'
  },
  {
    title: 'Gestió de Partits',
    description: 'Editar i actualitzar partits',
    icon: CalendarMonthIcon,
    href: '/admin/matches',
    color: '#ed6c02'
  },
  {
    title: 'Temporades',
    description: 'Gestionar temporades',
    icon: EmojiEventsIcon,
    href: '/admin/seasons',
    color: '#9c27b0'
  },
  {
    title: 'Jugadors',
    description: 'Gestionar jugadors',
    icon: PersonIcon,
    href: '/admin/players',
    color: '#d32f2f'
  },
  {
    title: 'Configuració',
    description: 'Ajustos generals',
    icon: SettingsIcon,
    href: '/admin/settings',
    color: '#757575'
  }
];

export default function AdminPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Panell d'Administració
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Selecciona una opció per gestionar la lliga
      </Typography>

      <Grid container spacing={3}>
        {adminSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={section.href}>
              <Link href={section.href} style={{ textDecoration: 'none' }}>
                <Card 
                  elevation={2}
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '50%',
                          bgcolor: `${section.color}15`,
                          mb: 2
                        }}
                      >
                        <IconComponent 
                          sx={{ 
                            fontSize: 48, 
                            color: section.color 
                          }} 
                        />
                      </Box>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {section.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {section.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}