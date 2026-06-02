import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Crown, Award, RotateCcw } from 'lucide-react';
import {
  fetchRandomPhoto,
  buildAttribution,
  type UnsplashPhoto,
} from '../lib/unsplash';

type ResultState = {
  boardId: string;
  finalSolution: string;
  finalSolver?: 'red' | 'blue';
  scores: { red: number; blue: number };
  winner: 'red' | 'blue' | 'tie';
  columns: Array<{ solution: string; solver?: 'red' | 'blue'; points: number }>;
  finishedAt: string;
};

export default function ResultPage() {
  const loc = useLocation();
  const data = loc.state as ResultState | undefined;

  const [winnerPhoto, setWinnerPhoto] = useState<UnsplashPhoto | null>(null);
  const [loserPhoto, setLoserPhoto] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) return;
    const abort = new AbortController();
    const { winner } = data;

    const qWinner =
      winner === 'tie' ? 'handshake balance' : 'trophy confetti celebration';
    const qLoser =
      winner === 'tie' ? 'handshake balance' : 'defeat disappointment';

    (async () => {
      try {
        setLoading(true);
        const [wp, lp] = await Promise.all([
          fetchRandomPhoto(qWinner, { signal: abort.signal }),
          fetchRandomPhoto(qLoser, { signal: abort.signal }),
        ]);
        setWinnerPhoto(wp);
        setLoserPhoto(lp);
      } finally {
        setLoading(false);
      }
    })();

    return () => abort.abort();
  }, [data]);

  if (!data) {
    return (
      <section className='max-w-3xl mx-auto space-y-4'>
        <h1 className='text-2xl font-bold'>Results</h1>
        <p className='text-gray-600'>No result data found.</p>
        <Link
          to='/game'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white shadow-lg hover:shadow-xl'
        >
          <RotateCcw className='h-5 w-5' /> Back to Game
        </Link>
      </section>
    );
  }

  const { scores, winner } = data;
  const redWins = winner === 'red';
  const blueWins = winner === 'blue';
  const isTie = winner === 'tie';

  const redImg = redWins ? winnerPhoto : loserPhoto;
  const blueImg = blueWins ? winnerPhoto : loserPhoto;

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Results</h1>
        <div className='text-sm text-gray-500'>
          Board: <span className='font-semibold'>{data.boardId}</span> · Final:{' '}
          <span className='font-semibold'>{data.finalSolution}</span>
        </div>
      </div>

      <div className='rounded-2xl shadow-lg p-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Crown className='h-6 w-6 text-yellow-500' />
          <div className='text-lg font-semibold'>
            {isTie ? 'Draw' : `${winner.toUpperCase()} wins!`}
          </div>
        </div>
        <div className='text-sm text-gray-500 flex items-center gap-2'>
          <Award className='h-4 w-4' />
          Final solver:{' '}
          {data.finalSolver ? data.finalSolver.toUpperCase() : '—'}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <SideCard
          title='RED'
          titleClass='text-red-600'
          score={scores.red}
          photo={redImg}
          solutions={data.columns}
          side='red'
          loading={loading}
        />

        <SideCard
          title='BLUE'
          titleClass='text-blue-600'
          score={scores.blue}
          photo={blueImg}
          solutions={data.columns}
          side='blue'
          loading={loading}
        />
      </div>

      <div className='flex gap-3'>
        <Link
          to='/game'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white shadow-lg hover:shadow-xl'
        >
          <RotateCcw className='h-5 w-5' />
          Play again
        </Link>
      </div>
    </section>
  );
}

function SideCard({
  title,
  titleClass,
  score,
  photo,
  solutions,
  side,
  loading,
}: {
  title: string;
  titleClass: string;
  score: number;
  photo: UnsplashPhoto | null;
  solutions: Array<{
    solution: string;
    solver?: 'red' | 'blue';
    points: number;
  }>;
  side: 'red' | 'blue';
  loading: boolean;
}) {
  const at = photo ? buildAttribution(photo) : null;

  return (
    <div className='rounded-2xl shadow-xl overflow-hidden'>
      <div
        className={`h-80 w-full bg-${side}-100 flex items-center justify-center`}
      >
        {photo ? (
          <img
            src={photo.urls.regular}
            alt={photo.alt_description ?? title}
            className='h-80 w-full object-cover'
          />
        ) : (
          <span className='text-gray-500'>
            {loading ? 'Loading image…' : 'No image'}
          </span>
        )}
      </div>
      <div className='p-4'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className={`text-lg font-bold ${titleClass}`}>{title}</h2>
          <div className='text-2xl font-extrabold'>{score}</div>
        </div>

        <ul className='text-sm text-gray-600 space-y-1'>
          {solutions.map((c, i) => (
            <li key={i} className='flex items-center justify-between'>
              <span>{c.solution}</span>
              <span
                className={`font-semibold ${
                  c.solver === 'red'
                    ? 'text-red-600'
                    : c.solver === 'blue'
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {c.solver?.toUpperCase() ?? '—'} (+{c.points})
              </span>
            </li>
          ))}
        </ul>

        {at && (
          <p className='text-[11px] text-gray-500 mt-3'>
            Photo by{' '}
            <a
              href={at.userUrl}
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
              {photo!.user.name}
            </a>{' '}
            on{' '}
            <a
              href={at.upsUrl}
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
              Unsplash
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
