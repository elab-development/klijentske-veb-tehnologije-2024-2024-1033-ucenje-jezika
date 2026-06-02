import { useState } from 'react';

import type { Team } from '../../types/event';

type Props = {
  value: Team;
  onChange: (next: Team) => void;
  onRemove?: () => void;
  index?: number;
};

export default function TeamEditor({
  value,
  onChange,
  onRemove,
  index,
}: Props) {
  const [name, setName] = useState(value.name);
  const [playersText, setPlayersText] = useState(value.players.join(', '));

  function apply() {
    const players = playersText
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    onChange({ name: name.trim() || `Team ${index ?? ''}`, players });
  }

  return (
    <div className='rounded-xl border border-gray-300 p-4 bg-white space-y-3'>
      <div className='flex items-center justify-between'>
        <div className='text-sm font-medium text-gray-700'>
          Team {typeof index === 'number' ? index + 1 : ''}
        </div>
        {onRemove && (
          <button
            type='button'
            onClick={onRemove}
            className='text-sm text-red-600 hover:underline'
          >
            Remove
          </button>
        )}
      </div>

      <label className='block text-sm font-medium text-gray-700'>
        Team name
      </label>
      <input
        className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={apply}
        placeholder='e.g., Dorćol Ballers'
      />

      <label className='block text-sm font-medium text-gray-700'>
        Players (comma separated)
      </label>
      <textarea
        className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
        rows={2}
        value={playersText}
        onChange={(e) => setPlayersText(e.target.value)}
        onBlur={apply}
        placeholder='e.g., Milan, Nikola, Marko'
      />
    </div>
  );
}
