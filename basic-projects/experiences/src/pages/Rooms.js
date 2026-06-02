import React from 'react';

// components
import Room from '../components/Room';
import ImageSlider from '../components/ImageSlider';

function Rooms() {
  return (
    <div>
      <div className='w-full h-screen'>
        <img
          className='top-0 left-0 w-full h-screen object-cover'
          src='https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='hero'
        />
      </div>
      <Room />
      <ImageSlider />
    </div>
  );
}

export default Rooms;
