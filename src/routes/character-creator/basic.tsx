import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, CardActionArea, Container, Grid, Stack, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { colors } from 'utils/colors';

type props = {
  character: any,
  setCharacter: Function
};

export default function Home(props: props) {
  const { character, setCharacter } = props;
  const navigate = useNavigate();
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
          rows={12}
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