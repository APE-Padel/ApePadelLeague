'use client';

import { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Stack,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SportsIcon from '@mui/icons-material/Sports';
import PadelBallLoader from '@/components/PadelBallLoader';
import { featureFlags } from '@/lib/featureFlags';
import { notFound } from 'next/navigation';

export default function Calendar() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRound, setSelectedRound] = useState('all');
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons/active/matches`);
        const data = await response.json();
        setMatches(data);
        
        // Extract unique rounds and sort them
        const uniqueRounds = [...new Set(data.map(match => match.round))].sort((a, b) => a - b);
        setRounds(uniqueRounds);
        
        // Set current round as default (highest round number)
        if (uniqueRounds.length > 0) {
          setSelectedRound(Math.max(...uniqueRounds));
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString('ca-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    // Capitalize first letter
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'scheduled': return 'info';
      case 'canceled': return 'error';
      case 'postponed': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed': return 'FINALITZAT';
      case 'scheduled': return 'PROGRAMAT';
      case 'canceled': return 'CANCEL·LAT';
      case 'postponed': return 'POSPOSAT';
      default: return status.toUpperCase();
    }
  };

  if (!featureFlags.calendar) {
    return notFound();
  }

  if (loading) {
    return (
      <PadelBallLoader />
    );
  }

  // Filter matches by selected round
  const filteredMatches = selectedRound === 'all' 
    ? matches 
    : matches.filter(match => match.round === selectedRound);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
        Calendari de Partits
      </Typography>

      {/* Round Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Ronda</InputLabel>
          <Select
            value={selectedRound}
            label="Ronda"
            onChange={(e) => setSelectedRound(e.target.value)}
          >
            <MenuItem value="all">Totes les rondes</MenuItem>
            {rounds.map((round) => (
              <MenuItem key={round} value={round}>
                Ronda {round}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Stack spacing={3}>
        {filteredMatches.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            No hi ha partits programats
          </Typography>
        ) : (
          filteredMatches.map((match) => (
            <Card 
              key={match._id} 
              elevation={3}
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ronda {match.round}
                  </Typography>
                  <Chip 
                    label={getStatusLabel(match.status)} 
                    color={getStatusColor(match.status)}
                    size="small"
                  />
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: { xs: 'wrap', md: 'nowrap' }
                  }}
                >
                  {/* Home Team Card */}
                  <Box sx={{ flex: 1, minWidth: 250 }}>
                    <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Stack spacing={2} alignItems="center">
                        <Avatar 
                          src={match.home.team.logoBase64} 
                          sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
                        >
                          <SportsIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography variant="h6" align="center" fontWeight="bold">
                          {match.home.team.name}
                        </Typography>
                        <Divider flexItem />
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Jugadors:
                          </Typography>
                          <Typography variant="body2" align="center">
                            {match.home.team.players && match.home.team.players.length > 0 
                              ? match.home.team.players.join(' - ')
                              : 'Per confirmar'
                            }
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Box>

                  {/* VS and Score Section */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      minWidth: 120,
                      gap: 1
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      fontWeight="bold" 
                      color="primary"
                      sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                    >
                      VS
                    </Typography>
                    {match.status === 'completed' && (
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                          {match.home.score ?? '-'}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">:</Typography>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                          {match.away.score ?? '-'}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Away Team Card */}
                  <Box sx={{ flex: 1, minWidth: 250 }}>
                    <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Stack spacing={2} alignItems="center">
                        <Avatar 
                          src={match.away.team.logoBase64} 
                          sx={{ width: 64, height: 64, bgcolor: 'secondary.main' }}
                        >
                          <SportsIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography variant="h6" align="center" fontWeight="bold">
                          {match.away.team.name}
                        </Typography>
                        <Divider flexItem />
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Jugadors:
                          </Typography>
                          <Typography variant="body2" align="center">
                            {match.away.team.players && match.away.team.players.length > 0 
                              ? match.away.team.players.join(' - ')
                              : 'Per confirmar'
                            }
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6" color="text.primary" fontWeight="medium">
                    📅 {formatDate(match.dateRange.from)}
                    {match.dateRange.to && match.dateRange.from !== match.dateRange.to && 
                      ` - ${formatDate(match.dateRange.to)}`
                    }
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
}
