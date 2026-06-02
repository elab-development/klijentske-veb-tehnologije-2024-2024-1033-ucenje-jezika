// react imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// utils
import './App.css';

// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Signup from './pages/Signup';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/services' element={<Services />} />
          <Route path='/sign-up' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
