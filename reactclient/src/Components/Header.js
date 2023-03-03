
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
       <div style={{ marginRight: '40px', marginTop:'-90px' }}>
            {/*<Badge/>*/}
       </div >

       <div style={{ marginBottom: '20px', marginRight: "60px", marginTop:'-95px'}}>
               {/*<Avatar/>*/}
       </div>
   
       </Box>

       <hr></hr>
      
       <Box sx={{ justifyContent: 'flex-start', marginTop: '-10px', marginLeft: '20px', marginBottom: '15px', height: '15px', width: '30%' }}>
  <Breadcrumb />
</Box>

     

   </div>


   
    );
  };
  
  export default Header;
