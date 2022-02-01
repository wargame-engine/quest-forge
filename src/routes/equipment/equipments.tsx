import { Box, CardActionArea, Chip, Container } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import equipment from 'assets/data/equipment.json';
import { AppContext } from 'hooks/appcontext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Equipments() {
  const navigate = useNavigate();
  const appContext = React.useContext(AppContext);
  const { searchText, setEnableSearch } = appContext;
  React.useEffect(() => {
    setEnableSearch(true);
    return () => {
      setEnableSearch(false);
    }
  }, [ setEnableSearch ]);
  const weapons: Record<string, any> = equipment.equipment;
  const equipmentMapped = Object.keys(weapons).map((equipId: string) => {
    const theItem = weapons[equipId];
    return {
      ...theItem,
      id: equipId
    }
  });
  const boonList: Array<any> = equipmentMapped.filter((boon) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  return (
    <Container>
      <Typography align="center" variant="h4" sx={{ my: 2 }}>
        Equipment List
      </Typography>
      <div>
        {boonList.map((boon: any, index: number) => (
          <Card
            className="no-break"
            key={index}
            onClick={() => navigate(`/equipment/${boon.id}`)}
            sx={{ mb: 1 }}
          >
            <CardActionArea
              sx={{ p: 1 }}
            >
              <Typography variant="h6" display="flex" alignItems="center" gutterBottom>
                {boon.name}
                <div style={{ flexGrow: 1 }} />
              </Typography>
              <Box>
                {boon?.types?.map((attribute: any, index: number) => (
                  <Chip key={index}  label={attribute} color="secondary" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {Object.values(boon?.attackAttributes ?? {}).map((attribute: any, index: number) => (
                  <Chip key={index}  label={attribute ?? ''} color="success" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {Object.values(boon?.rules ?? {}).map((attribute: any, index: number) => (
                  <Chip key={index} label={attribute ?? ''} color="warning" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {!!boon?.bulk && <Chip label={boon.bulk + " BL" ?? '-'} color="info" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />}
                <Chip label={boon.wealth + " WL" ?? '-'} color="success" variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
              </Box>
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