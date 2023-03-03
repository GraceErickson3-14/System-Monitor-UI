import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
    palette: {
      primary: {
        main: '#673ab9d9', // change this to the color you want
      },
    },
  });


export default function Tabys() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="wrapped label tabs example"
      centered
    >
      <Tab
        value="one"
        label="Month"
        wrapped
        style={{ textTransform: 'none', minWidth: 0 }}
      />
      <Tab
        value="two"
        label="Week"
        wrapped
        style={{ textTransform: 'none', minWidth: 0 }}
      />
      <Tab
        value="three"
        label="Day"
        wrapped
        style={{ textTransform: 'none', minWidth: 0 }}
      />
    </Tabs>
    </ThemeProvider>
  );
}
