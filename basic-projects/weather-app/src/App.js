import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Weather from './pages/Weather';
import Home from './pages/Home';
import HomeButton from './components/HomeButton';
import Forecast from './pages/Forecast';

function App() {
  return (
    <div className='app'>
      <Router>
        <HomeButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/forecast' element={<Forecast />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
