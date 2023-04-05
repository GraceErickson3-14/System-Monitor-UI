import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SkeletonBarChart from './BarChartSkeleton';
import {Box} from '@mui/material';



const LandingPageSkeleton = () => {
    return (

      <div style={{ marginTop: '200px' }}>
      <Container>
        <Grid container spacing={2}>
          {[...Array(12)].map((_, index) => (
            <Grid item key={index} xs={3}>
              <Box sx={{ position: 'relative', border: '1px #ccc', borderRadius: '4px', width: '100%', height: '250px' }}>
                <Skeleton sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#e0e0e0' }} variant="rectangular" />
                <Box sx={{ position: 'absolute', left:"10px",bottom: '1px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                  <Skeleton sx={{ width: 80, height: 220, backgroundColor: '#f5f5f5' }} variant="rectangular" />
                  <Skeleton sx={{ width: 80, height: 180, backgroundColor: '#f5f5f5' }} variant="rectangular" />
                  <Skeleton sx={{ width: 80, height: 120, backgroundColor: '#f5f5f5' }} variant="rectangular" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
    );
  };


export default LandingPageSkeleton;
