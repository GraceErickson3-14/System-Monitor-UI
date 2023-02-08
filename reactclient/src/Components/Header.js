
import React from 'react';
import './Header.css'; 
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Breadcrumb from './Breadcrumb';


const Header = () => {
    return (
        <div>
            <header className="header">
                <h1>System Monitor</h1>
                <div style={{ marginTop: '45px' }}>
              <Breadcrumb/>
              </div>
            </header>
        </div>
    );
}

export default Header;
