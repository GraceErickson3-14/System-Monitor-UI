import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import './LineChart.css';
import {ReportProblemIcon as Icon} from '@mui/icons-material/ReportProblem';
import useLineState from './hooks/useLineState';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const pointImage = new Image();
pointImage.src = "https://www.freeiconspng.com/thumbs/warning-icon-png/status-warning-icon-png-29.png";


const LineChart = ({ 
  labels = [], 
  data: inputData = [], 
  label = [], 
  onStateChange = () => {} 
}) => {
  // Check if the required props are provided
  const hasData = labels.length > 0 && inputData.length > 0 && label.length > 0;

  console.log("inputData:",inputData);

  const initialData = {
    labels: labels.length > 0 ? labels : [null],
    datasets: hasData ? inputData.map((data, index) => ({
      label: label[index],
      data: data,
      backgroundColor: ['rgba(30, 136, 229, 0.85)',
                        'rgba(144, 202, 249)',
                        'rgba(103, 58, 183, 0.85)']
    })) : [{
      label: '',
      data: [null],
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    }]
  };

  const [data, setData] = useLineState(initialData, onStateChange);

  console.log("finalData:", data);

  return (
    <div className="line-chart">
      <Line
        data={data}
        options={{
          maintainAspectRatio: true,
          title: {
            display: true,
            fontSize: 25,
            text: hasData ? 'Line Chart' : 'No data available'
          },
          elements: {
            point: {
            }
          },
          legend: {
            display: hasData,
            position: 'right',
          },
          tooltips: {
            enabled: hasData,
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
};

export default LineChart;
