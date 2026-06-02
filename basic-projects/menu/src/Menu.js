// react imports
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ items }) => {
  return (
    <div className='section-center'>
      {items.map((menuItem) => {
        const { id, title, price, img, desc } = menuItem;
        return (
          <Link to={`/menuitem/${id}`} key={id}>
            <article className='menu-item'>
              <img src={img} alt={title} className='photo' />
              <div className='item-info'>
                <header>
                  <h4>{title}</h4>
                  <h4 className='price'>{price}</h4>
                </header>
                <p className='item-text'>{desc}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
