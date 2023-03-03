import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PieController, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

ChartJS.register(PieController, ArcElement, CategoryScale, LinearScale, Legend, Tooltip);

class PieChart extends React.Component {
    state = {
        chartData: {
            labels: ['User', 'System', 'Idle'],
            datasets: [
                {
                    label: 'Utilization',
                    data: [300, 50, 100],
                    backgroundColor: ['rgba(30, 136, 229, 0.85)',
                    'rgba(144, 202, 249', 'rgba(103, 58, 183, 0.85)'],
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
            <div className="pie-chart">
                <Pie
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
                                  
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

export default PieChart;
