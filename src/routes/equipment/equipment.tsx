import { Chip, Container, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import rules from 'assets/data/rules.json';
import equipments from 'assets/data/weapons.json';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Equipment() {
  const boonData: any = equipments.weapons;
  const ruleData: any = rules.rules;
  const navigate = useNavigate();
  let params = useParams();
  const theBoonId = params.id ?? '';
  const theBoon = boonData[theBoonId.toLocaleLowerCase()];
  if (!theBoon) {
    return <></>;
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" justifyContent="center" alignItems="center" display="flex" gutterBottom>
        {theBoon.name}
      </Typography>
      <Typography paragraph>
        {theBoon.description}
      </Typography>
      <Box className="columns" sx={{ mb: 1 }}>
        <Box className="no-break" sx={{ mb: 1 }}>
          <Typography variant="h6" gutterBottom>
            Type
          </Typography>
          <Typography>
            {theBoon?.types?.map((attribute: any) => (
              <Chip label={attribute} color="secondary" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Typography>
        </Box>
        <Box className="no-break" sx={{ mb: 1 }}>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>
          <Typography>
            {!!theBoon?.damage && <Chip label={theBoon.damage + " D" ?? '-'} color="error" variant="outlined" size="small" sx={{ mr: 1 }} />}
            {!!theBoon?.bulk && <Chip label={theBoon.bulk + " BL" ?? '-'} color="info" variant="outlined" size="small" sx={{ mr: 1 }} />}
            <Chip label={theBoon.wealth + " WL"} color="success" variant="outlined" size="small" />
          </Typography>
        </Box>
        <Box className="no-break">
          <Typography variant="h6" gutterBottom>
            Attack Attributes
          </Typography>
          <Typography>
            {Object.values(theBoon?.attackAttributes ?? {}).map((attribute: any) => (
              <Chip label={attribute} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Typography>
        </Box>
        <Box className="no-break">
          <Typography variant="h6" gutterBottom>
            Critical Effects
          </Typography>
          <Typography>
            {Object.values(theBoon?.banes ?? {}).map((attribute: any) => (
              <Link component="button" onClick={() => navigate(`/bane/${attribute}`)} sx={{ mr: 1, mb: 1 }}>{attribute}</Link>
            ))}
          </Typography>
        </Box>
      </Box>
      <div className="no-break">
        {!!theBoon?.properties && <Typography variant="h6" gutterBottom>
          Properties
        </Typography>}
        <Box className={Object.values(theBoon?.properties ?? {}).length > 1 ? "columns" : ""}>
          {Object.keys(theBoon?.properties ?? {}).map((attribute: any) => {
            const theRule = ruleData[attribute.toLocaleLowerCase()];
            if (!theRule) {
              return (
                <>
                  <Typography className="no-break" paragraph>
                    <strong>{attribute}</strong>
                  </Typography>
                </>
              );
            }
            return (
              <>
                <Typography className="no-break" paragraph>
                  <strong>{theBoon?.properties[attribute]}</strong> - {theRule?.description}
                </Typography>
              </>
            )
          })}
        </Box>
      </div>
    </Container>
  );
}