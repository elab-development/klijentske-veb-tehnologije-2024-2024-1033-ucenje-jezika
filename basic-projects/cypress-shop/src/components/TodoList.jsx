import { useState } from 'react';

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const add = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setText('');
  };

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className='todo' data-cy='todo'>
      <div className='todo-input'>
        <input
          placeholder='Add task…'
          value={text}
          type='text'
          onChange={(e) => setText(e.target.value)}
          data-cy='todo-input'
        />
        <button className='btn' onClick={add} data-cy='todo-add'>
          Add
        </button>
      </div>

      <ul className='todo-list' data-cy='todo-list'>
        {items.length === 0 && <li className='muted'>No tasks yet.</li>}
        {items.map((it) => (
          <li key={it.id} className={it.done ? 'done' : ''}>
            <label>
              <input
                type='checkbox'
                checked={it.done}
                onChange={() => toggle(it.id)}
                data-cy={`todo-check-${it.id}`}
              />
              <span>{it.text}</span>
            </label>
            <button
              className='link'
              onClick={() => remove(it.id)}
              data-cy={`todo-del-${it.id}`}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
