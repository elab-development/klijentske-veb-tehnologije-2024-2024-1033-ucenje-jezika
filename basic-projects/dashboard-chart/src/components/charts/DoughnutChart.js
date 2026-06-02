import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const DoughnutChart = ({ chartData }) => {
  return (
    <Doughnut
      options={{
        maintainAspectRatio: false,
        responsive: true,
      }}
      data={chartData}
    />
  );
};

export default DoughnutChart;
