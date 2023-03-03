
import React, { Component } from 'react';
import Slider from 'react-slick';
import './Carousel.css';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BarChart from './BarChart';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import DetailedView from './DetailedView';

class Carousel extends Component {
    state = {
        machines: [],
        machineData: [],
    };

    fetchMachineId = async () => {
        let machines = [];
        try {
            const response = await axios.get(`http://localhost:5105/api/metrics`);
         
            machines = machines.concat(response.data);
        
            this.setState({ machines }, () => {
                if (this.state.machines.length > 0) {
                    this.fetchMachineData();
                }
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    async componentDidMount() {
    
        try {
            await this.fetchMachineId();
            if (this.state.machines.length > 0) {
                this.fetchMachineData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchMachineData = async () => {
        let machineData = [];

        try {
            for (let i = 0; i < this.state.machines.length; i++) {
                
                const response = await axios.get(`http://localhost:5105/api/metrics/${this.state.machines[i]}`);
                machineData[i] = [response.data.cpu.utilization.user, response.data.cpu.utilization.system, response.data.cpu.utilization.idle];
                
            }
            
            this.setState({ machineData });
  

        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            arrow: true,
            speed: 500,
            slidesToShow:3,
            slidesToScroll: 1
        };
     
        if (!this.state.machines || Object.keys(this.state.machines).length === 0 || !this.state.machineData || Object.keys(this.state.machineData).length === 0)
         {
            return null;
        }

        return (
       
        <div style={{ paddingTop: '150px'}}>
            <div className="carousel-container">
                <Slider {...settings}>
                    {this.state.machines.map((machine,index) => (
       
                        <div key={index} className="slide">    
                    <Link to={`/detailed-view/${machine}`}>
                        <button className="machine-button">
                             Machine: {machine}
                        </button>
                    </Link>
                           <div className="barchart-container">
                        <Box sx={{ boxShadow: '0px 10px 5px 0px rgba(0,0,0,0.25)' }}>
                            <BarChart sx={{ boxShadow: '0px 10px 5px 0px rgba(0,0,0,0.25)' }} labels={['User', 'System', 'Idle']} data={this.state.machineData[index]}/>

                            </Box>
                            </div>
                        </div>
                    ))}
                    </Slider>

            </div>
                <Box sx={{marginLeft:"580px", marginTop:"150px"}}>
                    <button className="myButton">Add new machine</button>
                </Box>
            </div>
        );
     }
    

}

export default Carousel;


