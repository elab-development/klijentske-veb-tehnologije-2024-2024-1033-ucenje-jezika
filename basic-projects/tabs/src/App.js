// react imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// pages
import Experience from './pages/Experience';
import Faq from './pages/Faq';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Experience />} />
        <Route path='/faq' element={<Faq />} />
      </Routes>
    </Router>
  );
}

export default App;
