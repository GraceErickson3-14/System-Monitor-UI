import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import SetThreshold from './SetThreshold';

function MetricCard({ onMemoryThresholdChange, onCpuThresholdChange, onDiskThresholdChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <SetThreshold
          sliderId="memory"
          onStateChange={onMemoryThresholdChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SetThreshold
          sliderId="cpu"
          onStateChange={onCpuThresholdChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SetThreshold
          sliderId="disk"
          onStateChange={onDiskThresholdChange}
        />
      </Grid>
    </Grid>
  );
}




export default MetricCard; 
