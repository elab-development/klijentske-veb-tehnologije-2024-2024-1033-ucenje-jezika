import { type Player } from '../../lib/gameEngine';

export default function TurnBadge({ player }: { player: Player }) {
  const color = player === 'red' ? 'bg-red-500' : 'bg-blue-500';
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm shadow-md ${color}`}
    >
      <span className='h-2.5 w-2.5 rounded-full bg-white/90' />
      {player.toUpperCase()} turn
    </span>
  );
}
