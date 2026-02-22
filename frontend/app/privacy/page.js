import { Container, Typography, Box } from '@mui/material';

export default function PrivacyPage() {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '90vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700} color="#6a1010ff">
          Política de Privacitat
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, color: '#222' }}>
          Aquesta pàgina web respecta i protegeix la privacitat dels usuaris. Les dades personals recollides només s'utilitzaran per a la gestió de la lliga i no es compartiran amb tercers sense el vostre consentiment. 
          <br /><br />
          En utilitzar aquest lloc, accepteu la recollida i ús d'informació d'acord amb aquesta política. Podeu sol·licitar l'accés, rectificació o eliminació de les vostres dades personals en qualsevol moment.
          <br /><br />
          Per a qualsevol dubte o consulta sobre la nostra política de privacitat, podeu contactar amb nosaltres a través del formulari de contacte o per correu electrònic.
        </Typography>
      </Container>
    </Box>
  );
}
