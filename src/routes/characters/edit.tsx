import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import useConfirmation from 'components/modals/confirm';
import { AppContext } from 'hooks/appcontext';
import { useLocalStorage } from 'hooks/use-localstorage';
import React from 'react';
import { useParams } from "react-router-dom";
import Abilities from './abilities';
import Attributes from './attributes';
import Basic from './basic';
import Feats from './feats';
import Equipment from './equipment';

export default function Home() {
  const confirm = () => {
    window.alert('Wooooopp');
  }
  const showConfirm = useConfirmation({
    title: 'Delete Character',
    text: 'Are you sure you want to delete this character?',
    onConfirm: confirm
  });
  let params = useParams();
  const appContext = React.useContext(AppContext);
  const { setContextActions } = appContext;
  React.useEffect(() => {
    const contextActions = [
      {
        name: 'Delete',
        icon: <DeleteIcon />,
        onClick: () => {
          showConfirm();
        }
      }
    ];
    setContextActions(contextActions);
    return () => {
      setContextActions([]);
    }
  }, [ setContextActions, showConfirm ]);
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
      tab: <Equipment character={theCharacter} setCharacter={setCharacter} />
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