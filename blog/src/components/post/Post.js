import React from 'react';

// utils
import './post.css';

export default function Post() {
  return (
    <div className='post'>
      <img
        className='post-img'
        src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        alt='flower'
      />
      <div className='post-info'>
        <div className='post-categories'>
          <span className='post-category'>Music</span>
          <span className='post-category'>Life</span>
        </div>
        <span className='post-title'>Lorem ipsum dolor sit amet</span>
        <hr />
        <span className='post-date'>1 hour ago</span>
      </div>
      <p className='post-description'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam? Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Assumenda officia
        architecto deserunt deleniti? Labore ipsum aspernatur magnam fugiat,
        reprehenderit praesentium blanditiis quos cupiditate ratione atque,
        exercitationem quibusdam, reiciendis odio laboriosam? Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Assumenda officia architecto
        deserunt deleniti? Labore ipsum aspernatur magnam fugiat, reprehenderit
        praesentium blanditiis quos cupiditate ratione atque, exercitationem
        quibusdam, reiciendis odio laboriosam?
      </p>
    </div>
  );
}
