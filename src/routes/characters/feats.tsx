import { Box, Checkbox, FormControlLabel, ListItem, ListItemButton, ListItemText, Switch, TextField } from '@mui/material';
import feats from 'assets/data/feats.json';
import { sortBy } from 'lodash';
import React from 'react';

type Props = {
  character: any,
  setCharacter: Function
};

export default function Feats(props: Props) {
  const { character, setCharacter } = props;
  const [searchText, setSearchText] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);
  // const characterAttributes = Object.keys(pickBy(character?.attributes, (value: any) => value > 0));
  const characterAbilities = new Set(character?.abilities);
  // const canUseEffect = (boon: any) => {
  //   return intersection((boon.attribute || boon.attackAttributes || []).map((attr: any) => attr.toLocaleLowerCase()), characterAttributes).length
  // };
  let effects = feats.feats;
  effects = sortBy(effects, 'name');
  effects = effects.filter((boon) => boon?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase()));
  const effectOptions = effects.map((boon, index) => {
    return (
      <ListItem
        key={boon.name}
        sx={{ p: 0 }}
        secondaryAction={
          <Checkbox
            sx={{ mr: -3 }}
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
        <ListItemButton sx={{ p: 0 }} onClick={() => {
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