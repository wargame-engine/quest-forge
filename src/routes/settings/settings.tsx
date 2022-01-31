import { Container, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AppContext } from 'hooks/appcontext';
import React from 'react';
import { colors } from 'utils/colors';

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