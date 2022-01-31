import { Box, Checkbox, FormControlLabel, ListItem, ListItemButton, ListItemText, Switch, TextField, Typography } from '@mui/material';
import banes from 'assets/data/banes.json';
import boons from 'assets/data/boons.json';
import { sortBy, intersection, pickBy } from 'lodash';
import React from 'react';

type Props = {
  character: any,
  setCharacter: Function
};

export default function Home(props: Props) {
  const { character, setCharacter } = props;
  const [searchText, setSearchText] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);
  const characterAttributes = Object.keys(pickBy(character?.attributes, (value: any) => value > 0));
  const characterAbilities = new Set(character?.abilities);
  const canUseEffect = (boon: any) => intersection((boon.attribute || boon.attackAttributes || []).map((attr: any) => attr.toLocaleLowerCase()), characterAttributes).length;
  const availableBoons = Object.values(boons.boons)
    .filter((boon) => canUseEffect(boon) || showAll);
  const availableBanes = Object.values(banes.banes)
    .filter((boon) => canUseEffect(boon) || showAll);
  let effects = [...availableBoons, ...availableBanes];
  effects = sortBy(effects, 'name');
  effects = effects.filter((boon) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  const effectOptions = effects.map((boon, index) => {
    return (
      <ListItem
        sx={{ p: 0 }}
        secondaryAction={
          <Checkbox
            edge="end"
            disabled={!canUseEffect(boon) && !characterAbilities.has(boon.name)}
            checked={characterAbilities.has(boon.name)}
            onChange={(event, value) => {
              value ? characterAbilities.add(boon.name) : characterAbilities.delete(boon.name)
              setCharacter({
                ...character,
                abilities: Array.from(characterAbilities)
              })
            }}
          />
        }
      >
        <ListItemButton sx={{ p: 0 }} disabled={!canUseEffect(boon)} onClick={() => {
          characterAbilities.has(boon.name) ? characterAbilities.delete(boon.name) : characterAbilities.add(boon.name)
          setCharacter({
            ...character,
            abilities: Array.from(characterAbilities)
          })
        }}>
          <ListItemText
            primary={boon.name}
            secondary={boon.description}
          />
        </ListItemButton>
      </ListItem>
    );
  });
  const currentAbilities = sortBy(character?.abilities ?? [], 'name').map((boon: any) => {
    return (
      <>
        <TextField
          key={boon}
          fullWidth
          sx={{ mb: 1 }}
          size="small"
          label={boon.name}
          variant="outlined"
          value={boon}
        />
        <Typography key={boon + 'description'} variant="body2">
          {boon.description}
        </Typography>
      </>
    );
  });
  return (
    <Box sx={{ mt: 2 }}>
      <FormControlLabel control={<Switch value={showAll} onChange={() => setShowAll(!showAll)} />} label="Show All" />
      <TextField
        fullWidth
        size="small"
        label="Search"
        variant="outlined"
        sx={{ mb: 1 }}
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {effectOptions}
    </Box>
  );
};