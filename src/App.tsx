import React from 'react';
import logo from './logo.png';
import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ThemeProvider, createTheme, SwipeableDrawer, PaletteMode, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MainAppBar } from 'components/app-bar';
import { Appdrawer } from 'components/app-drawer';
import {
  Boons,
  Boon,
  Banes,
  Bane,
  Attributes,
  Equipment,
  Equipments,
  Home,
  Feats,
  Feat,
  License,
  CharacterCreator,
  Rules,
  Rule,
  Settings
} from 'routes';
import { Box } from '@mui/system';
import { AppContext } from 'hooks/appcontext';
import { ModalProvider } from 'hooks/use-modal';
import { useLocalStorage } from 'hooks/use-localstorage';
import { getColor } from 'utils/colors';

function App() {
  const [userPrefs, setUserPrefs] = useLocalStorage("userPrefs", {});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [appTheme, setAppTheme] = React.useState<PaletteMode | undefined>('dark');
  const [contextActions, setContextActions] = React.useState<Array<any>>([]);
  const [enableSearch, setEnableSearch] = React.useState<boolean>(false);
  const [searchMode, setSearchMode] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const setSearchEnabled = (enabled: boolean) => {
    setEnableSearch(enabled);
    if (!enabled) {
      setSearchText('');
      setSearchMode(false);
    }
  }
  const appContextValue = {
    drawerOpen,
    setDrawerOpen,
    appTheme,
    setAppTheme,
    contextActions,
    setContextActions,
    enableSearch,
    setEnableSearch: setSearchEnabled,
    searchText,
    setSearchText,
    searchMode,
    setSearchMode,
    userPrefs,
    setUserPrefs
  };
  const userPrimaryColor = getColor(userPrefs?.primaryColor)?.import || getColor('blue')?.import;
  const theme = createTheme({
    palette: {
      mode: userPrefs?.theme,
      primary: userPrimaryColor
    },
    typography: {
      fontSize: 12,
      fontFamily: 'Noto Sans JP',
      h1: {
        fontSize: '4rem',
        fontWeight: 'bold'
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 'bold'
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: 'bold'
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 'bold'
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
      },
      h6: {
        fontSize: '1rem',
      }
    },
  });
  return (
    <div style={{ marginBottom: '1em' }}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <AppContext.Provider value={appContextValue}>
            <CssBaseline />
            <MainAppBar />
            <Stack direction="row">
              <Appdrawer />
              <Routes>
                <Route path="license" element={<License />} />
                <Route path="settings" element={<Settings />} />
                <Route path="rules" element={<Rule />} />
                <Route path="rule/:id" element={<Boon />} />
                <Route path="characters" element={<Navigate replace to="/characters/new" />} />
                <Route path="characters/:id" element={<CharacterCreator />} />
                <Route path="attributes" element={<Attributes />} />
                <Route path="effects" element={<Boons />} />
                <Route path="boon/:id" element={<Boon />} />
                <Route path="bane/:id" element={<Bane />} />
                <Route path="equipments" element={<Equipments />} />
                <Route path="equipment/:id" element={<Equipment />} />
                <Route path="feats" element={<Feats />} />
                <Route path="feat/:id" element={<Feat />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </Stack>
          </AppContext.Provider>
        </ModalProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
