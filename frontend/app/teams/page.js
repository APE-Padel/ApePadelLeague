import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
  IconButton
} from '@mui/material'
import { featureFlags } from '@/lib/featureFlags'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { notFound } from 'next/navigation'

async function getTeams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/active/teams`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch teams')
  return await res.json()
}

export default async function TeamsPage() {
  if (!featureFlags.teams) return notFound()

  const teams = await getTeams()

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={titleStyle}>
        {teams.length} EQUIPS PARTICIPANTS
      </Typography>

      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table sx={tableStyle}>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team._id} sx={tableRowStyle}>

                <TableCell sx={logoCellStyle}>
                  <Avatar sx={logoStyle} src={team.logoBase64} />
                </TableCell>

                <TableCell sx={{ ...cellWithBorderStyle, width: { xs: 110, md: 180 } }}>
                  {team.name.toUpperCase()}
                </TableCell>

                <TableCell sx={cellWithBorderStyle}>
                  {team.players.join(' i ')}
                </TableCell>
                
                <TableCell sx={cellStyle}>
                  <Box sx={courtCellContainerStyle}>

                    <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>{team.court.name}</Typography>

                    <Box sx={courtDetailsContainerStyle}>
                      <Typography sx={courtDetailsTextStyle}>
                        {team.court.indoor ? 'Indoor' : 'Outdoor'}
                      </Typography>
                        <IconButton
                          component="a"
                          href={team.court.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={locationButtonStyle}
                          aria-label={`Open location of ${team.court.name}`}
                        >
                          <LocationOnIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
                        </IconButton>
                    </Box>

                  </Box>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

/* ================= STYLES ================= */

const titleStyle = {
  color: '#fff',
  textAlign: 'center',
  letterSpacing: 2,
  mb: 2,
  fontSize: { xs: 24, md: 32 }
}

const tableContainerStyle = {
  backgroundColor: 'transparent',
  maxWidth: 800,
  mx: 'auto',
  overflow: 'visible'
}

const tableStyle = {
  borderCollapse: 'separate',
  borderSpacing: { xs: '0 20px', md: '0 30px' }
}

const tableRowStyle = {
  '& > td': {
    borderTop: '2px solid #fff',
    borderBottom: '2px solid #fff',
    padding: { xs: '6px 8px', md: '12px 16px' },
    position: 'relative',
    overflow: 'visible'
  },

  '& > td:first-of-type': {
    borderLeft: '2px solid #fff',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },

  '& > td:last-of-type': {
    borderRight: '2px solid #fff',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  }
}

const cellStyle = {
  color: '#fff',
  fontSize: { xs: 12, md: 20 },
  padding: { xs: '12px 8px', md: '12px 16px' },
  borderBottom: 'none',
  textAlign: 'center'
}

const cellWithBorderStyle = {
  ...cellStyle,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '60%',
    width: '2px',
    backgroundColor: '#ffffff70'
  }
}

const logoCellStyle = {
  position: 'relative',
  width: { xs: 40, md: 90 },
  padding: 0,
  overflow: 'visible'
}

const logoStyle = {
  width: { xs: 57, md: 100 },
  height: { xs: 57, md: 100 },
  position: 'absolute',
  left: { xs: -10, md: -50 },
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  borderRadius: 0
}

const courtCellContainerStyle = {
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center', 
  gap: 0.25 
}

const courtDetailsContainerStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: 0.5 
}

const courtDetailsTextStyle = {
  fontSize: { xs: 10, md: 16 },
  color: '#ccc',
  fontWeight: 500
}

const locationButtonStyle = {
  border: '1px solid #ffffff50',
  borderRadius: 2,
  color: '#fff',
  p: { xs: 0.5, md: 0.75 },

  '&:hover': {
    backgroundColor: '#ffffff15',
    borderColor: '#fff'
  }
}