import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';

const SkeletonBarChart = (props) => {
  const {color}= props;
  return (
    
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '5px', width: '370px', border: '1px #ccc',borderRadius: '4px', }}>
      <Skeleton sx={{ width: 95, height: 120, backgroundColor: props.color }} variant="rectangular" />
      <Skeleton sx={{ width: 95, height: 100, backgroundColor: props.color}} variant="rectangular" />
      <Skeleton sx={{ width: 95, height: 80, backgroundColor: props.color}} variant="rectangular" />
    </Box>
  );
};

export default SkeletonBarChart;
