import { useEffect, useMemo, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import type { IReservation } from '../../types/reservation';
import { ReservationManager } from '../../api/reservation/ReservationManager';

type Props = {
  cafeId: string;
};

export default function Reservations({ cafeId }: Props) {
  const reservations = useMemo(() => new ReservationManager(), []);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [list, setList] = useState<IReservation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cafeId) return;
    setList(reservations.listByCafe(cafeId));
  }, [cafeId, reservations]);

  function addReservation() {
    setError(null);
    if (!date) return setError('Please choose a date.');
    if (!time) return setError('Please choose a time.');
    reservations.add(cafeId, date, time);
    setList(reservations.listByCafe(cafeId));
    setDate('');
    setTime('');
  }

  function cancelReservation(id: string) {
    reservations.cancel(id);
    setList(reservations.listByCafe(cafeId));
  }

  return (
    <div className='shadow-md rounded-lg'>
      <div className='px-4 py-3  font-semibold text-gray-800'>Reservations</div>

      <div className='p-4 space-y-3'>
        {error && (
          <div className='rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
            {error}
          </div>
        )}

        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className='block text-sm text-gray-700 mb-1'>Date</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full rounded-md p-2 border border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            />
          </div>
          <div>
            <label className='block text-sm text-gray-700 mb-1'>Time</label>
            <input
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className='w-full rounded-md p-2 border border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            />
          </div>
        </div>

        <button
          onClick={addReservation}
          className='cursor-pointer w-full rounded-lg bg-pink-600 px-4 py-2 text-white font-semibold hover:bg-pink-700'
        >
          Reserve
        </button>

        {list.length > 0 ? (
          <ul className='divide-y'>
            {list.map((r) => (
              <li
                key={r.id}
                className='flex items-center justify-between py-2 text-sm'
              >
                <span className='text-gray-700'>
                  {r.date} at {r.time}
                </span>
                <button
                  onClick={() => cancelReservation(r.id)}
                  className='cursor-pointer inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1 text-gray-700 hover:bg-gray-100'
                  aria-label='Cancel reservation'
                >
                  <FaTrash className='h-3.5 w-3.5 text-red-600' />
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-gray-500'>No reservations yet.</p>
        )}
      </div>
    </div>
  );
}
