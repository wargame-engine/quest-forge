import { CardActionArea, Chip, Container } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import boons from 'assets/data/feats.json';
import { AppContext } from 'hooks/appcontext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Boons() {
  const appContext = React.useContext(AppContext);
  const { searchText, setEnableSearch } = appContext;
  React.useEffect(() => {
    setEnableSearch(true);
    return () => {
      setEnableSearch(false);
    }
  }, [ setEnableSearch ]);
  const boonList = Object.values(boons.feats).filter((boon) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  const navigate = useNavigate();

  return (
    <Container sx={{ mb: 2 }}>
      <Typography align="center" variant="h4" sx={{ my: 2 }}>
        Feat List
      </Typography>
      <div>
        {boonList.map((boon) => (
          <Card
            className="no-break"
            key={boon.name}
            onClick={() => navigate(`/feat/${boon.name}`)}
            sx={{ mb: 1 }}
          >
            <CardActionArea
              sx={{ p: 1 }}
            >
              <Typography variant="h6" display="flex" alignItems="center" gutterBottom>
                {boon.name}
                <div style={{ flexGrow: 1 }} />
                <Chip label={boon.cost.join('/')} color="info" variant="outlined" size="small" sx={{ ml: 1 }} />
              </Typography>
              <Typography>
                {boon?.tags?.map((attribute: string) => (
                  <Chip label={attribute} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
              </Typography>
              <Typography>
                {boon.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Container>
  );
}