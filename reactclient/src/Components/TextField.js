import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';


const TextField = ({placeholder}) => {
    const ariaLabel = {
      'aria-label': placeholder,
    };
  
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          marginRight: "200px",
        }}
        noValidate
        autoComplete="off"
      >
        <Input sx={{ fontFamily: "Roboto", fontWeight: 600,  fontSize: '1.0625rem', }} placeholder={placeholder} inputProps={ariaLabel} />
      </Box>
    );
  };
  
  export default TextField;

