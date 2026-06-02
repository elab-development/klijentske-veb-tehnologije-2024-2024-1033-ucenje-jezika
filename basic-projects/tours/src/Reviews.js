import React from 'react';
import Review from './Review';

const Reviews = () => {
  return (
    <main className='reviews'>
      <section className='container-reviews'>
        <div className='title'>
          <h2>Our Reviews</h2>
          <div className='underline'></div>
        </div>
        <Review />
      </section>
    </main>
  );
};

export default Reviews;
