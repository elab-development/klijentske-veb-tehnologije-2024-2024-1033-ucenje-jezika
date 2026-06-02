import { useState } from 'react';
import ClueButton from './ClueButton';
import { CheckCircle2 } from 'lucide-react';
import type { Column } from '../../lib/boardGenerator';
import type { Player } from '../../lib/gameEngine';

type Props = {
  code: 'A' | 'B' | 'C' | 'D';
  column: Column;
  opened: number;
  solved: boolean;
  solver?: Player;
  onReveal: (clueId: string) => void;
  onGuess: (value: string) => void;
  disableReveal: boolean;
  disableGuess: boolean;
};

export default function ColumnCard({
  code,
  column,
  opened,
  solved,
  solver,
  onReveal,
  onGuess,
  disableReveal,
  disableGuess,
}: Props) {
  const [guess, setGuess] = useState('');

  const tint =
    solved && solver === 'red'
      ? 'bg-red-50'
      : solved && solver === 'blue'
      ? 'bg-blue-50'
      : 'bg-white';

  return (
    <div className={`rounded-2xl shadow-xl p-4 ${tint}`}>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-lg font-semibold'>{code}</h3>
        <div className='text-xs text-gray-500'>{opened}/4 opened</div>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        {column.clues.map((clue, idx) => (
          <ClueButton
            key={clue.id}
            label={`${code}${idx + 1}`}
            revealed={clue.revealed}
            text={clue.text}
            onReveal={() => onReveal(clue.id)}
            disabled={disableReveal || clue.revealed || solved}
          />
        ))}
      </div>

      <div className='mt-4 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2'>
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder={`Guess ${code} solution`}
          className='px-3 py-2 rounded-xl shadow-inner outline-none flex-1'
          disabled={disableGuess || solved}
        />
        <button
          onClick={() => {
            if (guess.trim()) {
              onGuess(guess);
              setGuess('');
            }
          }}
          disabled={disableGuess || solved}
          className='w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-lg hover:shadow-xl active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Guess
        </button>
      </div>

      {solved && (
        <div
          className={`mt-3 inline-flex items-center gap-2 ${
            solver === 'red' ? 'text-red-700' : 'text-blue-700'
          }`}
        >
          <CheckCircle2 className='h-5 w-5' />
          <span className='font-medium'>
            Solved: {column.solution} ({solver?.toUpperCase()})
          </span>
        </div>
      )}
    </div>
  );
}
