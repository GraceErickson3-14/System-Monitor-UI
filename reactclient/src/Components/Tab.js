// Tabys.js
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useTabState from './hooks/useTabState';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab9d9',
    },
  },
});

const Tabys = ({ section, onStateChange = () => {} }) => {
  const [value, setValue] = useTabState(`${section}_one`, onStateChange);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" centered>
        <Tab value={`${section}_one`} label="Day" wrapped style={{ textTransform: 'none', minWidth: 0 }} />
        <Tab value={`${section}_two`} label="Week" wrapped style={{ textTransform: 'none', minWidth: 0 }} />
        <Tab value={`${section}_three`} label="Month" wrapped style={{ textTransform: 'none', minWidth: 0 }} />
      </Tabs>
    </ThemeProvider>
  );
};

export default Tabys;
