import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa';
import { BiSolidDoughnutChart } from 'react-icons/bi';
import { PiChartPolarFill } from 'react-icons/pi';

const Filter = ({ setMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='filter-container'>
      <button
        className={`toggle-btn ${collapsed ? '' : 'collapsed'}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        <IoIosArrowDown size={30} />
      </button>
      <div className={`filter-buttons ${collapsed ? 'collapsed' : ''}`}>
        <button className='filter-btn' onClick={() => setMode('bar')}>
          <FaChartBar size={30} />
        </button>
        <button className='filter-btn' onClick={() => setMode('pie')}>
          <FaChartPie size={30} />
        </button>
        <button className='filter-btn' onClick={() => setMode('line')}>
          <FaChartLine size={30} />
        </button>
        <button className='filter-btn' onClick={() => setMode('doughnut')}>
          <BiSolidDoughnutChart size={30} />
        </button>
        <button className='filter-btn' onClick={() => setMode('polar')}>
          <PiChartPolarFill size={30} />
        </button>
      </div>
    </div>
  );
};
export default Filter;
