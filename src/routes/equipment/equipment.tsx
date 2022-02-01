import { Chip, Container, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import equipment from 'assets/data/equipment.json';
import rules from 'assets/data/rules.json';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Equipment() {
  const boonData: any = equipment.equipment;
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
          <Box>
            {theBoon?.types?.map((attribute: any, index: number) => (
              <Chip key={index} label={attribute} color="secondary" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
        </Box>
        <Box className="no-break" sx={{ mb: 1 }}>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>
          <Box>
            {!!theBoon?.damage && <Chip label={theBoon.damage + " D" ?? '-'} color="error" variant="outlined" size="small" sx={{ mr: 1 }} />}
            {!!theBoon?.bulk && <Chip label={theBoon.bulk + " BL" ?? '-'} color="info" variant="outlined" size="small" sx={{ mr: 1 }} />}
            <Chip label={theBoon.wealth + " WL"} color="success" variant="outlined" size="small" />
          </Box>
        </Box>
        <Box className="no-break">
          <Typography variant="h6" gutterBottom>
            Attack Attributes
          </Typography>
          <Box>
            {Object.values(theBoon?.attackAttributes ?? {}).map((attribute: any, index: number) => (
              <Chip key={index} label={attribute} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
        </Box>
        <Box className="no-break">
          <Typography variant="h6" gutterBottom>
            Critical Effects
          </Typography>
          <Typography>
            {Object.keys(theBoon?.criticals ?? {}).map((attribute: any, index: number) => (
              <Link key={index} component="button" onClick={() => navigate(`/bane/${attribute?.replace(' ', '_') || ''}`)} sx={{ mr: 1, mb: 1 }}>{theBoon?.criticals[attribute]}</Link>
            ))}
          </Typography>
        </Box>
      </Box>
      {!!theBoon?.rules && <div className="no-break">
         <Typography variant="h6" gutterBottom>
          Rules
        </Typography>
        <Box className={Object.values(theBoon?.rules ?? {}).length > 1 ? "columns" : ""}>
          {Object.keys(theBoon?.rules ?? {}).map((attribute: any, index: number) => {
            const theRule = ruleData[attribute.toLocaleLowerCase()];
            if (!theRule) {
              return (
                <>
                  <Typography key={index} className="no-break" paragraph>
                    <strong>{attribute}</strong>
                  </Typography>
                </>
              );
            }
            return (
              <>
                <Typography key={index} className="no-break" paragraph>
                  <strong>{theBoon?.rules[attribute]}</strong> - {theRule?.description}
                </Typography>
              </>
            )
          })}
        </Box>
      </div>}
    </Container>
  );
}