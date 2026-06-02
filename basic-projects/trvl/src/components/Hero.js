import React from 'react';

// components
import { Button } from './Button';

// utils
import './Hero.css';
import Video from '../assets/videos/video-1.mp4';

function Hero() {
  return (
    <div className='hero-container'>
      <video src={Video} autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          WATCH TRAILER <i className='far fa-play-circle'></i>
        </Button>
      </div>
    </div>
  );
}

export default Hero;
