import { CardActionArea, Chip, Container } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import equipments from 'assets/data/weapons.json';
import { AppContext } from 'hooks/appcontext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Boons() {
  const navigate = useNavigate();
  const appContext = React.useContext(AppContext);
  const { searchText, setEnableSearch } = appContext;
  React.useEffect(() => {
    setEnableSearch(true);
    return () => {
      setEnableSearch(false);
    }
  }, [ setEnableSearch ]);
  const boonList: Array<any> = Object.values(equipments.weapons).filter((boon) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  return (
    <Container>
      <Typography align="center" variant="h4" sx={{ my: 2 }}>
        Equipment List
      </Typography>
      <div>
        {boonList.map((boon) => (
          <Card
            className="no-break"
            key={boon.name}
            onClick={() => navigate(`/equipment/${boon.name}`)}
            sx={{ mb: 1 }}
          >
            <CardActionArea
              sx={{ p: 1 }}
            >
              <Typography variant="h6" display="flex" alignItems="center" gutterBottom>
                {boon.name}
                <div style={{ flexGrow: 1 }} />
              </Typography>
              <Typography>
                {boon?.types?.map((attribute: any) => (
                  <Chip label={attribute} color="secondary" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {Object.values(boon?.attackAttributes ?? {}).map((attribute: any) => (
                  <Chip label={attribute ?? ''} color="success" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {Object.values(boon?.properties ?? {}).map((attribute: any) => (
                  <Chip label={attribute ?? ''} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {!!boon?.bulk && <Chip label={boon.bulk + " BL" ?? '-'} color="info" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />}
                <Chip label={boon.wealth + " WL" ?? '-'} color="success" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
              </Typography>
              <Typography>
                {boon?.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Container>
  );
}