import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailedView.css'



class DetailedView extends Component {
    state = {
        machineData: {},
    };

    async componentDidMount() {
        const { machine } = this.props;
        console.log(this.props.machine);
      
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Detailed View for Machine: TO BE ADDED</h1>
                </header>
                <section className="section_CPU">
                    <h2>CPU Utilization</h2>
                
                </section>
                <section className="section_MEM">
                    <h2>Memory Usage</h2>
                    
                </section>
                <section className="section_DISK">
                    <h2>Disk Utilization</h2>   
                </section>
            </div>
        );
    }
}

export default DetailedView;
