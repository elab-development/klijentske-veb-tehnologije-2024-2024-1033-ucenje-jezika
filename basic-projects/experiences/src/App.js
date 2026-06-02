import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import Plans from './pages/Plans';
import Rooms from './pages/Rooms';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/rooms' element={<Rooms />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
