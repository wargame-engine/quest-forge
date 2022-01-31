import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { BottomNavigation, BottomNavigationAction, Box, Button, CardActionArea, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Tab, Tabs } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { colors } from 'utils/colors';
import Attributes from 'routes/character-creator/attributes';
import Abilities from 'routes/character-creator/abilities';
import Basic from 'routes/character-creator/basic';
import { useLocalStorage } from 'hooks/use-localstorage';
import { AppContext } from 'hooks/appcontext';
import useConfirmation from 'components/modals/confirm';

const THEMES = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export default function Home() {
  const appContext = React.useContext(AppContext);
  const { userPrefs, setUserPrefs } = appContext;
  const colorOptions = Object.values(colors).map((color, index) => {
    return <MenuItem key={index} value={color.id}>{color.name}</MenuItem>;
  });
  const primaryColor = userPrefs?.primaryColor;
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Settings
      </Typography>
      <FormGroup>
        <FormControl component="fieldset">
          <FormLabel component="legend">Theme</FormLabel>
          <RadioGroup
            row
            aria-label="theme-radio"
            name="theme-radio-group"
            value={userPrefs?.theme}
            onChange={(event) => {
              setUserPrefs({
                ...userPrefs,
                theme: event.target.value,
              });
            }}
          >
            {THEMES.map((type) => (
              <FormControlLabel
                key={type.value}
                value={type.value}
                control={<Radio />}
                label={type.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </FormGroup>
      <FormGroup sx={{ my: 1 }}>
        <FormControl>
          <InputLabel id="primary-color-label">Primary Color</InputLabel>
          <Select
            labelId="primary-color-label"
            size="small"
            id="primary-color"
            value={primaryColor}
            label="Primary Color"
            onChange={(event) => {
              setUserPrefs({
                ...userPrefs,
                primaryColor: event.target.value,
              })
            }}
          >
            {colorOptions}
          </Select>
        </FormControl>
      </FormGroup>
    </Container>
  );
};