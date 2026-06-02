import { useMemo } from 'react';
import { ListTodo } from 'lucide-react';
import { useTasks } from '../../store/useTasks';
import BacklogCard from '../tasks/BacklogCard';

export default function BacklogPanel() {
  const tasks = useTasks((s) => s.tasks);
  const deleteTask = useTasks((s) => s.deleteTask);

  const backlog = useMemo(
    () => tasks.filter((t) => t.status === 'created' && !t.scheduledDate),
    [tasks]
  );

  return (
    <>
      <section className='md:hidden'>
        <div className='mb-2 flex items-center gap-2 text-slate-700'>
          <ListTodo className='h-5 w-5 text-sky-600' />
          <h2 className='text-base font-semibold'>Backlog</h2>
          <span className='text-xs text-slate-500'>({backlog.length})</span>
        </div>

        {backlog.length === 0 ? (
          <div className='rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500'>
            No tasks in backlog. Create one from{' '}
            <span className='font-medium'>Add Task</span>.
          </div>
        ) : (
          <div className='flex gap-4 overflow-x-auto pb-1'>
            {backlog.map((t) => (
              <div key={t.id} className='w-80 shrink-0'>
                <BacklogCard
                  id={t.id}
                  title={t.title}
                  priority={t.priority}
                  location={t.location}
                  description={t.description}
                  onDelete={deleteTask}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <aside className='hidden md:block'>
        <div className='mb-2 flex items-center gap-2 text-slate-700'>
          <ListTodo className='h-5 w-5 text-sky-600' />
          <h2 className='text-sm font-semibold'>Backlog</h2>
          <span className='text-xs text-slate-500'>({backlog.length})</span>
        </div>

        {backlog.length === 0 ? (
          <div className='rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500'>
            No tasks in backlog.
          </div>
        ) : (
          <div className='space-y-3'>
            {backlog.map((t) => (
              <BacklogCard
                key={t.id}
                id={t.id}
                title={t.title}
                priority={t.priority}
                location={t.location}
                description={t.description}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
