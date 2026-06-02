import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTasks } from '../store/useTasks';
import type { TaskPriority } from '../domain/task';

export default function AddTaskPage() {
  const createTask = useTasks((s) => s.createTask);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask({ title, location, description, priority });

    setTitle('');
    setLocation('');
    setDescription('');
    setPriority('medium');

    navigate('/planner');
  };

  return (
    <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <h1 className='mb-6 text-center text-3xl font-bold text-slate-800'>
          Add New Task
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 rounded-xl bg-white p-6 shadow'
        >
          <div>
            <label className='mb-1 block text-sm font-medium text-slate-700'>
              Title
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-sky-500'
              required
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-slate-700'>
              Location
            </label>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-sky-500'
              placeholder='Optional'
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-slate-700'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-sky-500'
              rows={3}
              placeholder='Optional'
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-slate-700'>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-sky-500'
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
              <option value='urgent'>Urgent</option>
            </select>
          </div>

          <button
            type='submit'
            className='cursor-pointer mt-2 inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
          >
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
}
