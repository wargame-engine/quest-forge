import PersonIcon from '@mui/icons-material/Person';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Box, CardActionArea, Container, Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import logo from 'assets/images/logo_large.png';
import splash from 'assets/images/splash.jpg';
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
    // {
    //   name: "Attributes",
    //   icon: <PersonIcon style={{ fontSize: iconSize }} />,
    //   text: "Browse player attributes and their meanings.",
    //   to: "/attributes",
    //   color: colors.red.import[800],
    // },
    // {
    //   name: "Equipment",
    //   icon: <VpnKeyIcon style={{ fontSize: iconSize }} />,
    //   text: "Browse the master equipment lists.",
    //   to: "/equipments",
    //   color: colors.green.import[900],
    // },
    // {
    //   name: "Feats",
    //   icon: <EmojiEventsIcon style={{ fontSize: iconSize }} />,
    //   text: "Browse the available feats to unlock.",
    //   to: "/feats",
    //   color: colors.green.import[900],
    // },
    // {
    //   name: "Effects",
    //   icon: <BoltIcon style={{ fontSize: iconSize }} />,
    //   text: "Browse all available status effects and conditions.",
    //   to: "/effects",
    //   color: colors.brown.import[500],
    // },
    {
      name: "Rules",
      icon: <StraightenIcon style={{ fontSize: iconSize }} />,
      text: "Read the core rules and start playing.",
      to: "/rules",
      color: colors.brown.import[500],
    },
    {
      name: "Characters",
      icon: <PersonIcon style={{ fontSize: iconSize }} />,
      text: "Browse and edit your saved characters.",
      to: "/characters",
      color: colors.brown.import[500],
    }
  ];
  return (
    <Box>
      <div
        style={{
          backgroundImage: `url(${splash})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: 'column' }} style={{ width: "100%", background: "rgba(0,0,0,0.7)" }}>
          <img
            // className={"d-block text-center logo clickable"}
            className={"d-block text-center logo"}
            src={logo}
            // onClick={() => history.push(`/games`)}
            alt="logo"
          />
        </Box>
      </div>
      <Container sx={{ mt: 2 }}>
        <Grid
          container
          rowSpacing={1}
          sx={{ mt: 2 }}
          columnSpacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {CARDS.map((card: any, index: number) => (
            <Grid item xs={4} key={index}>
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" paragraph>
          Quest Forge is a simple role-playing game. 
          It intends to keep character creation both open, and simple to get players playing right away. Quest Forge seeks to be as rules light as possible yet provide enough depth for your decisions both in character creation
          and when playing to matter.
          </Typography>
          <Typography variant="body1" paragraph>

          </Typography>
        </Box>
      </Container>
    </Box>
  );
};