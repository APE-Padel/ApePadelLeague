'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  CircularProgress,
  Fade,
  Stack
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Equips de la Lliga
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Coneix els {teams.length} equips participants
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {teams.map((team, index) => (
                <Grid item xs={12} sm={6} md={4} key={team._id}>
                  <Fade in={true} timeout={1000 + index * 100}>
                    <Card
                      elevation={4}
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-12px) scale(1.02)',
                          boxShadow: 8,
                          '& .team-avatar': {
                            transform: 'scale(1.1) rotate(5deg)',
                          }
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '5px',
                          background: 'linear-gradient(90deg, #b71c1c 0%, #d32f2f 100%)',
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', pt: 4, pb: 3 }}>
                        <Box
                          className="team-avatar"
                          sx={{
                            display: 'inline-flex',
                            mb: 2,
                            transition: 'transform 0.3s',
                          }}
                        >
                          <Avatar
                            src={team.logoBase64}
                            sx={{
                              width: 100,
                              height: 100,
                              bgcolor: 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)',
                              boxShadow: 3,
                              border: '4px solid white'
                            }}
                          >
                            <GroupsIcon sx={{ fontSize: 50 }} />
                          </Avatar>
                        </Box>

                        <Typography 
                          variant="h5" 
                          component="h2" 
                          gutterBottom 
                          fontWeight={700}
                          sx={{ mb: 2 }}
                        >
                          {team.name}
                        </Typography>

                        {team.court && (
                          <Chip
                            label={`Pista: ${team.court}`}
                            size="small"
                            sx={{
                              mb: 2,
                              bgcolor: '#f5f5f5',
                              fontWeight: 500
                            }}
                          />
                        )}

                        {team.players && team.players.length > 0 && (
                          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                              <PersonIcon sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                                Jugadors
                              </Typography>
                            </Box>
                            <Stack spacing={0.5}>
                              {team.players.map((player, idx) => (
                                <Typography 
                                  key={idx} 
                                  variant="body2" 
                                  color="text.primary"
                                  sx={{ fontWeight: 500 }}
                                >
                                  {player}
                                </Typography>
                              ))}
                            </Stack>
                          </Box>
                        )}

                        {(!team.players || team.players.length === 0) && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Sense jugadors assignats
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {teams.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <GroupsIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" color="text.secondary">
                  No hi ha equips registrats
                </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}