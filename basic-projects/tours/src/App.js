// react imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import Home from './Home';
import Reviews from './Reviews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reviews' element={<Reviews />} />
      </Routes>
    </Router>
  );
}

export default App;
