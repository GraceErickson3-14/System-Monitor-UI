import React, { Component, useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailedView.css'
import BarChart from './BarChart';




const DetailedView = () => {
    const { machine } = useParams();
    const [machineData, setMachineData] = useState({});
  
    useEffect(() => {
        if (machine) {
          try {
            axios.get(`http://localhost:5105/api/metrics/${machine}`)
              .then(response => {
                console.log("RESPONSE:", response.data);
                setMachineData(response.data);
                console.log("machine: ", response.data.cpu);
                console.log(machineData.cpu.utilization.idle);
                
              });
          } catch (error) {
            console.error(error);
          }
        }
        
      }, [machine]);
    
    return (
      <div style={{ height: '500px', overflow: 'scroll',width: "800px",paddingTop: '100px'}}>
        <header>
          <h1>Detailed View for Machine: {machine}</h1>
            <p>I need to fix my barchart component and create other types of 
                chart components to display the data. I also need to figure out how to not 
                make this page look really <b>BAD</b> </p>
        </header>
        <section className="section_CPU">
          <h2>CPU Utilization</h2>
          <BarChart/>
        </section>
        <section className="section_MEM">
          <h2>Memory Usage</h2>
        </section>
        <section className="section_DISK">
          <h2>Disk Utilization</h2>
        </section>
      </div>
    );
  };
  
  export default DetailedView;

