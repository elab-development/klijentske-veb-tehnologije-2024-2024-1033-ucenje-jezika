import type { IPet } from '../../domain/pets';

export function StatusBadge({
  status,
  isAbs = true,
}: {
  status: IPet['status'];
  isAbs: boolean;
}) {
  const styles =
    status === 'available'
      ? 'bg-emerald-600'
      : status === 'pending'
      ? 'bg-amber-500'
      : 'bg-slate-600';

  const label =
    status === 'available'
      ? 'Available'
      : status === 'pending'
      ? 'Pending'
      : 'Adopted';

  return (
    <span
      className={`${
        isAbs ? 'absolute left-3 top-3' : ''
      } rounded-full px-2.5 py-1 text-xs font-medium text-white ${styles}`}
    >
      {label}
    </span>
  );
}

export function CategoryBadge({ category }: { category: IPet['category'] }) {
  const map: Record<IPet['category'], string> = {
    dog: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    cat: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    rabbit: 'text-rose-700 bg-rose-50 border-rose-200',
    bird: 'text-cyan-700 bg-cyan-50 border-cyan-200',
  };
  return (
    <span
      className={`capitalize whitespace-nowrap rounded-lg border px-2 py-1 text-xs font-medium ${map[category]}`}
    >
      {category}
    </span>
  );
}
