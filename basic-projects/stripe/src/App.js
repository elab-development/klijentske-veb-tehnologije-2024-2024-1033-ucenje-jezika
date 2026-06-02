// react imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import Navbar from './Navbar';
import Hero from './Hero';
import Sidebar from './Sidebar';
import Submenu from './Submenu';
import Start from './Start';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/start' element={<Start />} />
        </Routes>
        <Submenu />
      </Router>
    </>
  );
}

export default App;
