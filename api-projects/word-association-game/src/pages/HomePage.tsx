import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Database,
  BarChart2,
  Sparkles,
  History,
  Crown,
} from 'lucide-react';
import { useMemo } from 'react';
import { GameStorage } from '../lib/storage/gameStorage';

export default function HomePage() {
  const navigate = useNavigate();

  const recent = useMemo(() => GameStorage.list().slice(0, 6), []);

  const startApiGame = async () => {
    navigate('/game');
  };

  const startMemoryGame = () => {
    navigate('/game');
  };

  return (
    <section className='space-y-8'>
      <div className='rounded-3xl shadow-xl p-8 md:p-12 bg-white'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-6'>
          <div className='flex-1'>
            <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight'>
              Word Association Game
            </h1>
            <p className='mt-3 text-gray-600 max-w-xl'>
              Open clues, guess column solutions, and crack the final word. Two
              players — Red vs Blue. Keep score, view results, and track your
              stats over time.
            </p>
            <div className='mt-6 flex flex-col sm:flex-row gap-3'>
              <button
                onClick={startApiGame}
                className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
              >
                <Sparkles className='h-5 w-5' />
                Start (API)
              </button>
              <button
                onClick={startMemoryGame}
                className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
              >
                <Database className='h-5 w-5' />
                Start (Memory)
              </button>
              <Link
                to='/stats'
                className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
              >
                <BarChart2 className='h-5 w-5' />
                View Stats
              </Link>
            </div>
          </div>

          <div className='w-full lg:w-96 rounded-2xl shadow-lg p-5'>
            <h3 className='font-semibold flex items-center gap-2'>
              <Play className='h-5 w-5' />
              How to play
            </h3>
            <ul className='mt-3 text-sm text-gray-600 space-y-2'>
              <li>• Reveal one clue, then guess a column or the final.</li>
              <li>• Correct guess keeps your turn; wrong guess passes it.</li>
              <li>• Column score depends on how many clues were opened.</li>
              <li>• Solve final to collect remaining column points.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <div className='xl:col-span-2 rounded-3xl shadow-xl p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
              <History className='h-5 w-5' /> Recent results
            </h2>
            <Link
              to='/stats'
              className='text-sm px-3 py-1 rounded-xl bg-gray-900 text-white shadow-md hover:shadow-lg'
            >
              Open Stats
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className='mt-4 text-gray-600'>
              No games yet — start your first match!
            </div>
          ) : (
            <ul className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {recent.map((r) => (
                <li key={r.id} className='rounded-2xl shadow-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-gray-500'>
                      {formatDate(r.finishedAt)}
                    </div>
                    <div className='inline-flex items-center gap-1 text-yellow-600'>
                      {r.winner !== 'tie' && <Crown className='h-4 w-4' />}
                      <span
                        className={
                          r.winner === 'red'
                            ? 'text-red-600 font-semibold'
                            : r.winner === 'blue'
                            ? 'text-blue-600 font-semibold'
                            : 'text-gray-600'
                        }
                      >
                        {r.winner === 'tie' ? 'Tie' : r.winner.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className='mt-2'>
                    <div className='text-sm text-gray-500'>Final</div>
                    <div className='font-semibold'>{r.finalSolution}</div>
                  </div>

                  <div className='mt-3 rounded-xl shadow-inner p-3 text-sm'>
                    <span className='font-semibold text-red-600'>Red</span>:{' '}
                    {r.scores.red}
                    <span className='mx-2 text-gray-400'>|</span>
                    <span className='font-semibold text-blue-600'>
                      Blue
                    </span>: {r.scores.blue}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
