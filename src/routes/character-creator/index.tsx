import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { BottomNavigation, BottomNavigationAction, Box, Button, CardActionArea, Container, Grid, Paper, Tab, Tabs } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { colors } from 'utils/colors';
import Attributes from 'routes/character-creator/attributes';
import Abilities from 'routes/character-creator/abilities';
import Feats from 'routes/character-creator/feats';
import Basic from 'routes/character-creator/basic';
import { useLocalStorage } from 'hooks/use-localstorage';
import { AppContext } from 'hooks/appcontext';
import useConfirmation from 'components/modals/confirm';

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
  const confirm = () => {
    window.alert('Wooooopp');
  }
  const showConfirm = useConfirmation({
    title: 'Delete Character',
    text: 'Are you sure you want to delete this character?',
    onConfirm: confirm
  });
  let params = useParams();
  const contextActions = [
    {
      name: 'Delete',
      icon: <DeleteIcon />,
      onClick: () => {
        showConfirm();
      }
    }
  ];
  const appContext = React.useContext(AppContext);
  const { setContextActions } = appContext;
  React.useEffect(() => {
    setContextActions(contextActions);
    return () => {
      setContextActions([]);
    }
  }, []);
  const theCharacterId = params.id ?? '';
  const [ characters, setCharacters] = useLocalStorage("characters", {});
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
      tab: <Basic character={theCharacter} setCharacter={setCharacter} />
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
      <div style={{ display: 'flex', flex: 1, margin: '0.5em 0' }}>
        <Button variant="contained" onClick={() => setCurrentTab(currentTab - 1)} disabled={currentTab === 0}>
          Previous
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        <Button variant="contained" onClick={() => setCurrentTab(currentTab + 1)} disabled={currentTab === (Object.values(TABS).length - 1)}>
          Next
        </Button>
      </div>
    </Container>
  );
};