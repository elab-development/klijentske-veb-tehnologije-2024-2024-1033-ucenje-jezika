import { useState } from 'react';
import { Trash2, MapPin, AlignLeft } from 'lucide-react';
import type { TaskPriority } from '../../domain/task';
import { setDragTaskId } from '../../lib/dnd';
import PriorityBadge from './PriorityBadge';

export type BacklogCardProps = {
  id: string;
  title: string;
  priority: TaskPriority;
  location?: string;
  description?: string;
  onDelete: (id: string) => void;
};

export default function BacklogCard({
  id,
  title,
  priority,
  location,
  description,
  onDelete,
}: BacklogCardProps) {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      role='button'
      tabIndex={0}
      draggable
      onDragStart={(e) => {
        setDragTaskId(e, id);
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
      className={[
        'cursor-grab active:cursor-grabbing',
        'rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow',
        dragging ? 'opacity-70 ring-2 ring-sky-200' : '',
      ].join(' ')}
      aria-grabbed={dragging}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <h3 className='truncate text-sm font-semibold text-slate-900'>
            {title}
          </h3>
          <div className='mt-1'>
            <PriorityBadge value={priority} />
          </div>
        </div>

        <button
          onClick={() => onDelete(id)}
          className='inline-flex items-center rounded-md p-2 text-rose-600 hover:bg-rose-50'
          title='Delete task'
          aria-label='Delete task'
        >
          <Trash2 className='h-5 w-5' />
        </button>
      </div>

      {(location || description) && (
        <div className='mt-3 space-y-1 text-sm text-slate-600'>
          {location && (
            <div className='flex items-start gap-2'>
              <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-slate-400' />
              <span className='truncate'>{location}</span>
            </div>
          )}
          {description && (
            <div className='flex items-start gap-2'>
              <AlignLeft className='mt-0.5 h-4 w-4 shrink-0 text-slate-400' />
              <p className='line-clamp-2'>{description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
