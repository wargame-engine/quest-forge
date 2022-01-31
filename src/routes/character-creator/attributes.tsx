import { Box, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import stats from 'assets/data/stats.json';
import { groupBy } from 'lodash';
import React from 'react';

type props = {
  character: any,
  setCharacter: Function
};

export default function Attributes(props: props) {
  const { character, setCharacter } = props;
  const boonList = Object.values(stats.attributes);
  const groups = groupBy(boonList, 'category');
  return (
    <Box sx={{ mt: 2 }}>
      {Object.keys(groups).map((groupKey: string) => {
        const group = groups[groupKey];
        return (
          <>
            <Typography variant="h5" key={groupKey} gutterBottom>
              {groupKey}
            </Typography>
            <Grid container sx={{ mb: 3 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <>
                {group.map((boon: any) => {
                  const boonId = boon.name.toLocaleLowerCase();
                  return (
                  <Grid item xs={4} key={boon.name}>
                    <TextField
                      key={boonId}
                      fullWidth
                      sx={{ mb: 1 }}
                      size="small"
                      label={boon.name}
                      variant="outlined"
                      value={character?.attributes?.[boonId] ?? ''}
                      onChange={(event) => {
                        setCharacter({
                          ...character,
                          attributes: {
                            ...character?.attributes,
                            [boonId]: parseInt(event.target.value) || 0
                          }
                        });
                      }}
                    />
                    <Typography key={boonId+'description'} variant="body2">
                      {boon.description}
                    </Typography>
                  </Grid>
                )})}
              </>
            </Grid>
          </>
        );
      })}
    </Box>
  );
};