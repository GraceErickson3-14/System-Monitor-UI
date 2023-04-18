import React from 'react';
import { Chip, Tooltip } from '@mui/material';

const MyChip = ({ status, color }) => {
  function getMessage(status) {
    let message;
    switch (status) {
      case 'Active':
        return (message = 'This machine is active');
      case 'Idle':
        return (message = 'This machine is idle');
      case 'Not Reported':
        message = 'This machine is not reported';
        return message;
    }
  }

  return (
    <Tooltip title={getMessage(status)} arrow>
      <Chip
        label={status}
        style={{
          backgroundColor: color,
          color: '#FFF',
          border: '1.5px solid' + color,
          fontSize: '0.875rem',
        }}
      />
    </Tooltip>
  );
};

export default MyChip;
