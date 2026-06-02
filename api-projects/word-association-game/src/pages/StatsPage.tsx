import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GameStorage } from '../lib/storage/gameStorage';
import { Trophy, ArrowLeft } from 'lucide-react';

const COLORS = {
  red: '#ef4444',
  blue: '#3b82f6',
  gray: '#9ca3af',
};

export default function StatsPage() {
  const results = useMemo(() => GameStorage.list(), []);

  const {
    totalGames,
    winsRed,
    winsBlue,
    winsTie,
    pointsRed,
    pointsBlue,
    colsRed,
    colsBlue,
  } = useMemo(() => {
    let total = 0;
    let wR = 0,
      wB = 0,
      wT = 0;
    let pR = 0,
      pB = 0;
    let cR = 0,
      cB = 0;

    for (const r of results) {
      total += 1;
      if (r.winner === 'red') wR += 1;
      else if (r.winner === 'blue') wB += 1;
      else wT += 1;

      pR += r.scores.red;
      pB += r.scores.blue;

      for (const col of r.columns) {
        if (col.solver === 'red') cR += 1;
        else if (col.solver === 'blue') cB += 1;
      }
    }
    return {
      totalGames: total,
      winsRed: wR,
      winsBlue: wB,
      winsTie: wT,
      pointsRed: pR,
      pointsBlue: pB,
      colsRed: cR,
      colsBlue: cB,
    };
  }, [results]);

  const winsData = [
    { name: 'Red', value: winsRed, color: COLORS.red },
    { name: 'Blue', value: winsBlue, color: COLORS.blue },
    { name: 'Tie', value: winsTie, color: COLORS.gray },
  ];
  const pointsData = [
    { name: 'Red', value: pointsRed, color: COLORS.red },
    { name: 'Blue', value: pointsBlue, color: COLORS.blue },
  ];
  const columnsData = [
    { name: 'Red', value: colsRed, color: COLORS.red },
    { name: 'Blue', value: colsBlue, color: COLORS.blue },
  ];

  const empty = totalGames === 0;

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Stats</h1>
        <Link
          to='/game'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white shadow-lg hover:shadow-xl active:scale-[.99]'
        >
          <ArrowLeft className='h-5 w-5' />
          Back to Game
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <SummaryTile label='Total games' value={totalGames} />
        <SummaryTile label='Red wins' value={winsRed} accent='text-red-600' />
        <SummaryTile
          label='Blue wins'
          value={winsBlue}
          accent='text-blue-600'
        />
        <SummaryTile label='Ties' value={winsTie} />
      </div>

      {empty ? (
        <div className='rounded-2xl shadow-lg p-6 text-gray-600'>
          No games yet. Play a round and come back!
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <ChartCard title='Wins'>
              <PieWrap data={winsData} />
            </ChartCard>

            <ChartCard title='Total points'>
              <PieWrap data={pointsData} />
            </ChartCard>

            <ChartCard title='Columns guessed'>
              <PieWrap data={columnsData} />
            </ChartCard>
          </div>

          <div className='rounded-2xl shadow-lg p-4'>
            <h3 className='font-semibold mb-3 flex items-center gap-2'>
              <Trophy className='h-5 w-5 text-yellow-500' /> Totals
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
              <TotalsLine
                label='Red points'
                value={pointsRed}
                color='text-red-600'
              />
              <TotalsLine
                label='Blue points'
                value={pointsBlue}
                color='text-blue-600'
              />
              <TotalsLine
                label='Columns (R/B)'
                value={`${colsRed} / ${colsBlue}`}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function SummaryTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: string;
}) {
  return (
    <div className='rounded-2xl shadow-lg p-4'>
      <div className='text-sm text-gray-500'>{label}</div>
      <div className={`text-2xl font-bold ${accent ?? ''}`}>{value}</div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='rounded-2xl shadow-lg p-4'>
      <h3 className='font-semibold mb-2'>{title}</h3>
      <div className='h-64'>{children}</div>
    </div>
  );
}

function TotalsLine({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className='rounded-xl shadow-inner p-3'>
      <div className='text-gray-500 text-xs'>{label}</div>
      <div className={`text-lg font-semibold ${color ?? ''}`}>{value}</div>
    </div>
  );
}

function PieWrap({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const hasData = total > 0;

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={
            hasData ? data : [{ name: 'No data', value: 1, color: COLORS.gray }]
          }
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius='80%'
          dataKey='value'
          nameKey='name'
        >
          {(hasData
            ? data
            : [{ name: 'No data', value: 1, color: COLORS.gray }]
          ).map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
