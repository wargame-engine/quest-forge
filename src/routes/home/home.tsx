import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, CardActionArea, Container, Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { colors } from 'utils/colors';

type CardType = {
  name: string,
  icon: any,
  text: string,
  to?: string,
  toAbs?: string,
  color: any
};

export default function Home() {
  const navigate = useNavigate();
  const iconSize = '70px';
  const CARDS: Array<CardType> = [
    {
      name: "Attributes",
      icon: <PersonIcon style={{ fontSize: iconSize }} />,
      text: "Browse player attributes and their meanings.",
      to: "/attributes",
      color: colors.red.import[800],
    },
    {
      name: "Equipment",
      icon: <VpnKeyIcon style={{ fontSize: iconSize }} />,
      text: "Browse the master equipment lists.",
      to: "/equipments",
      color: colors.green.import[900],
    },
    {
      name: "Feats",
      icon: <EmojiEventsIcon style={{ fontSize: iconSize }} />,
      text: "Browse the available feats to unlock.",
      to: "/feats",
      color: colors.green.import[900],
    },
    {
      name: "Boons",
      icon: <WbSunnyIcon style={{ fontSize: iconSize }} />,
      text: "Browse all available boons and their effects.",
      to: "/boons",
      color: colors.brown.import[500],
    },
    {
      name: "Banes",
      icon: <WbCloudyIcon style={{ fontSize: iconSize }} />,
      text: "Browse all available banes and their effects.",
      to: "/banes",
      color: colors.purple.import[600],
    }
  ];
  return (
    <Container sx={{ mt: 2 }}>
      <Typography align="center" variant="h4">
        Quest Forge
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ mt: 2 }}
        columnSpacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {CARDS.map((card) => (
          <Grid item xs={4}>
            <Card>
              <CardActionArea
                onClick={() =>
                  card.toAbs
                    ? window.open(card.toAbs, "_blank")
                    : navigate(card.to ?? '')
                }
              >
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box sx={{ mr: 2 }}>{card.icon}</Box>
                    <Stack>
                      <Typography variant="h4" component="div">
                        {card.name}
                      </Typography>
                      <Typography align="left">{card.text}</Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};