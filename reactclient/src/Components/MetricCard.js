import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import SetThreshold from './SetThreshold';

function MetricCard(props) {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
       <SetThreshold/>
      </Grid>
      <Grid item xs={12} sm={4}>
      <SetThreshold/>
      </Grid>
      <Grid item xs={12} sm={4}>
      <SetThreshold/>
      </Grid>
    </Grid>
  );
  }

export default MetricCard; 
