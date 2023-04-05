import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';

const SkeletonDetailedView= (props) => {
  const {color}= props;
  return (
    
    <div>
           <Box sx={{ position: 'relative', border: '1px #ccc', borderRadius: '4px', width: 700, height: '250px', marginBottom:"120px" }}>
  <Skeleton variant="rect" sx={{ width: 1320, height: 350, borderRadius: '20px', marginBottom: '10px', marginLeft:"60px" }} />
  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 200px)', position: 'absolute', left: '100px', bottom: '1px', gap:"50px", marginBottom:"-80px"}}>
    {[...Array(4)].map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px'  }}>
        <Skeleton sx={{ width: 80, height: 290, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 200, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 160, backgroundColor: '#f5f5f5' }} variant="rectangular" />
      </Box>
    ))}
  </Box>
</Box>

         

        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
             <Skeleton variant="rect" sx={{ width: 700, height: 350, borderRadius: '20px', marginBottom: '20px' }}/>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', left: '100px', bottom: '1px', gap:"100px",marginBottom:"-120px"}}>
    {[...Array(2)].map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-end', gap: '3px'  }}>
        <Skeleton sx={{ width: 80, height: 290, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 200, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 160, backgroundColor: '#f5f5f5' }} variant="rectangular" />
      </Box>
    ))}
  </Box>
             
    <Skeleton variant="rect" sx={{ width: 700, height: 350, borderRadius: '20px' }}/>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', left: '100px', bottom: '1px', marginLeft: "850px", marginBottom: "-100px"}}>
             <Box  sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px',  }}>
        <Skeleton sx={{ width: 80, height: 260, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 200, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 140, backgroundColor: '#f5f5f5' }} variant="rectangular" />
      </Box>
      </Box>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', left: '100px', bottom: '1px', gap:"100px", marginBottom:"-500px"}}>
    {[...Array(2)].map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-end', gap: '3px'  }}>
        <Skeleton sx={{ width: 80, height: 290, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 200, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 160, backgroundColor: '#f5f5f5' }} variant="rectangular" />
      </Box>
    ))}
  </Box>
            </div>
             <Skeleton variant="rect" sx={{ width: 600, height: 720, borderRadius: '20px', marginBottom:"20px", marginLeft:"30px"}}/>
        </div>
        <Box sx={{ position: 'relative', border: '1px #ccc', borderRadius: '4px', width: 700, height: '250px', marginBottom:"120px" }}>
  <Skeleton variant="rect" sx={{ width:  1320, height: 350, borderRadius: '20px', marginBottom: '10px', marginLeft:"60px" }} />
  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 200px)', position: 'absolute', left: '100px', bottom: '1px', gap:"50px", marginBottom:"-80px"}}>
    {[...Array(4)].map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-end', gap: '10px'  }}>
        <Skeleton sx={{ width: 80, height: 290, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 200, backgroundColor: '#f5f5f5' }} variant="rectangular" />
        <Skeleton sx={{ width: 80, height: 160, backgroundColor: '#f5f5f5' }} variant="rectangular" />
      </Box>
    ))}
  </Box>
</Box>
    </div>
  );
};

export default SkeletonDetailedView;
