import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';
import './LineChart.css';
import {ReportProblemIcon as Icon} from '@mui/icons-material/ReportProblem';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const pointImage = new Image();
pointImage.src = "https://www.freeiconspng.com/thumbs/warning-icon-png/status-warning-icon-png-29.png";


class LineChart extends React.Component {
  constructor(props) {
    super(props);
    console.log("props:", props);
    this.state = {
      chartData: {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Utilization',
            data: this.props.data,
            backgroundColor: ['rgba(30, 136, 229, 0.85)',
                              'rgba(144, 202, 249)',
                              'rgba(103, 58, 183, 0.85)'],
            pointStyle: this.props.data.map((point) => {
                    if (point >= this.props.threshold) {
                                  const canvas = document.createElement('canvas');
                                  canvas.width = 25;
                                  canvas.height = 25;
                                  const ctx = canvas.getContext('2d');
                                  ctx.drawImage(pointImage, 0, 0, 25, 25);
                                  return canvas;
                                } else {
                                  return 'circle';
                                }
                              }),
          },
        ],
      },
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.labels === nextProps.labels &&
      this.props.data === nextProps.data &&
      this.props.threshold === nextProps.threshold &&
      JSON.stringify(this.state.chartData.datasets) === JSON.stringify(nextState.chartData.datasets)
    ) {
      return false;
    }
    return true;
  }
  

  componentDidUpdate(prevProps) {
    if (prevProps.threshold !== this.props.threshold || prevProps.data !== this.props.data) {
      this.setState({
        chartData: {
          labels: this.props.labels,
          datasets: [
            {
              label: 'Utilization',
              data: this.props.data,
              backgroundColor: ['rgba(30, 136, 229, 0.85)',
                                'rgba(144, 202, 249)',
                                'rgba(103, 58, 183, 0.85)'],
              pointStyle: this.props.data.map((point) => {
                return point >= this.props.threshold ? 'triangle' : 'circle';
              }),
            },
          ],
        },
      });
    }
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
            elements:{
              point:{
                pointStyle: pointImage
              }

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
