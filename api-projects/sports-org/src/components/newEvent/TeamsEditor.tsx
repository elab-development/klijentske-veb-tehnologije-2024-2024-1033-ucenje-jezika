import { useState } from 'react';

import TeamEditor from './TeamEditor';
import type { Team } from '../../types/event';

type Props = {
  value: Team[];
  onChange: (next: Team[]) => void;
};

export default function TeamsEditor({ value, onChange }: Props) {
  const [teams, setTeams] = useState<Team[]>(
    value.length
      ? value
      : [
          { name: 'Team A', players: [] },
          { name: 'Team B', players: [] },
        ]
  );

  function setOne(idx: number, next: Team) {
    const copy = teams.slice();
    copy[idx] = next;
    setTeams(copy);
    onChange(copy);
  }

  function addTeam() {
    const copy = [...teams, { name: `Team ${teams.length + 1}`, players: [] }];
    setTeams(copy);
    onChange(copy);
  }

  function removeTeam(idx: number) {
    const copy = teams.slice();
    copy.splice(idx, 1);
    setTeams(copy);
    onChange(copy);
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Teams & players</h3>
        <button
          type='button'
          onClick={addTeam}
          className='rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700'
        >
          + Add team
        </button>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {teams.map((t, i) => (
          <TeamEditor
            key={i}
            index={i}
            value={t}
            onChange={(next) => setOne(i, next)}
            onRemove={teams.length > 2 ? () => removeTeam(i) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
