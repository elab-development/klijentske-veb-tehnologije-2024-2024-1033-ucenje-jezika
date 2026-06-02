import { useState } from 'react';
import { Play, RotateCcw, Sparkles, SkipForward, Trophy } from 'lucide-react';

type Props = {
  started: boolean;
  canGuess: boolean;
  canSkip: boolean;
  finalSolved: boolean;
  onStart: () => void;
  onReset: () => void;
  onFinalGuess: (value: string) => void;
  onSkip: () => void;
  onShowResults: () => void;
};

export default function GameControls({
  started,
  canGuess,
  canSkip,
  finalSolved,
  onStart,
  onReset,
  onFinalGuess,
  onSkip,
  onShowResults,
}: Props) {
  const [finalText, setFinalText] = useState('');

  return (
    <div className='flex flex-col lg:flex-row gap-3 w-full'>
      <div className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto'>
        {!started ? (
          <button
            onClick={onStart}
            className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
          >
            <Play className='h-5 w-5' />
            Start game
          </button>
        ) : (
          <button
            onClick={onReset}
            className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-700 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
          >
            <RotateCcw className='h-5 w-5' />
            Reset
          </button>
        )}

        <button
          onClick={onSkip}
          disabled={!canSkip || finalSolved}
          className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed bg-amber-500 text-white'
        >
          <SkipForward className='h-5 w-5' />
          Skip turn
        </button>

        {finalSolved && (
          <button
            onClick={onShowResults}
            className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
          >
            <Trophy className='h-5 w-5' />
            Results
          </button>
        )}
      </div>

      <div className='flex-1' />

      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2'>
        <input
          value={finalText}
          onChange={(e) => setFinalText(e.target.value)}
          placeholder='Guess FINAL solution'
          className='px-3 py-2 rounded-xl shadow-inner outline-none sm:w-64 w-full'
          disabled={!canGuess || finalSolved}
        />
        <button
          onClick={() => {
            if (finalText.trim()) {
              onFinalGuess(finalText);
              setFinalText('');
            }
          }}
          disabled={!canGuess || finalSolved}
          className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white shadow-lg hover:shadow-xl active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Sparkles className='h-5 w-5' />
          Guess
        </button>
      </div>
    </div>
  );
}
