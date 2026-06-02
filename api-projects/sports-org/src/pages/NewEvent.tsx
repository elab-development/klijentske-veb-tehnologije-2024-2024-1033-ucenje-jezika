import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEvents } from '../context/EventsContext';
import { sports } from '../data/sports';
import TeamsEditor from '../components/newEvent/TeamsEditor';
import LocationPicker from '../components/newEvent/LocationPicker';
import type { Event as EventType, Team, Location } from '../types/event';

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function NewEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState(sports[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Team A', players: [] },
    { name: 'Team B', players: [] },
  ]);
  const [location, setLocation] = useState<Location | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date || !time || !location) {
      alert('Please fill Title, Date, Time and select Location on the map.');
      return;
    }

    const id = makeId();
    const newEvent: EventType = {
      id,
      title: title.trim(),
      description: description.trim(),
      sport,
      date,
      time,
      location,
      teams: teams.map((t, i) => ({
        name: t.name.trim() || `Team ${i + 1}`,
        players: (t.players || []).map((p) => p.trim()).filter(Boolean),
      })),
    };

    addEvent(newEvent);
    navigate(`/events/${id}`);
  }

  return (
    <section className='space-y-6'>
      <h1 className='text-2xl font-semibold'>Create a new event</h1>

      <form onSubmit={onSubmit} className='grid grid-cols-1 gap-6'>
        <div className='rounded-2xl shadow-lg bg-white p-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <h3 className='text-lg font-semibold'>Event Information</h3>
          <div className='sm:col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g., Belgrade Basketball Cup'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Sport
            </label>
            <select
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date
            </label>
            <input
              type='date'
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Time
            </label>
            <input
              type='time'
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className='sm:col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Short description about the event…'
            />
          </div>
        </div>

        {/* Teams */}
        <div className='rounded-2xl shadow-lg bg-white p-6'>
          <TeamsEditor value={teams} onChange={setTeams} />
        </div>

        {/* Location */}
        <div className='rounded-2xl shadow-lg bg-white p-6'>
          <LocationPicker
            value={location}
            onChange={setLocation}
            label='Event location'
          />
          <p className='mt-2 text-xs text-gray-500'>
            Tip: Search a venue/address or click on the map to pin a location.
          </p>
        </div>

        {/* Submit */}
        <div className='flex items-center justify-end gap-3'>
          <button
            type='button'
            onClick={() => window.history.back()}
            className='rounded-md cursor-pointer border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md cursor-pointer bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700'
          >
            Create Event
          </button>
        </div>
      </form>
    </section>
  );
}
