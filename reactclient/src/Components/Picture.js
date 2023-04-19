import React, { Component, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Typography, Grid, CardContent, Container, Button} from '@mui/material';
import Cards from "./Card";
import logo from "./Detective.png";
import axios from 'axios';
import LandingPageSkeleton from './LandingPageSkeleton';
import AddIcon from '@mui/icons-material/Add';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Link } from "react-router-dom";
import "./detectiveAnimation.css";

const Picture = () => {
  const [machines, setMachines] = useState([]);
  const [pageisLoading, setPageisLoading] = useState(true);
  const [chartisLoading, setChartisLoading] = useState(true);

  useEffect(() => {
    fetchMachineId();
  }, []);

  const fetchMachineId = async () => {
    let fetchedMachines = [];
    try {
      const response = await axios.get(`http://localhost:5105/api/metrics`);
      fetchedMachines = fetchedMachines.concat(response.data);
      setMachines(fetchedMachines);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setChartisLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPageisLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{ marginTop: "160px" }}>
      <Container maxWidth="xl" sx={{ margin: 'auto' }}>
        {pageisLoading ? <LandingPageSkeleton/> : (
          <Box className="container_box">
            <Grid container spacing={2} sx={{ rowGap: 0 }}>
              <Grid item xs={3} sx={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }}>
              <img src={logo} style={{ width: "85%", height: "85%", marginLeft:"20px" }} />
                <Link to={`/reports`} style={{ textDecoration: 'none' }}>
                <Button sx={{marginLeft:'60px', marginTop: "10px", backgroundColor:"#673AB7", width: "170px"}}variant="contained" color="primary" size="large" startIcon={<QueryStatsIcon />}>
                 Reports
              </Button>
              </Link>
              </Grid>
              {machines.map((machine, index) => (
                <Grid key={index} item xs={3}>
                  <Cards machineId={machines[index]} />
                </Grid>
              ))}
              <Grid item xs={3} sx={{ gridColumn: '3 / span 1', gridRow: `${Math.ceil(machines.length/3)+1} / span 1` }}>
              <Link to={`/add-machine`} style={{ textDecoration: 'none' }}>
                <Box sx={{
                   borderRadius: 8,
                   border: '2px solid rgba(0, 0, 0, 0.2)',
                   height: '100%',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   cursor: 'pointer',
                   backgroundColor: 'rgba(0, 0, 0, 0.05)',
                   boxShadow: 'inset 0px 0px 10px grey',
                   transition: 'all 0.2s ease-in-out',

                   ':hover': {
                     backgroundColor: 'rgba(0, 0, 0, 0.1)',
                     boxShadow: 'inset 0px 0px 10px black'
                   }

                }}>
                  
                  <Typography variant="subtitle1"> <AddIcon /> Add new machine</Typography>
                </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
  
}

export default Picture;
