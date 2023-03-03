import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import "./Activitybar.css";
import LineChart from './LineChart';
import Chip from '@mui/material/Chip';

const Activitybar = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['CPU', 'Disk', 'Memory'];
      const type = types[Math.floor(Math.random() * types.length)];
      const value = Math.floor(Math.random() * 100);
      const message = `The ${type} usage is at ${value}%`;
      setNotifications((notifications) => [...notifications, { message, time: new Date(), type, value }]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getChipColor = (value) => {
    if (value >= 80) {
      return 'error';
    } else if (value >= 60) {
      return 'warning';
    } else {
      return "success";
    }
  };

  return (
    <div className="Activitybar-container"  >
      <Box>
        <h3 className={`Activitybar`}>
          <b style={{marginTop:'20px'}}> Activity Feed</b>
        </h3>
   
        <Box sx={{width:'80%', height:'200px', display: 'flex',justifyContent: 'center', marginLeft:'60px'}}>
          <div style={{width:'80%', height:'70%', PaddingTop: "-10px", marginTop: "-10px"}}>
            <LineChart />
          </div>
        </Box>
      </Box>

      <hr style={{ zIndex: 1, paddingTop: "40px", border: "none", borderBottom: "3px solid #808080" }} />

      <List sx={{ overflow: 'auto', maxHeight: '400px' }}>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                primary={notification.message}
                secondaryTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
                secondary={notification.time.toLocaleString()}
              />
              <Box sx ={{marginRight: "30px", marginTop: "15px"}}>
              <Chip label={`${notification.value}%`} color={getChipColor(notification.value)} />
              </Box>
            </ListItem>
            {index < notifications.length - 1 && <Divider variant="inset" component="li" sx={{ marginLeft: '-20px' }} />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Activitybar;
