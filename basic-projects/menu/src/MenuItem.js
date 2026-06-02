// react imports
import React from 'react';
import { Link, useParams } from 'react-router-dom';

// data
import items from './data';

export const MenuItem = () => {
  const { id } = useParams();
  const idInt = parseInt(id);
  const menuItem = items.filter((item) => {
    return item.id === idInt;
  });

  if (menuItem.length === 0) {
    return (
      <section className='menu section'>
        <div className='title'>
          <h2>No such item in the menu!</h2>
          <div className='underline'></div>
        </div>
        <div className='menu-item-info'>
          <Link to='/' className='filter-btn back-btn'>
            Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  const { title, img, price, category, desc } = menuItem[0];

  return (
    <main>
      <section className='menu section'>
        <div className='title'>
          <h2>{title}</h2>
          <div className='underline'></div>
        </div>
        <div className='item-info menu-item-info'>
          <img src={`.${img}`} alt={title} />
          <p className='item-text'>{desc}</p>
          <br></br>
          <h4>Category: </h4>
          <h4 className='price'>{category}</h4>
          <h4>Price</h4>
          <h4 className='price'>${price}</h4>
          <Link to='/' className='filter-btn back-btn'>
            Back to Menu
          </Link>
        </div>
      </section>
    </main>
  );
};

export default MenuItem;
