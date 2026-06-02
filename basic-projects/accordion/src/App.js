// react imports
import React from 'react';

//data
import data from './data';

//components
import SingleQuestion from './Question';

function App() {
  const questions = data;

  return (
    <main>
      <div className='container'>
        <h3>FAQ</h3>
        <section className='info'>
          {
            questions.map((question) => {
              return <SingleQuestion key={question.id} {...question} />
            })
          }
        </section>
      </div>
    </main>
  );
}

export default App;