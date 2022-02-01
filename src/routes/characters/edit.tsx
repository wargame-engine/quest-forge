import { AppBar, Box, Button, Container, Tab, Tabs, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from 'hooks/use-localstorage';
import React from 'react';
import { useParams } from "react-router-dom";
import Abilities from './abilities';
import Attributes from './attributes';
import Basic from './basic';
import Equipment from './equipment';
import Feats from './feats';

export default function Home() {
  let params = useParams();
  const theCharacterId = params.id ?? '';
  const [characters, setCharacters] = useLocalStorage("characters", {});
  const setCharacter = (data: any) => {
    setCharacters({
      ...characters,
      [theCharacterId]: data
    });
  }
  const theCharacter = characters[theCharacterId] || {};
  const [currentTab, setCurrentTab] = React.useState<any>(0);
  const TABS = {
    basic: {
      name: "Basic",
      tab: <Basic character={theCharacter} setCharacter={setCharacter} />
    },
    attributes: {
      name: "Attributes",
      tab: <Attributes character={theCharacter} setCharacter={setCharacter} />
    },
    abilities: {
      name: "Abilities",
      tab: <Abilities character={theCharacter} setCharacter={setCharacter} />
    },
    feats: {
      name: "Feats",
      tab: <Feats character={theCharacter} setCharacter={setCharacter} />
    },
    equipment: {
      name: "Equipment",
      tab: <Equipment />
    },
  };
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Character Editor
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={(thing, value) => setCurrentTab(value)} variant="scrollable">
          {Object.values(TABS).map((tab) => (
            <Tab label={tab.name} key={tab.name} />
          ))}
        </Tabs>
      </Box>
      {Object.values(TABS)[currentTab]?.tab}
      <Toolbar />
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: "end" }}>
          <Button sx={{ color: 'inherit' }} onClick={() => setCurrentTab(currentTab - 1)} disabled={currentTab === 0}>
            Previous
          </Button>
          <Button sx={{ ml: 1, color: 'inherit' }} onClick={() => setCurrentTab(currentTab + 1)} disabled={currentTab === (Object.values(TABS).length - 1)}>
            Next
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
};