import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div data-cy='counter'>
      <div className='counter'>
        <button
          className='btn'
          onClick={() => setCount((c) => c - 1)}
          data-cy='dec'
        >
          −
        </button>
        <span className='counter-value' data-cy='value'>
          {count}
        </span>
        <button
          className='btn'
          onClick={() => setCount((c) => c + 1)}
          data-cy='inc'
        >
          +
        </button>
      </div>
      <button
        className='btn-secondary'
        onClick={() => setCount(0)}
        data-cy='reset'
      >
        Reset
      </button>
    </div>
  );
}
