import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ chartData }) => {
  return (
    <Line
      options={{
        maintainAspectRatio: false,
        responsive: true,
      }}
      data={chartData}
    />
  );
};

export default LineChart;
