import { PaletteMode } from '@mui/material';
import React from 'react';

type AppContext = {
  drawerOpen: boolean,
  setDrawerOpen: Function,
  enableSearch: any,
  setEnableSearch: Function,
  searchMode: boolean,
  setSearchMode: Function,
  contextActions: any,
  setContextActions: Function
  searchText: string,
  setSearchText: Function
  userPrefs: {
    theme?: string,
    primaryColor?: string
  },
  setUserPrefs: Function
}

export const AppContext = React.createContext<AppContext>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  enableSearch: false,
  setEnableSearch: () => {},
  contextActions: [],
  setContextActions: () => {},
  searchText: '',
  setSearchText: () => {},
  searchMode: false,
  setSearchMode: () => {},
  userPrefs: {},
  setUserPrefs: () => {}
});