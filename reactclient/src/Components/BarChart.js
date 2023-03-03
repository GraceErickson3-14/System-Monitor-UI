import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from 'react-chartjs-2';
import './BarChart.css';


ChartJS.register(BarElement, CategoryScale, LinearScale);

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: 'Utilization',
                        data: this.props.data,
                        backgroundColor: ['rgba(30, 136, 229, 0.85)',
                        'rgba(144, 202, 249)', 'rgba(103, 58, 183, 0.85)'],
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
                            position: 'right',
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return tooltipItem.yLabel;
                                },
                            },
                        },
                    }}
                />
            </div>
        );
    }
}

export default BarChart;
