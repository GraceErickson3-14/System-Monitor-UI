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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Activitybar = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['CPU', 'Disk', 'Memory'];
      const type = types[Math.floor(Math.random() * types.length)];
      const value = Math.floor(Math.random() * 100);
      const message = `The ${type} usage is at ${value}%`;
      setNotifications((notifications) => [...notifications, { message, time: new Date(), type, value }]);
    }, 1000);
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
            <LineChart  labels={['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']} data={[28, 20, 40, 19, 20, 27, 10, 30, 90]}  />
          </div>
        </Box>
      </Box>

      <hr style={{ zIndex: 1, paddingTop: "50px", border: "none", borderBottom: "3px solid #808080" }} />

      <Stack sx={{ width: '100%', overflowY: 'scroll', maxHeight:"400px" }} spacing={2}>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <Alert severity={getChipColor(notification.value)}>{notification.message} - {notification.time.toLocaleString()}</Alert>
          </React.Fragment>
        ))}
      </Stack>
    </div>
  );
};

export default Activitybar;
