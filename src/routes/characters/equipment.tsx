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
      Kekeroni
    </Box>
  );
};