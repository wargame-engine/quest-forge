import { Container, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import logo_license from 'assets/images/license.webp';

export default function Home() {
  return (
    <Container sx={{ mt: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logo_license} alt="Open Legend Community Logo" width="50%" style={{ marginBottom: '1em' }} />
      </div>
      <Typography variant="h4" gutterBottom>
        Open Legend Community License
      </Typography>
      <Typography paragraph>
        This product was created under the Open Legend Community License and contains material that is copyright to Seventh Sphere Entertainment. Such use of Seventh Sphere Entertainment materials in this product is in accordance with the Open Legend Community License and shall not be construed as a challenge to the intellectual property rights reserved by Seventh Sphere Entertainment. Seventh Sphere Entertainment and Open Legend RPG and their respective logos are trademarks of Seventh Sphere Entertainment in the U.S.A. and other countries.
      </Typography>
      <Typography>
        The full-text Open Legend Community License can be found at <Link href="http://www.openlegendrpg.com/community-license">http://www.openlegendrpg.com/community-license</Link>.
      </Typography>
    </Container>
  );
};