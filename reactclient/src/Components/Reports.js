import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./Reports.css";

import Chart from 'chart.js';
import ReportCharts from './ReportCharts'; 
import MachineTable from './Table';
import LineChart from "./LineChart";
import Divider from '@mui/material/Divider';


import axios from 'axios';


function Reports() {


  const [machines, setMachines] = useState([]);
  const [machineData, setMachineData] = useState([]);

  const [selectedData, setSelectedData] = useState(null);



  // Fetch machine IDs
  useEffect(() => {
    fetchMachineId();
  }, []);

  const fetchMachineId = async () => {
    let fetchedMachines = [];
    try {
      const response = await axios.get(`http://localhost:5105/api/metrics`);
      fetchedMachines = fetchedMachines.concat(response.data);
      setMachines(fetchedMachines);

    //  console.log("Machine ID in reports:", fetchedMachines);

      // Fetch data for each machine ID after fetching all IDs
      fetchMachineData(fetchedMachines);

    } catch (error) {
      console.error(error);
    }
  }

  const fetchMachineData = async (machineIds) => {
    let fetchedMachineData = [];

    for (const id of machineIds) {
      try {
        const response = await axios.get(`http://localhost:5105/api/metrics/${id}`);
        fetchedMachineData.push(response.data);

      } catch (error) {
        console.error(`Error fetching data for machine ID ${id}:`, error);
      }
    }

    setMachineData(fetchedMachineData);
   // console.log("Machine data in reports:", fetchedMachineData);
  }


  function handleGeneratedReport(data) {
    console.log("Report data from MachineTable:", data);
    setSelectedData(data);
  }

  //console.log("selectedData.labels", selectedData.labels);
  //const dataArray = Object.values(selectedData.data[0]);
  //console.log("data array",dataArray[0]);
  return (
    <div className="comp">
    <Container maxWidth="xl" sx={{ margin: 'auto' }}>
      {/* Baby Blue background*/}
      <Box className="container_box">
      <div style={{marginBottom:"80px"}}>
      <MachineTable data={machineData} onGenerateReport={handleGeneratedReport} />

      </div>
      <div style={{marginBottom:"40px"}}>
      <Divider sx={{ borderWidth: '1px', borderColor: 'black', borderRadius: "100px" }} />
      </div>

      <LineChart 
          labels={['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']} 
          data={[]}
          label={["Machine 1"]}
        />

      
      </Box>
    </Container>
  </div>
);

}

export default Reports;
