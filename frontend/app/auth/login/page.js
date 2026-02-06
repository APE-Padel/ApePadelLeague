'use client'

import * as React from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import { featureFlags } from '@/lib/featureFlags';
import { LOGIN_REASONS } from '@/lib/constants';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';


export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const loginReason = searchParams.get('reason') || null;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
	
  const [isErrorOpen, setIsErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isInformationOpen, setIsInformationOpen] = React.useState(false);
  const [informationMessage, setInformationMessage] = React.useState('');

  React.useEffect(() => {
    if (loginReason === LOGIN_REASONS.AUTH_REQUIRED) {
      setInformationMessage('Has de iniciar sessió per accedir a aquesta pàgina.');
      setIsInformationOpen(true);
    }
  }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
    
		const request = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		};
		
		const res = await fetch('/api/auth/login', request);

		if (res.status === 401) {
			setErrorMessage('L\'usuari o la contrasenya no són vàlids.');
      setIsErrorOpen(true);
			return;
		}

		if (!res.ok) {
			setErrorMessage('S\'ha produït un error durant el login. Torna-ho a intentar més tard.');
			setIsErrorOpen(true);
			return;
		}

    // Redirect + Refresh page for user data in header
		window.location.href = callbackUrl;
	};

  if (!featureFlags.login) {
    return notFound();
  }

  return (
    <Box sx={pageStyle}>
      <Paper sx={cardStyle}>
        <Typography variant="h4" sx={titleStyle}>
          INICIAR SESSIÓ
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
          <TextField
            label="Usuari"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={inputStyle}
          />

          <TextField
            label="Contrasenya"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: '#fff' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
						disabled={!username.trim() || !password.trim()}
            sx={buttonStyle}
          >
            INICIAR SESSIÓ
          </Button>
        </Box>
      </Paper>

			<Snackbar open={isErrorOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

/* styles */

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 2
}

const cardStyle = {
  backgroundColor: 'transparent',
  border: '2px solid #fff',
  borderRadius: 3,
  p: { xs: 3, md: 5 },
  width: '100%',
  maxWidth: 400
}

const titleStyle = {
  color: '#fff',
  textAlign: 'center',
  mb: 4,
  letterSpacing: 2
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3
}

const inputStyle = {
  '& .MuiInputBase-input': {
    color: '#fff'
  },

  '& .MuiInputLabel-root': {
    color: '#ffffffb3'
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#fff'
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff'
    },
    '&:hover fieldset': {
      borderColor: '#fff'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff'
    }
  }
}

const buttonStyle = {
  mt: 2,
  py: 1.5,
  fontSize: { xs: 14, md: 16 },
  fontWeight: 'bold',
  color: '#000',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#e0e0e0'
  }
}
