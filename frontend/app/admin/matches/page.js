'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  Breadcrumbs
} from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function RegisterMatch() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    seasonId: '',
    homeTeamId: '',
    awayTeamId: '',
    round: 1,
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, seasonsRes] = await Promise.all([
          fetch('http://localhost:3000/teams'),
          fetch('http://localhost:3000/seasons')
        ]);
        
        const teamsData = await teamsRes.json();
        const seasonsData = await seasonsRes.json();
        
        setTeams(teamsData);
        setSeasons(seasonsData);
        
        // Set active season as default if exists
        const activeSeason = seasonsData.find(s => s.isActive);
        if (activeSeason) {
          setFormData(prev => ({ ...prev, seasonId: activeSeason._id }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error carregant les dades');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.seasonId) {
      setError('Selecciona una temporada');
      return;
    }
    if (!formData.homeTeamId || !formData.awayTeamId) {
      setError('Selecciona ambdós equips');
      return;
    }
    if (formData.homeTeamId === formData.awayTeamId) {
      setError('Els equips han de ser diferents');
      return;
    }
    if (!formData.dateFrom) {
      setError('Selecciona una data');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          season: formData.seasonId,
          round: parseInt(formData.round),
          home: {
            team: formData.homeTeamId
          },
          away: {
            team: formData.awayTeamId
          },
          dateRange: {
            from: formData.dateFrom,
            to: formData.dateTo || formData.dateFrom
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Error creant el partit');
      }

      setSuccess(true);
      
      // Reset form
      setFormData({
        seasonId: formData.seasonId,
        homeTeamId: '',
        awayTeamId: '',
        round: formData.round + 1,
        dateFrom: '',
        dateTo: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/calendar');
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      setError('Error creant el partit. Torna-ho a intentar.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
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
        <Typography color="text.primary">Gestió de Partits</Typography>
      </Breadcrumbs>

      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <SportsTennisIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Gestió de Partits
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Partit creat correctament! Redirigint al calendari...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl fullWidth required>
                <InputLabel>Temporada</InputLabel>
                <Select
                  value={formData.seasonId}
                  label="Temporada"
                  onChange={(e) => setFormData({ ...formData, seasonId: e.target.value })}
                >
                  {seasons.map((season) => (
                    <MenuItem key={season._id} value={season._id}>
                      {season.name} {season.isActive && '(Activa)'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="number"
                label="Ronda"
                value={formData.round}
                onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                required
                inputProps={{ min: 1 }}
              />

              <FormControl fullWidth required>
                <InputLabel>Equip Local</InputLabel>
                <Select
                  value={formData.homeTeamId}
                  label="Equip Local"
                  onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
                >
                  {teams.map((team) => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Equip Visitant</InputLabel>
                <Select
                  value={formData.awayTeamId}
                  label="Equip Visitant"
                  onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
                >
                  {teams.map((team) => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="date"
                label="Data d'Inici"
                value={formData.dateFrom}
                onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                type="date"
                label="Data Final (Opcional)"
                value={formData.dateTo}
                onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                InputLabelProps={{ shrink: true }}
                helperText="Deixa buit si el partit és en una sola data"
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/calendar')}
                  disabled={submitting}
                >
                  Cancel·lar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={24} /> : 'Crear Partit'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
    );
  }