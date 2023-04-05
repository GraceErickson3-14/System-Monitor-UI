import React, { useState, useEffect } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailedView.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper, Grid } from '@mui/material';
import Activitybar  from './Activitybar';
import Skeleton from '@mui/material/Skeleton';
import Tabys from "./Tab";
import SkeletonDetailedView from './SkeletonDetailedView';
import ExceededThresholdMessagesList from "./AlertsList";
import MetricCard from './MetricCard';



const DetailedView = () => {
  const { machine } = useParams();
  const [memoryData, setMemoryData] = useState({});
  const [cpuData, setCpuData] = useState({});
  const [diskData, setDiskData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cpuThreshold, setCpuThreshold] = useState(80);
const [cpuThresholdError, setCpuThresholdError] = useState(false);
  
  let Memory = {};
  let CPU = {};
  let Disk = {};

  useEffect(() => {
    

    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5105/api/metrics/${machine}`);
      CPU = response.data.cpu;
      setCpuData(CPU);
      console.log("CPU",CPU);

      Disk = response.data.disk;
      setDiskData(Disk);
      console.log("DISK", response.data.disk);

      Memory = response.data.memory;
      setMemoryData(Memory);
      console.log("MEMO", Memory.usage.gigabytesUsed);
    };

    fetchData();
  }, [machine]);

  useEffect(() => {
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '10px 0',
  }));
  
  const messages = [
    { id: 1, content: "Message 1", read: false },
    { id: 2, content: "Message 2", read: false },
    { id: 3, content: "Message 3", read: false },
  ];
  return (
    <div className="comp">
      {isLoading ? (
      <SkeletonDetailedView/>
      ) : (
        <Container maxWidth="xl" sx={{ margin: 'auto' }}>

          {/* Baby Blue background*/}
          <Box className="container_box">
            
            {/* Grid for page begins*/}
            <Grid container spacing={2}>
                     {/* VIOLATIONS/Alerts*/}
               <Grid item xs={24} md={12}>
                <Item className="section">
                  <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft:"20px",marginTop:"10px"}}>
                    <h3>Thresholds for {machine}</h3>
                  </Box>
                
                    <hr className='hr_dude'></hr>
                  <Box sx={{marginLeft:"50px"}}>
                    
                 
                 <MetricCard />
                 
             
                  </Box>
                </Item>
              </Grid>

                {/*Grid containing memory and CPU Begin*/}
  {/*------------------------------------------------------------------------------------*/}
              <Grid item xs={10} md={6} direction="column">
                {/* Memory */}
                <Item className="section">
                  <Box sx={{ flexDirection:'row'}}>
                    <Box sx={{  marginTop:"10px", flexDirection:'column', marginLeft:"20px"}}>
                      <h3>Memory</h3>
                      <h5>Based on the selected period</h5>
                    </Box>
                    <Box sx={{marginLeft:'300px', marginTop:"-50px", marginBottom: "15px"}}>
                    <Tabys/>
                    </Box>
                      <hr className='hr_dude'></hr>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item xs>
                            <Box sx={{paddingTop:'40px',width:'260px'}}>
                            <BarChart  labels={['Used', 'Available']} data={[memoryData.usage.gigabytesUsed, memoryData.usage.availableMemory]}/>
                            </Box>
                          </Grid>
                          <Grid item>
                            <Box sx={{ marginTop:"10px", marginLeft: "80px"}}>
                              <h6>Available Memory</h6>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={8}>
                        <Box sx={{marginLeft:"26px"}}>
                          <LineChart labels={['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']} data={[28, 48, 40, 19, 86, 27, 90, 80, 45]}/>
                          <Box sx={{paddingLeft:'170px', marginTop:"-28px"}} >
                            <h6>Utilization over time</h6>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Item>

                {/* CPU*/}
                <Item className="section" sx={{ marginTop: "30px" }}>

                  <Box sx={{ flexDirection:'row'}}>

                    <Box sx={{  marginTop:"10px", flexDirection:'column', marginLeft:"20px"}}>
                    <h3>CPU Utilization 
                    </h3>
                    <h5>Based on the selected period</h5>
                    </Box>
                    <Box sx={{marginLeft:'300px', marginTop:"-50px", marginBottom: "15px"}}>
                    <Tabys/>
                    </Box>
                    <hr className='hr_dude' ></hr>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{paddingTop:'25px'}}>
                        <PieChart labels={['User', 'System', 'Idle']} data= {[30, 50, 20]}/>
                        </Box>
                        <Box sx={{ marginTop:"15px", marginLeft:"40px"}}>
                        <h6>Average Utilization </h6>
                        </Box>

                      </Grid>
                      <Grid item xs={8}>
                        <LineChart labels={['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']} data={[50, 48, 5, 30, 86, 0, 5, 20, 45]} threshold={50}/>
                        <Box sx={{paddingLeft:'150px', marginTop:"-28px"}} >
                          <h6>Utilization over time</h6>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                </Item>
                        
                {/*Grid containing memory and CPU ENDS*/}
              </Grid>
  {/*-----------------------------------------------------------------------*/}
              {/* Activity bar*/}
              <Grid item xs={13} md={6}>
                <Item>
                  <Activitybar/> 
                </Item>
              </Grid>
            
    {/*-----------------------------------------------------------------------*/}
              {/* Disk Section*/}
              <Grid item xs={24} md={12}>
                <Item className="section">
                  <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft:"20px",marginTop:"10px"}}>
                    <h3>Disk</h3>
                    <h5>Based on the selected period</h5>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop:"-53px", marginRight:"100px", marginBottom: "15px" }}>
                    <Tabys/>
                  </Box>
                    <hr className='hr_dude'></hr>
                  <Box sx={{marginLeft:"50px"}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <LineChart labels={['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']} data={[28, 48, 40, 19, 86, 27, 90, 80, 45]}/>
                      <Box sx={{ marginLeft:"150px",marginTop:"28px"}} >
                          <h6>Latency</h6>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={2.5}>
                      <PieChart labels={['Used', 'Available']} data= {[80, 20]}/>
                      <Box sx={{ marginLeft:"70px",marginTop:"28px"}} >
                          <h6>Available Space</h6>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <BarChart labels={['Operations']} data= {[150]}/>
                      <Box sx={{ marginLeft:"160px",marginTop:"50px"}} >
                          <h6>Total Operations</h6>
                        </Box>
                    </Grid>
                  </Grid>
                  </Box>
                </Item>
              </Grid>

  {/*-----------------------------------------------------------------------*/}

            </Grid >

          </Box>

        </Container>
      )}
    </div>
  );
};
export default DetailedView;
