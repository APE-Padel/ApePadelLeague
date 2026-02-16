import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from '@mui/material'
import { featureFlags } from '@/lib/featureFlags';

async function getStandings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/active/standings`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch standings data');
  }

  return await res.json();
}

export default async function ClassificacioPage() {

  if (!featureFlags.standings) {
    return notFound();
  }

  const { table } = await getStandings();
  const sortedTable = table.sort((a, b) => a.position - b.position);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={titleStyle}>
        CLASSIFICACIÓ
      </Typography>

      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table sx={tableStyle}>

        <TableHead sx={{ transform: 'translateY(25px)' }}>
          <TableRow>
            <TableCell sx={cellStyle} />
            <TableCell sx={cellStyle} />
            <TableCell sx={cellStyle} />
            <TableCell sx={cellStyle} />
            <TableCell sx={cellStyle} align="center">PJ</TableCell>
            <TableCell sx={cellStyle} align="center">PG</TableCell>
            <TableCell sx={cellStyle} align="center">PP</TableCell>
            <TableCell sx={cellStyle} align="center">PE</TableCell>
            <TableCell sx={cellStyle} align="center">Av</TableCell>
            <TableCell sx={{...cellStyle, ...bigTextStyle}} align="center">PTS</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {sortedTable.map((row) => {

              const players = row.team.players.join(' i ');
              const teamName = row.team.name.toUpperCase();
              const gamesPlayed = row.gamesWon + row.gamesLost + row.gamesDraw;
              const average = row.pointsFor - row.pointsAgainst;
              const averageSign = average >= 0 ? '+' : '';

              return (
                <TableRow key={row.team._id} sx={tableRowStyle}>

                  <TableCell sx={positionCellStyle(row.position)} align="center">
                    {row.position}
                  </TableCell>

                  <TableCell sx={logoCellStyle}>
                    <Avatar sx={logoStyle} src={row.team.logoBase64} />
                  </TableCell>

                  <TableCell sx={{...cellWithBorderStyle, width: 150 }}>{teamName}</TableCell>
                  <TableCell sx={{...cellWithBorderStyle, width: 150 }}>{players}</TableCell>

                  <TableCell sx={cellWithBorderStyle} align="center">{gamesPlayed}</TableCell>
                  <TableCell sx={cellWithBorderStyle} align="center">{row.gamesWon}</TableCell>
                  <TableCell sx={cellWithBorderStyle} align="center">{row.gamesLost}</TableCell>
                  <TableCell sx={cellWithBorderStyle} align="center">{row.gamesDraw}</TableCell>
                  <TableCell sx={cellWithBorderStyle} align="center">{averageSign}{average}</TableCell>

                  <TableCell sx={{...cellStyle, ...bigTextStyle}} align="center">{row.points}</TableCell>

                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  )
}

/* styles */
const bigTextStyle = {
  fontSize: { xs: 14, md: 24 },
  fontWeight: 'bold'
};

const titleStyle = {
  color: '#fff',
  mb: -5,
  textAlign: 'center',
  letterSpacing: 2
};

const tableContainerStyle = {
  backgroundColor: 'transparent',
  maxWidth: 1000,
  mx: 'auto'
};

const tableStyle = {
  borderCollapse: 'separate',
  borderSpacing: {
    xs: '0 12px',
    md: '0 30px'
  }
};

const tableRowStyle = {
  '& > td': {
    borderTop: '2px solid #fff',
    borderBottom: '2px solid #fff',
    padding: {
      xs: '6px 8px',
      md: '15px 16px'
    }
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
};

const cellStyle = {
  color: '#fff',
  fontSize: { xs: 10, md: 18 },
  padding: { xs: '16px 0px', md: '16px' },
  width: { xs: 0, md: 50 },
  borderBottom: 'none',
};

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
    width: '1px',
    backgroundColor: '#ffffff84'
  }
};

const positionCellStyle = (position) => ({
  ...cellStyle,
  ...bigTextStyle,
  color: position === 1 ? '#FFD700' : '#fff',
  textShadow: position === 1 ? '0 0 8px rgba(255, 215, 0, 0.8)' : 'none'
});

const logoCellStyle = {
  position: 'relative',
  width: 80
};

const logoStyle = {
  width: { xs: 35, md: 85 },
  height: { xs: 35, md: 85 },
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1
};
