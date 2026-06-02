// react imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import { Home } from './Home';
import { MenuItem } from './MenuItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menuitem/:id' element={<MenuItem />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
