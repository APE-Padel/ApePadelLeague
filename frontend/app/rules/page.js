import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { notFound } from 'next/navigation';
import { featureFlags } from '@/lib/featureFlags';
import Link from 'next/link';

export default function RulesPage() {
  const scoringTable = [
    { result: 'Victoria', points: 3 },
    { result: 'Empat', points: 1 },
    { result: 'Derrota', points: 0 }
  ];

  const classificationRules = [
    { step: '1', rule: 'Average directe entre els equips empatats' },
    { step: '2', rule: 'Average total de les parelles empatades' },
    { step: '3', rule: 'Major nombre de punts de partit obtinguts' },
    { step: '4', rule: 'Partit extra en cas d\'empat persistent' }
  ];

	if (!featureFlags.rules) {
		return notFound();
	}

  return (
    <Box sx={pageContainer}>
      <Typography variant="h4" sx={titleStyle}>
        Reglament de la Lliga
      </Typography>

      {/* General Info Sections */}
      <Section title="CALENDARI">
        La duració total de la lliga és de 7 mesos: del 12 de gener al 9 d'agost. La jornada 1 arranca el 12 de gener. Veure tot el&nbsp;
        <Link href="/calendar" style={linkStyle}>
          calendari
        </Link>.
      </Section>

      <Section title="ESTRUCTURA DE LA LLIGA">
        La lliga tindrà un format d'anada i tornada, ajustat al nombre de participants. 
				El calendari està dividit en 11 jornades: 10 jornades habituals i una jornada especial extra. 
				Les jornades tindran lloc cada 3 setmanes. 
      </Section>

      {/* Scoring Table */}
      <Section title="PUNTUACIÓ DELS PARTITS">
        <SimpleTable
          headers={['Resultat', 'Punts']}
          data={scoringTable.map(r => [r.result, r.points])}
        />
      </Section>

      {/* Classification Rules */}
      <Section title="SISTEMA DE CLASSIFICACIÓ">
        La classificació es basa en els punts acumulats jornada a jornada. En cas d'empat, s'aplica el següent ordre de desempats:
        <SimpleTable
          headers={['Pas', 'Regla']}
          data={classificationRules.map(r => [r.step, r.rule])}
        />
        Pots veure la <Link href="/standings" style={linkStyle}>classificació actual</Link>.
      </Section>

      {/* Full Text Sections */}
      <Section title="QUÈ PASSA SI NO ES POT JUGAR UN PARTIT?">
        Si algun participant falta després d'haver-se compromès en un partit reprogramat, 
				aquella parella perd el partit si no es troba cap substitut. 
				Si en finalitzar la 3a setmana de la jornada falta algun partit, les parelles implicades computaran la jornada com a derrota. 
				Partits iniciats amb 8 jocs completats poden congelar el resultat si hi ha acord.
      </Section>

      <Section title="LES PISTES DE LOCAL I VISITANTS">
        La lliga es juga a dues voltes: anada i tornada. La parella local decideix la pista. 
				Responsabilitats locals: reservar pista, pagar i gestionar preus, vigilar condicions climàtiques. 
				Responsabilitats visitants: conèixer ubicació i pagar la seva part.
      </Section>

      <Section title="NORMATIVA APLICADA">
        <ul style={{ paddingLeft: 20 }}>
          <li>Tècnica i execució: Regles estrictes amb avisos i repeticions segons incidències.</li>
          <li>Propis punts: Decisions consensuades sobre bots i situacions de pista.</li>
          <li>Control anti-doping: Prohibit, desqualificació immediata per dopatge.</li>
          <li>Inici del partit: Piloteig màxim 10 minuts, primer punt “pel saque” decideix qui serveix.</li>
          <li>Canvis de pista: Un canvi de banda obligatori al 6è joc. Pauses màximes de 5 minuts.</li>
          <li>Format Star Point: Punt d'or al 3r 40-40.</li>
          <li>Condició de victòria: Set únic a 12 jocs amb avantatge de 2 jocs; Tie-Break si 12-12.</li>
        </ul>
      </Section>
    </Box>
  );
}

/* --- Components --- */
function Section({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>{title}</Typography>
      <Box sx={{ mb: 2, lineHeight: 1.6 }}>{children}</Box>
    </Box>
  );
}

function SimpleTable({ headers, data }) {
  return (
    <TableContainer component={Paper} sx={tableContainerStyle}>
      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHead>
          <TableRow>
            {headers.map((h, i) => (
              <TableCell key={i} sx={tableHeadCellStyle({ index: i })}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} sx={tableBodyCellStyle({ index: j })}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* --- Styles --- */
const tableColumnWidths = ['30%', '70%'];

const pageContainer = {
  p: 4,
  color: '#fff',
  maxWidth: 900,
  mx: 'auto'
};

const titleStyle = {
  color: '#fff',
  mb: 4,
  textAlign: 'center',
  letterSpacing: 2
};

const linkStyle = {
	color: '#fff',
	textDecoration: 'underline',
	fontWeight: 'bold'
};

const tableContainerStyle = {
	backgroundColor: 'transparent',
	boxShadow: 'none',
	mb: 3      
};

const tableHeadCellStyle = ({ index }) => ({
	color: '#fff',
	fontWeight: 'bold',
	borderBottom: '1px solid #555',
	width: tableColumnWidths?.[index] || 'auto',
	wordWrap: 'break-word'
});

const tableBodyCellStyle = ({ index }) => ({
	color: '#fff',
	borderBottom: '1px solid #555',
	width: tableColumnWidths?.[index] || 'auto',
	wordWrap: 'break-word'
});
