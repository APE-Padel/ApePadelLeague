'use client'

import * as React from 'react';
import { notFound, useRouter } from 'next/navigation';
import { featureFlags } from '@/lib/featureFlags';
import Alert from '@/components/Alert';
import PadelBallLoader from '@/components/PadelBallLoader';
import { USER_ROLES, LOGIN_REASONS } from '@/lib/constants';
import {
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Avatar
} from '@mui/material';

export default function EnterMatchResults() {
  const router = useRouter();
  
  const [user, setUser] = React.useState(null);

  const [teamLogos, setTeamLogos] = React.useState({});
  const [matches, setMatches] = React.useState([]);

  const [rounds, setRounds] = React.useState([]);
  const [roundMatches, setRoundMatches] = React.useState([]);

  const [selectedRound, setSelectedRound] = React.useState({});
  const [selectedMatch, setSelectedMatch] = React.useState({});

  const [homeScore, setHomeScore] = React.useState(0);
  const [awayScore, setAwayScore] = React.useState(0);

  const [isErrorOpen, setIsErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  function goToLogin() {
    const callbackParam = `callbackUrl=${encodeURIComponent('/matches/results')}`;
    const reasonParam = `reason=${LOGIN_REASONS.AUTH_REQUIRED}`;
    router.push(`/auth/login?${callbackParam}&${reasonParam}`);
  }

  async function getActiveSeasonMatches() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/active/matches`, {cache: 'no-store'});
    if (!res.ok)  throw new Error('Failed to fetch matches data');
    return await res.json();
  }

  async function getActiveSeasonTeams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/active/teams`, {cache: 'no-store'});
    if (!res.ok)  throw new Error('Failed to fetch teams data');
    return await res.json();
  }

  async function fetchUser() {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await res.json();

      if (!res.ok || !data.user) {
        goToLogin();
        return;
      }

      if (![USER_ROLES.ADMIN, USER_ROLES.SUBMITTER].includes(data.user.role)) {
        setErrorMessage('No tens permisos per editar resultats.');
        setIsErrorOpen(true);
        return;
      }

      setUser(data.user);
    } catch (error) {
      goToLogin();
    }
  }

  async function fetchData() {
    try {
      setIsLoading(true);
      const tasks = [getActiveSeasonMatches(), getActiveSeasonTeams()];
      const [matchesData, teamsData] = await Promise.all(tasks);

      const teamLogosData = {};
      teamsData.forEach(team => {
        teamLogosData[team._id] = team.logoBase64;
      });
      
      const lastRound = Math.max(...matchesData.map(m => m.round));
      const roundsData = Array.from({ length: lastRound })
        .map((_, i) => ({
          roundId: i + 1,
          displayName: `Jornada ${i + 1}`
        }));

      setTeamLogos(teamLogosData);
      setMatches(matchesData);
      setRounds(roundsData);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }; 

  React.useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  const handleReset = () => {
    setRoundMatches([]);
    setSelectedRound({});
    setSelectedMatch({});
    setHomeScore(0);
    setAwayScore(0);
  }

  const validateScores = () => {
    if (homeScore < 0 || awayScore < 0 || homeScore > 12 || awayScore > 12) {
      setErrorMessage('Els resultats han d\'estar entre 0 i 12.');
      setIsErrorOpen(true);
      return false;
    }
    return true;
  }

  const updateMatchResult = async () => {
    const request = {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId: selectedMatch._id, homeScore, awayScore })
    };

    return await fetch('/api/matches/results', request);
  }

  const handleSave = async () => {
    if (!validateScores()) return;

    setIsLoading(true);
    const res = await updateMatchResult();
    setIsLoading(false);

    if (!res.ok) {
      setErrorMessage('S\'ha produït un error guardant els resultats.');
      setIsErrorOpen(true);
      return;
    }

    setIsSuccessOpen(true);
  }

  const handleRoundChange = (e) => {
    const newRound = e.target.value;
    setSelectedRound(newRound);
    setRoundMatches(matches.filter(m => m.round === newRound.roundId));
  }

  const handleMatchChange = (e) => {
    const newMatch = e.target.value;
    setSelectedMatch(newMatch);
    setHomeScore(newMatch.home.score || 0);
    setAwayScore(newMatch.away.score || 0);
  }

  if (!featureFlags.editResults) {
    return notFound();
  }

  if (isLoading) {
    return (
      <PadelBallLoader />
    );
  }

  return (
    <Box sx={pageStyle}>
      <Paper sx={cardStyle}>
        <Typography variant="h4" sx={titleStyle}>
          EDITAR RESULTATS
        </Typography>

        {/* Filters */}
        <Box sx={formContainerStyle}>
          <FormControl sx={formStyle}>
            <InputLabel sx={dropdownLabelStyle}>Jornada</InputLabel>
            <Select
              sx={dropdownStyle}
              value={selectedRound}
              label="Jornada"
              onChange={handleRoundChange}
              disabled={!user}
            >
              {rounds.map(round => (
                <MenuItem key={round.roundId} value={round}>{round.displayName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={formStyle}>
            <InputLabel sx={dropdownLabelStyle}>Partit</InputLabel>
            <Select
              sx={dropdownStyle}
              value={selectedMatch}
              label="Partit"
              onChange={handleMatchChange}
              disabled={Object.keys(selectedRound).length === 0}
            >
              {roundMatches.map(match => (
                <MenuItem key={match._id} value={match}>
                  {match.home.team.name} vs {match.away.team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Game Display */}
        <Box sx={matchDisplayStyle}>
          {Object.keys(selectedMatch).length !== 0 ? (
            <>
              <TeamCard logoBase64={teamLogos[selectedMatch.home.team._id]} teamName={selectedMatch.home.team.name}/>
              <Typography variant="h5" sx={{ alignSelf: 'center' }}>VS</Typography>
              <TeamCard logoBase64={teamLogos[selectedMatch.away.team._id]} teamName={selectedMatch.away.team.name}/>
            </>
          ) : (
            <Typography sx={matchDisplayMessageStyle}>
              Selecciona una jornada i un partit per veure els equips.
            </Typography>
          )}
        </Box>

        {/* Score Inputs */}
        {Object.keys(selectedMatch).length !== 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Entra els resultats:</Typography>

            <Box sx={resultsContainerStyle}>
              <ResultInput result={homeScore} setResult={setHomeScore} teamName={selectedMatch.home.team.name}/>
              <ResultInput result={awayScore} setResult={setAwayScore} teamName={selectedMatch.away.team.name}/>
            </Box>

            <Box sx={buttonsContainerStyle}>
              <Button variant="outlined" onClick={handleReset} sx={cancelButtonStyle}>Cancel·lar</Button>
              <Button variant="contained" onClick={handleSave} sx={saveButtonStyle}>Guardar</Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Alerts */}
      <Alert severity="error" isOpen={isErrorOpen} setIsOpen={setIsErrorOpen} message={errorMessage} />
      <Alert 
        severity="success" 
        isOpen={isSuccessOpen} 
        setIsOpen={setIsSuccessOpen} 
        message="Els resultats s'han guardat correctament." 
      />
    </Box>
  )
}

/* Components */

function TeamCard({logoBase64, teamName}) {
  return (
    <Box sx={teamStyle}>
      <Avatar
        src={logoBase64 || ''}
        alt={teamName}
        sx={teamLogoStyle}
      />
      <Typography>{teamName}</Typography>
    </Box>
  )
}

function ResultInput({result, setResult, teamName}){
  return (
    <Box sx={{ textAlign: 'center' }}>
      <TextField
        type="number"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        sx={resultInputStyle}
      />
      <Typography sx={{ mt: 1 }}>Punts {teamName}</Typography>
    </Box>
  );
}

/* Styles */
const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 2,
}

const cardStyle = {
  backgroundColor: 'transparent',
  borderRadius: 3,
  border: '2px solid #fff',
  p: { xs: 3, md: 5 },
  width: '100%',
  maxWidth: 600,
  color: '#fff'
}

const titleStyle = {
  textAlign: 'center',
  mb: 4,
  letterSpacing: 1
}

const formContainerStyle = { 
  display: 'flex', 
  gap: 2, 
  flexWrap: 'wrap', 
  mb: 4,
};

const formStyle = {
  flex: 1, 
  minWidth: 150
}

const dropdownStyle = {
  color: '#fff',

  fontSize: { xs: '14px', md: '18px' },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
    borderWidth: { xs: '1px', md: '2px' },
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
    borderWidth: { xs: '1px', md: '2px' },
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
    borderWidth: { xs: '1px', md: '2px' },
  },

  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
    borderWidth: { xs: '1px', md: '2px' }
  },

  '&.Mui-disabled': {
    color: 'rgba(255,255,255,0.5)',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: { xs: '1px', md: '2px' }
    },
  },

  // Dropdown arrow
  '& .MuiSvgIcon-root': { color: '#fff' }
};

const dropdownLabelStyle = {
  color: '#fff', 
  fontSize: { xs: '14px', md: '18px' },
  '&.Mui-focused': { color: '#fff' }
}

const matchDisplayStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: 2,
  borderColor: '#fff',
  border: { xs: '1px solid', md: '2px solid' },
  borderRadius: 2,
  p: 2,
  minHeight: 120
}

const matchDisplayMessageStyle = {
  textAlign: 'center',
  color: '#aaa'
}

const teamStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const teamLogoStyle = {
  width: { xs: 70, md: 90 },
  height: { xs: 70, md: 90 },
  mb: 1
}

const resultsContainerStyle = { 
  display: 'flex', 
  gap: 4, 
  justifyContent: 'center', 
  mb: 4, 
  flexWrap: 'wrap' 
}

const resultInputStyle = {
  width: 80,
  color: '#fff',

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
      borderWidth: { xs: '1px', md: '2px' },
    },
    '&:hover fieldset': { borderColor: '#fff' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
    '&.Mui-disabled fieldset': { borderColor: '#fff' },

    '& input': {
      color: '#fff',
      fontSize: { xs: '22px', md: '28px' },
      textAlign: 'center',
      padding: 1,
      // hide arrows in Chrome, Edge, Safari
      '&::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
      '&::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
    },
  },

  // hide arrows in Firefox
  '& input[type=number]': { MozAppearance: 'textfield' },
};

const buttonsContainerStyle = { 
  display: 'flex', 
  gap: 2, 
  justifyContent: 'center' 
}

const buttonStyle = {
  flex: 1,
  maxWidth: 160,
  fontSize: { xs: '14px', md: '18px' },
  textTransform: 'none',
  px: 3,
  py: 1
}

const cancelButtonStyle = {
  ...buttonStyle,
  borderColor: '#fff',
  color: '#fff',
  '&:hover': {
    borderColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.05)',
  }
}

const saveButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#eee',
  }
}
