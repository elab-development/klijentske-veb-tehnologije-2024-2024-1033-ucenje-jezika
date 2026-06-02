import type { TaskPriority } from '../../domain/task';

const styles: Record<TaskPriority, string> = {
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  medium: 'bg-sky-50 text-sky-700 ring-sky-200',
  high: 'bg-amber-50 text-amber-700 ring-amber-200',
  urgent: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export default function PriorityBadge({ value }: { value: TaskPriority }) {
  const style = styles[value];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${style}`}
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}
