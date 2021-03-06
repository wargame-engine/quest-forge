import CloseIcon from '@mui/icons-material/Close';
import { Box, createTheme, IconButton, PaletteMode, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MainAppBar } from 'components/app-bar';
import { Appdrawer } from 'components/app-drawer';
import { AppContext } from 'hooks/appcontext';
import { useLocalStorage } from 'hooks/use-localstorage';
import { ModalProvider } from 'hooks/use-modal';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import {
  Navigate, Route, Routes
} from "react-router-dom";
import {
  Attributes, Bane, Boon, Boons, CharacterEditor, Characters, Equipment,
  Equipments, Feat, Feats, Home, License, Rules,
  Settings
} from 'routes';
import { CHAPTERS } from 'routes/rules/rules';
import { getColor } from 'utils/colors';
import './App.css';

function App() {
  const [userPrefs, setUserPrefs] = useLocalStorage("userPrefs", {});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [appTheme, setAppTheme] = React.useState<PaletteMode | undefined>('dark');
  const [contextActions, setContextActions] = React.useState<Array<any>>([]);
  const [enableSearch, setEnableSearch] = React.useState<boolean>(false);
  const [searchMode, setSearchMode] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const setSearchEnabled = React.useCallback((enabled: boolean) => {
    setEnableSearch(enabled);
    if (!enabled) {
      setSearchText('');
      setSearchMode(false);
    }
  }, []);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up("md"));
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
  const notistackRef = React.createRef<any>();
  const onClickDismiss = (key: number) => () => {
    if (notistackRef && notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const browserTheme = prefersDarkMode ? 'dark' : 'light';
  const userTheme = userPrefs?.theme;
  const themeId = (!userTheme || userTheme === 'system') ? browserTheme : userTheme;
  const userPrimaryColor = getColor(userPrefs?.primaryColor)?.import || getColor('blue')?.import;
  const userSecondaryColor = getColor(userPrefs?.secondaryColor)?.import || getColor('blue')?.import;
  const customTheme = createTheme({
    palette: {
      mode: themeId,
      primary: userPrimaryColor,
      secondary: userSecondaryColor
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
  const firstChapter = Object.keys(CHAPTERS)[0] || 'introduction';
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <ModalProvider>
          <SnackbarProvider
            ref={notistackRef}
            maxSnack={3}
            action={(key: number) => (
              <IconButton sx={{ color: 'inherit' }} onClick={onClickDismiss(key)}>
                <CloseIcon />
              </IconButton>
            )}
          >
            <AppContext.Provider value={appContextValue}>
              <CssBaseline />
              <MainAppBar />
              <Box sx={{ ml: fullScreen ? '250px' : '0', mb: 2 }}>
                <Appdrawer />
                <Routes>
                  <Route path="license" element={<License />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="rules" element={<Navigate replace to={`/rules/${firstChapter}`} />} />
                  <Route path="rules/:page" element={<Rules />} />
                  <Route path="rule/:id" element={<Boon />} />
                  <Route path="characters" element={<Characters />} />
                  <Route path="character/:id" element={<CharacterEditor />} />
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
              </Box>
            </AppContext.Provider>
          </SnackbarProvider>
        </ModalProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
