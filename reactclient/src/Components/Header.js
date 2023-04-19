
import React from 'react';
import './Header.css'; 
import { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Badge from './Badge';
import Avatar from './Avatar';
import logo from './VitalviewLogo.png';






const theme = createTheme({
    palette: {
      primary: {
        main: '#8DA0CB',
      },
    
    },
  });
  
  const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const shouldScroll = scrollTop > 0;
        setIsScrolled(shouldScroll);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      
      <div className={`header ${isScrolled ? 'scroll' : ''}`}>
      <Box sx={{marginLeft:"50px"}}>
         <img src={logo} alt="Logo" />
      </Box>

      <Box className="abox" sx={{  justifyContent: 'flex-end'}}>
       <div >
       <Badge/>
       </div >

       <div >
       <Avatar/>
       </div>
   
       </Box>

       <hr></hr>
      
       <Box className="breadcrumb-box">
  <Breadcrumb />
</Box>

     

   </div>


   
    );
  };
  
  export default Header;
