import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PieController, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

ChartJS.register(PieController, ArcElement, CategoryScale, LinearScale, Legend, Tooltip);

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: 'Utilization',
                        data: this.props.data,
                        backgroundColor: [ 'rgba(103, 58, 183, 0.85)','rgba(144, 202, 249)','rgba(30, 136, 229, 0.85)'],
                    },
                ],
            },
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.labels === nextProps.labels &&
            this.props.data === nextProps.data &&
            this.state.chartData === nextState.chartData
        ) {
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
