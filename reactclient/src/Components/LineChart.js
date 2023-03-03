import React from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './LineChart.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

class LineChart extends React.Component {
  state = {
    chartData: {
      labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'],
      datasets: [
        {
          label: 'CPU',
          data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: ['rgba(30, 136, 229, 0.85)'],
          tension: 0.1,
        },
        {
          label: 'Memory',
          data: [28, 48, 40, 19, 86, 27, 90, 80, 45, 20, 60, 25],
          fill: false,
          borderColor: ['rgba(144, 202, 249'],
        },
        {
          label: 'Disk',
          data: [50, 20, 40, 19, 10, 50, 12, 10, 45, 20, 52, 9],
          fill: false,
          borderColor: [ 'rgba(103, 58, 183, 0.85)'],
        },
      ],
    },
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Compare the current props and state to the next props and state
    if (
      this.props.machineData === nextProps.machineData &&
      this.state.chartData === nextState.chartData
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="line-chart">
        <Line
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

export default LineChart;
