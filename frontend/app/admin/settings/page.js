import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Breadcrumbs
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ConstructionIcon from '@mui/icons-material/Construction';
import { featureFlags } from '@/lib/featureFlags';
import { notFound } from 'next/navigation';

export default function SettingsAdmin() {
  if (!featureFlags.adminSettings) {
    return notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
        aria-label="breadcrumb"
      >
        <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Admin
        </Link>
        <Typography color="text.primary">Gestió de Jugadors</Typography>
      </Breadcrumbs>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center'
        }}
      >
        <ConstructionIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Pàgina en Construcció
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Aquesta funcionalitat encara no està implementada.
        </Typography>
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            Tornar a Admin
          </Button>
        </Link>
      </Box>
    </Container>
  );
}