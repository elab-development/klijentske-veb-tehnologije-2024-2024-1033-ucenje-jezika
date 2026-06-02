// react imports
import React, { useState } from 'react';

// components
import List from './List';

// data
import data from './data';


function App() {
  const [people, setPeople] = useState(data);

  return (
    <main> 
    <section className='container'>
      <h3>{people.length} birthdays today</h3>
      <List people={people} />
      <button onClick={() => setPeople([])}>
        Clear All
      </button>
    </section>
  </main>
  );
}

export default App;
