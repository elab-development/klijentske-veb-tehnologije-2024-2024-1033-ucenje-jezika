import { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import TurnBadge from '../components/game/TurnBadge';
import GameControls from '../components/game/GameControls';
import ColumnCard from '../components/game/ColumnCard';
import { memoryBoards } from '../data/memoryBoards';
import { generateBoard } from '../lib/boardGenerator';
import { GameEngine } from '../lib/gameEngine';
import { GameStorage, makeId } from '../lib/storage/gameStorage';

type StartMode = 'api' | 'memory';

export default function GamePage() {
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>('');
  const [mode, setMode] = useState<StartMode>('api');

  const navigate = useNavigate();
  const savedRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const b = await generateBoard();
        const eng = new GameEngine(b);
        setEngine(eng);
      } catch (e: any) {
        setErr(e?.message || 'Failed to generate board.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const started = engine?.started ?? false;
  const finalSolved = engine?.finalSolved ?? false;

  const columns = useMemo(() => engine?.board?.columns ?? [], [engine]);

  const pickRandomMemory = () => {
    const idx = Math.floor(Math.random() * memoryBoards.length);
    return memoryBoards[idx];
  };

  const handleStart = async () => {
    setErr('');
    if (mode === 'memory') {
      const b = pickRandomMemory();
      const eng = new GameEngine(b);
      eng.start();
      setEngine(eng);
      return;
    }
    const b = await generateBoard();
    const eng = new GameEngine(b);
    eng.start();
    setEngine(eng);
  };

  const handleReset = async () => {
    if (!engine) return;
    setLoading(true);
    setErr('');
    try {
      if (mode === 'memory') {
        const b = pickRandomMemory();
        const eng = new GameEngine(b);
        setEngine(eng);
      } else {
        const b = await generateBoard();
        const eng = new GameEngine(b);
        setEngine(eng);
      }
    } catch (e: any) {
      setErr(e?.message || 'Failed to reset.');
    } finally {
      setLoading(false);
    }
  };

  const reveal = (colId: string, clueId: string) => {
    if (!engine) return;
    engine.revealClue(colId, clueId);
    setEngine(
      Object.assign(Object.create(Object.getPrototypeOf(engine)), engine)
    );
  };

  const guessColumn = (colId: string, val: string) => {
    if (!engine) return;
    engine.guessColumn(colId, val);
    setEngine(
      Object.assign(Object.create(Object.getPrototypeOf(engine)), engine)
    );
  };

  const guessFinal = (val: string) => {
    if (!engine) return;
    engine.guessFinal(val);
    setEngine(
      Object.assign(Object.create(Object.getPrototypeOf(engine)), engine)
    );
  };

  const skipTurn = () => {
    if (!engine) return;
    engine.skipTurn();
    setEngine(
      Object.assign(Object.create(Object.getPrototypeOf(engine)), engine)
    );
  };

  const goToResults = () => {
    if (!engine || !engine.board) return;

    const red = engine.scores.red;
    const blue = engine.scores.blue;
    const winner = red === blue ? 'tie' : red > blue ? 'red' : 'blue';

    const payload = {
      boardId: engine.board.id,
      finalSolution: engine.board.finalSolution,
      finalSolver: engine.finalSolver,
      scores: { red, blue },
      winner,
      columns: engine.board.columns.map((c) => ({
        solution: c.solution,
        solver: engine.columnState[c.id].solver,
        points: engine.columnState[c.id].points,
      })),
      finishedAt: new Date().toISOString(),
    };

    navigate('/result', { state: payload });
  };

  useEffect(() => {
    if (!engine || !engine.board) return;

    if (!engine.finalSolved) {
      savedRef.current = false;
      return;
    }

    if (savedRef.current) return;

    const red = engine.scores.red;
    const blue = engine.scores.blue;
    const winner: 'red' | 'blue' | 'tie' =
      red === blue ? 'tie' : red > blue ? 'red' : 'blue';

    const resultPayload = {
      id: makeId('game'),
      boardId: engine.board.id,
      finalSolution: engine.board.finalSolution,
      finalSolver: engine.finalSolver,
      scores: { red, blue },
      winner,
      columns: engine.board.columns.map((c) => ({
        solution: c.solution,
        solver: engine.columnState[c.id].solver,
        points: engine.columnState[c.id].points,
      })),
      finishedAt: new Date().toISOString(),
      mode,
    };

    GameStorage.add(resultPayload);
    savedRef.current = true;
  }, [engine, mode]);

  if (loading)
    return <div className='shadow-lg rounded-2xl p-6'>Preparing game…</div>;
  if (err)
    return <div className='shadow-lg rounded-2xl p-6 text-red-600'>{err}</div>;
  if (!engine || !engine.board) return null;

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Game</h1>
        <div className='flex items-center gap-3'>
          <div className='rounded-xl shadow-inner px-3 py-1 text-sm'>
            <span className='font-semibold text-red-600'>Red</span>:{' '}
            {engine.scores.red}
            <span className='mx-2 text-gray-400'>|</span>
            <span className='font-semibold text-blue-600'>Blue</span>:{' '}
            {engine.scores.blue}
          </div>
          {started && !finalSolved && <TurnBadge player={engine.current} />}
          {finalSolved && (
            <span className='inline-flex items-center px-3 py-1 rounded-full bg-emerald-600 text-white text-sm shadow-md'>
              Final solved by {engine.finalSolver?.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className='shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-600'>Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as StartMode)}
            className='px-3 py-2 rounded-xl shadow-inner outline-none'
          >
            <option value='api'>API (Datamuse)</option>
            <option value='memory'>Memory boards (random)</option>
          </select>
        </div>
      </div>

      <GameControls
        started={started}
        canGuess={engine.canGuess}
        canSkip={engine.canSkip}
        finalSolved={engine.finalSolved}
        onStart={handleStart}
        onReset={handleReset}
        onFinalGuess={guessFinal}
        onSkip={skipTurn}
        onShowResults={goToResults}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {columns.map((col, idx) => {
          const code = String.fromCharCode(65 + idx) as 'A' | 'B' | 'C' | 'D';
          const st = engine.columnState[col.id];
          return (
            <ColumnCard
              key={col.id}
              code={code}
              column={col}
              opened={st.opened}
              solved={st.solved}
              solver={st.solver}
              onReveal={(clueId) => reveal(col.id, clueId)}
              onGuess={(val) => guessColumn(col.id, val)}
              disableReveal={!engine.canReveal}
              disableGuess={!engine.canGuess}
            />
          );
        })}
      </div>
    </section>
  );
}
