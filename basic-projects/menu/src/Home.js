// react imports
import React, { useState } from 'react';

// components
import Menu from './Menu';
import Categories from './Categories';

// data
import items from './data';

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

export const Home = () => {
  const [menuItems, setMenuItems] = useState(items);
  const categories = allCategories;

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className='menu section'>
        <div className='title'>
          <h2>Our Menu</h2>
          <div className='underline'></div>
        </div>
        <Categories filterItems={filterItems} categories={categories} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
};

export default Home;
