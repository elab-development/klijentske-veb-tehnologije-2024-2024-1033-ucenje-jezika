// react imports
import React from 'react';

// data
import phoneImg from './images/phone.svg';

// context
import { useGlobalContext } from './context';

const Hero = () => {
  const { closeSubmenu } = useGlobalContext();

  return (
    <section className='hero' onMouseOver={closeSubmenu}>
      <div className='hero-center'>
        <article className='hero-info'>
          <h2>Get started quickly</h2>
          <p>
            Integrate with developer-friendly APIs or choose low-code or
            pre-built solutions.
          </p>
          <h2>Support any business model</h2>
          <p>
            E-commerce, subscriptions, SaaS platforms, marketplaces, and
            more—all within a unified platform.
          </p>
          <h2>Join millions of businesses</h2>
          <p>
            Stripe is trusted by ambitious startups and enterprises of every
            size.
          </p>
        </article>
        <article className='hero-images'>
          <img src={phoneImg} className='phone-img' alt='phone' />
        </article>
      </div>
    </section>
  );
};

export default Hero;
