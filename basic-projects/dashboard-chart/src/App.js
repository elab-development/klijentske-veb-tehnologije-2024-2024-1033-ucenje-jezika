import { useState } from 'react';

import { buyers } from './data';
import BarChart from './components/charts/BarChart';
import PieChart from './components/charts/PieChart';
import Filter from './components/Filter';
import LineChart from './components/charts/LineChart';
import PolarChart from './components/charts/PolarChart';
import DoughnutChart from './components/charts/DoughnutChart';

function App() {
  const [userData, setUserData] = useState({
    labels: buyers.map((data) => data.name),
    datasets: [
      {
        label: 'Best clients',
        data: buyers.map((data) => data.amount),
      },
    ],
  });
  const [mode, setMode] = useState('bar');

  return (
    <div className='container'>
      <div className='card'>
        <Filter setMode={setMode} />
        <div className='chart'>
          {mode === 'bar' && <BarChart chartData={userData} />}
          {mode === 'pie' && <PieChart chartData={userData} />}
          {mode === 'line' && <LineChart chartData={userData} />}
          {mode === 'polar' && <PolarChart chartData={userData} />}
          {mode === 'doughnut' && <DoughnutChart chartData={userData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
