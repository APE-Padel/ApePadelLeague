'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Modal,
  TextField,
  Stack,
  Alert,
  IconButton,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PadelBallLoader from '@/components/PadelBallLoader';
import { featureFlags } from '@/lib/featureFlags';
import { notFound } from 'next/navigation';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function TeamsAdmin() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    court: '',
    players: ''
  });

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Error carregant els equips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ name: '', court: '', players: '' });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('El nom de l\'equip és obligatori');
      return;
    }

    setSubmitting(true);

    try {
      const playersArray = formData.players
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          court: formData.court.trim() || undefined,
          players: playersArray.length > 0 ? playersArray : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Error creant l\'equip');
      }

      setSuccess('Equip creat correctament!');
      setFormData({ name: '', court: '', players: '' });
      
      // Refresh teams list
      await fetchTeams();
      
      // Close modal after 1 second
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setError('Error creant l\'equip. Torna-ho a intentar.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!featureFlags.adminTeams) {
    return notFound();
  }

  if (loading) {
    return (
      <PadelBallLoader />
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestió d'Equips
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Crear Equip
        </Button>
      </Box>

      {teams.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No hi ha equips registrats
        </Typography>
      ) : (
        <List>
          {teams.map((team, index) => (
            <Box key={team._id}>
              <ListItem>
                <ListItemText
                  primary={team.name}
                  secondary={
                    <>
                      {team.court && `Pista: ${team.court}`}
                      {team.players && team.players.length > 0 && (
                        <Box component="span" display="block">
                          Jugadors: {team.players.join(' - ')}
                        </Box>
                      )}
                    </>
                  }
                />
              </ListItem>
              {index < teams.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}

      {/* Create Team Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Crear Nou Equip
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Nom de l'Equip"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                autoFocus
              />

              <TextField
                fullWidth
                label="Pista (Opcional)"
                value={formData.court}
                onChange={(e) => setFormData({ ...formData, court: e.target.value })}
              />

              <TextField
                fullWidth
                label="Jugadors (Opcional)"
                value={formData.players}
                onChange={(e) => setFormData({ ...formData, players: e.target.value })}
                helperText="Separa els noms amb comes (ex: Joan, Maria)"
                multiline
                rows={2}
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel·lar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={24} /> : 'Crear'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Container>
  );
}