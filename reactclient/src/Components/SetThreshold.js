import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-plaza.css';
import "./SetThreshold.css";
import { Card, CardHeader, CardContent, CardActions, Divider, Avatar } from '@mui/material';
import useThresholdState from './hooks/useSliderState';
import PropTypes from 'prop-types';




const getTrackColor = (memoryThreshold) => {

  if (memoryThreshold < 25) {
    return 'grey' 
  } else if (memoryThreshold <= 50) {
    return 'rgba(144, 202, 249) ' 
  } else if (memoryThreshold <= 75) {
    return 'rgba(30, 136, 229, 0.85)'; 
  } else {
    return 'rgba(103, 58, 183, 0.85)'; 
  }
};

const StyledSlider = styled(Slider)(({ memoryThreshold }) => ({

    '& .MuiSlider-rail': {
      height: '8px',
      borderRadius: '4px',
      backgroundImage:'repeating-linear-gradient(to right, grey 0%,  grey 25%, rgba(144, 202, 249) 25%, rgba(144, 202, 249) 50%, rgba(30, 136, 229, 0.85) 50%, rgba(30, 136, 229, 0.85) 75%,rgba(103, 58, 183, 0.85) 75%, rgba(103, 58, 183, 0.85) 100%)',
    },
    '& .MuiSlider-track': {
      height: '8px',
      borderRadius: '4px',
      backgroundColor: getTrackColor(memoryThreshold),
    },
    '& .MuiSlider-thumb': {
      backgroundColor: 'rgba(0,0,0,0.01)',
    },
    '& .MuiSlider-mark': {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '-20px', // adjust this value to change the vertical position of the marks
      width: '1px',
      height: '8px',
      backgroundColor: 'currentColor',
      '& .MuiSlider-markLabel': {
        top: '20px', // adjust this value to change the vertical position of the labels
      },
    },
    '& .MuiSlider-markLabel': {
      color: 'black',
      fontSize: '0.75rem',
      whiteSpace: 'nowrap',

    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: getTrackColor(memoryThreshold),
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  }));

 

  
  function SetThreshold({ sliderId, onStateChange = () => {} }) {
    const [memoryThreshold, setMemoryThreshold] = useThresholdState(50, onStateChange);



    const handleSliderChange = (event, newValue) => {
      setMemoryThreshold(newValue);
 
      onStateChange(sliderId, newValue); 
      
    };
   
    const marks = [    {      value: 0,      label: '0',    },    {      value: 25,      label: '25',    },    {      value: 50,      label: '50',    },    {      value: 75,      label: '75',    },    {      value: 100,      label: '100',    },  ];
 
    return(

    <Card sx={{border: ".1px solid #D0D0D0", boxShadow: "0 0 8px #D0D0D0", borderRadius:"40px"}}>
    <CardHeader title={sliderId.toUpperCase()} sx={{ color: 'rgba(0, 0, 0, 0.6)' }} >
  
    </CardHeader>
        <Divider sx ={{border: "1px dashed grey"}}/>

        <CardContent>

        <Box sx={{mt: 4}}>
        <div className= "odometer-theme-example" style = {{backgroundColor: "#f0f8ff"}}>
        <Odometer value={memoryThreshold} format="(,ddd)" theme="plaza" />
        </div>
        </Box>

        {/*Bottom slider */}
        <Box sx={{ mt: 8, marginLeft: -1 }}>
        <StyledSlider
            aria-labelledby="cpu-slider"
            valueLabelDisplay="on"
            min={0}
            max={100}
            id={sliderId}
            memoryThreshold={memoryThreshold}
            value={memoryThreshold}
            onChange={handleSliderChange}
            marks={marks}
          />

        </Box>

        </CardContent>

    </Card>


    );
  

}


export default SetThreshold; 
