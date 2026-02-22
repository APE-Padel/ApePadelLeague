import { Container, Typography, Box } from '@mui/material';

export default function TermsPage() {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '90vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700} color="#6a1010ff">
          Termes i Condicions
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, color: '#222' }}>
          Benvingut a l'APE Padel League. En accedir i utilitzar aquest lloc web, accepteu els següents termes i condicions:
          <br /><br />
          1. L'ús d'aquesta plataforma està destinat exclusivament a la gestió i seguiment de la lliga de pàdel.
          <br />
          2. Les dades proporcionades pels usuaris han de ser verídiques i actualitzades. L'organització es reserva el dret de modificar o eliminar comptes que incompleixin aquesta norma.
          <br />
          3. No està permès l'ús indegut de la plataforma, incloent-hi intents d'accés no autoritzat, manipulació de resultats o qualsevol acció que pugui perjudicar la integritat de la lliga.
          <br />
          4. L'organització pot modificar les funcionalitats, regles o continguts de la plataforma sense previ avís.
          <br />
          5. Els drets d'autor i propietat intel·lectual del contingut, logotips i disseny pertanyen a l'APE Padel League.
          <br />
          6. Per a qualsevol dubte o incidència, podeu contactar amb l'organització a través dels canals oficials.
          <br /><br />
          L'ús continuat d'aquest lloc implica l'acceptació d'aquests termes.
        </Typography>
      </Container>
    </Box>
  );
}
