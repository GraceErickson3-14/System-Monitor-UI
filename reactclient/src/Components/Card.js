import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { Card, CardHeader, CardContent, CardActions, Typography, Button, Divider, Box, Chip, Avatar } from '@mui/material';
import { Link } from "react-router-dom";
import BarChart from "./BarChart";
import { Container } from "@mui/system";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import "./Card.css";
import axios from 'axios';
import BarChartSkeleton from './BarChartSkeleton';
import TextField from './TextField';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MyChip from './Chip';



const Cards = ({ title, subtitle, machineId}) => {
  const statuses = ['Active', 'Idle', 'Not Reported'];
  const colors = ['#8BC34A', '#2196f3', '#9e9e9e'];
  const randomIndex = Math.floor(Math.random() * 10) % 3;
  const status = statuses[randomIndex];
  const color = colors[randomIndex];
  const [chartisLoading, setChartisLoading] = useState(true);

  const thecolor = color.replace('#', '');
  const thestatus = status.charAt(0);


  const [machineData, setMachineData] = useState([]);

  const fetchMachineData = async () => {
    try {
      const response = await axios.get(`http://localhost:5105/api/metrics/${machineId}`);
      setMachineData([
        response.data.cpu.utilization.user,
        response.data.cpu.utilization.system,
        response.data.cpu.utilization.idle
      ]);

    } catch (error) {
      console.error(error);
      setMachineData([0, 0, 0]);
    }
  }

  useEffect(() => {
    fetchMachineData();
  }, [machineId]);

  useEffect(() => {
    setTimeout(() => {
      setChartisLoading(false);
    }, 1000);
  }, []);



  return (
    <Card className={`myclass${thecolor}`} sx={{borderRadius:"30px"}}>
         <CardHeader
      action={
        <>
          <TextField placeholder={machineId} />
          <IconButton sx={{marginLeft:"235px",marginTop: "-60px"}}>
            <MoreHorizIcon fontSize="large" />
          </IconButton>
        </>
      }
      sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
    />
        <Divider sx={{border: `.5px solid ${color}`}}/>
         <CardContent sx={{width:'100%'}}>
      
          <Typography variant="subtitle2">{subtitle}</Typography>
          {chartisLoading ? (
            <div style={{marginLeft:"10px", height:"90px", marginBottom:"20px", marginLeft: '-10px'}}>
              <BarChartSkeleton/>
            </div>
          ) : (
            <Container sx={{backgroundColor: '#F8FAFC', width: '370px', marginLeft: '-40px'}}>
            <Box>
              <BarChart labels={['User', 'System', 'Idle']} data={[machineData[0], machineData[1], machineData[2]]} />
            </Box>
        </Container>
           )}
        </CardContent>
      <Divider sx={{border: `.5px solid ${color}`}}/>
      <CardActions>
      <div style={{marginLeft:"10px"}}>
     
      <MyChip status = {status} color ={color}/>
    

      </div>
      <Link to={`/detailed-view/${machineId}`} style={{ textDecoration: 'none' }}>
      <Button className={`viewButton${thestatus}`} startIcon={<TroubleshootIcon />} >
        Detailed View
      </Button>
      </Link>
      </CardActions>
    </Card>
  );
};

export default Cards;
