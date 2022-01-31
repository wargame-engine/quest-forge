import { CardActionArea, Chip, Container } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import banes from 'assets/data/banes.json';
import boons from 'assets/data/boons.json';
import { AppContext } from 'hooks/appcontext';
import { sortBy } from 'lodash';
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
  let boonList = [ ...Object.values(boons.boons), ...Object.values(banes.banes) ].filter((boon: any) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  boonList = sortBy(boonList, 'name');
  const navigate = useNavigate();

  return (
    <Container sx={{ mb: 2 }}>
      <Typography align="center" variant="h4" sx={{ my: 2 }}>
        Effects List
      </Typography>
      <div>
        {boonList.map((boon: any) => (
          <Card
            className="no-break"
            key={boon.name}
            onClick={() => boon?.attribute ? navigate(`/boon/${boon.name}`) : navigate(`/bane/${boon.name}`)}
            sx={{ mb: 1 }}
          >
            <CardActionArea
              sx={{ p: 1 }}
            >
              <Typography variant="h6" display="flex" alignItems="center" gutterBottom>
                {boon.name}
                <div style={{ flexGrow: 1 }} />
                <Chip label={boon?.attribute ? 'Boon' : 'Bane'} color={boon?.attribute ? "success" : "error"} variant="outlined" size="small" sx={{ ml: 1 }} />
                <Chip label={boon.power.join('/') + " PL"} color="info" variant="outlined" size="small" sx={{ ml: 1 }} />
              </Typography>
              <Typography>
                {(boon?.attribute ?? boon.attackAttributes).map((attribute: any) => (
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