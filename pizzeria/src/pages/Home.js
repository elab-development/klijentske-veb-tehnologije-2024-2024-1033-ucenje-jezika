import React from 'react';
import { Link } from 'react-router-dom';

// utils
import '../styles/Home.css';
import Banner from '../assets/pizza.jpeg';

function Home() {
  return (
    <div className='home' style={{ backgroundImage: `url(${Banner})` }}>
      <div className='headerContainer'>
        <h1>React Pizzeria</h1>
        <Link to='/menu'>
          <button>ORDER NOW</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
