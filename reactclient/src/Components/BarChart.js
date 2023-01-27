import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from 'react-chartjs-2';
import './BarChart.css';


ChartJS.register(BarElement, CategoryScale, LinearScale);

class BarChart extends React.Component {
    state = {
        chartData: {
            labels: ['User', 'System', 'Idle'],
            datasets: [
                {
                    label: 'Utilization',
                    data: this.props.machineData,
                    backgroundColor: ['rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                },
            ],
        },

   
    };



    shouldComponentUpdate(nextProps, nextState) {
        // Compare the current props and state to the next props and state
        if (this.props.machineData === nextProps.machineData && this.state.chartData === nextState.chartData) {
            return false;
        }
        return true;
    }

 
    render() {
        return (
            <div className="bar-chart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: "right",
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return tooltipItem.yLabel;
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    }

}

export default BarChart;
