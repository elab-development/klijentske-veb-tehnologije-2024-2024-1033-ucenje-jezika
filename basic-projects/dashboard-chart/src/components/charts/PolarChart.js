import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const PolarChart = ({ chartData }) => {
  return (
    <PolarArea
      options={{
        maintainAspectRatio: false,
        responsive: true,
      }}
      data={chartData}
    />
  );
};

export default PolarChart;
