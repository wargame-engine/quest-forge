import { Box, Stack, TextField } from '@mui/material';
import React from 'react';

type props = {
  character: any,
  setCharacter: Function
};

export default function Home(props: props) {
  const { character, setCharacter } = props;
  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <TextField
          size="small"
          label="Name"
          variant="outlined"
          value={character.name}
          onChange={((event) => {
            setCharacter({
              ...character,
              name: event?.target?.value
            });
          })}
        />
        <TextField
          size="small"
          rows={4}
          fullWidth
          label="Appearance"
          multiline
          value={character.appearance}
          onChange={((event) => {
            setCharacter({
              ...character,
              appearance: event?.target?.value
            });
          })}
        />
        <TextField
          size="small"
          rows={8}
          fullWidth
          label="Background"
          multiline
          value={character.background}
          onChange={((event) => {
            setCharacter({
              ...character,
              background: event?.target?.value
            });
          })}
        />
      </Stack>
    </Box>
  );
};